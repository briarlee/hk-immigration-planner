import type {
  UserSelection,
  DecisionInput,
  ChildEducation,
  AreaType,
  FoodMode
} from '../types';
import {
  HOUSING_COSTS,
  FOOD_COSTS,
  SCHOOL_COSTS,
  OTHER_COSTS,
  PLAN_OPTIONS
} from '../data/constants';

// 计算每月住房成本
export function calculateHousingCost(area: AreaType): number {
  return HOUSING_COSTS[area].avg;
}

// 计算每月饮食成本
export function calculateFoodCost(mode: FoodMode): number {
  return FOOD_COSTS[mode].avg;
}

// 计算单个孩子年度教育成本
export function calculateChildEducationCost(child: ChildEducation): number {
  const schoolCost = SCHOOL_COSTS[child.schoolType];
  let total = schoolCost.tuition + schoolCost.extras;

  if (child.tutoring) {
    // 假设每年上课40周
    total += child.tutoringCount * OTHER_COSTS.tutoring.perSession * 4 * 10;
  }

  if (child.extracurricular) {
    total += child.extracurricularCount * OTHER_COSTS.extracurricular.perSession * 4 * 10;
  }

  return total;
}

// 计算年度保险成本
export function calculateInsuranceCost(adults: number, children: number): number {
  return adults * OTHER_COSTS.insurance.adult + children * OTHER_COSTS.insurance.child;
}

// 计算月度总成本
export function calculateMonthlyCost(selection: UserSelection): {
  housing: number;
  food: number;
  transport: number;
  utilities: number;
  education: number;
  insurance: number;
  miscellaneous: number;
  total: number;
} {
  const housing = calculateHousingCost(selection.area);
  const food = calculateFoodCost(selection.foodMode);
  const transport = OTHER_COSTS.transport.avg;
  const utilities = OTHER_COSTS.utilities.avg;

  const child1YearlyCost = calculateChildEducationCost(selection.child1);
  const child2YearlyCost = calculateChildEducationCost(selection.child2);
  const education = (child1YearlyCost + child2YearlyCost) / 12;

  let insurance = 0;
  if (selection.includeInsurance) {
    insurance = calculateInsuranceCost(2, selection.insuranceCount) / 12;
  }

  const miscellaneous = OTHER_COSTS.miscellaneous.avg;

  const total = housing + food + transport + utilities + education + insurance + miscellaneous;

  return {
    housing,
    food,
    transport,
    utilities,
    education,
    insurance,
    miscellaneous,
    total
  };
}

// 计算第一年总成本
export function calculateFirstYearCost(selection: UserSelection): {
  oneTime: number;
  monthly: number;
  yearly: number;
  total: number;
  breakdown: {
    visa: number;
    relocation: number;
    tuition: number;
    exam: number;
    living: number;
  };
} {
  const plan = selection.plan === 'A' ? PLAN_OPTIONS.A : PLAN_OPTIONS.B;
  const monthlyCost = calculateMonthlyCost(selection);

  const oneTime = plan.oneTimeCost.visa +
                  plan.oneTimeCost.relocation +
                  (plan.oneTimeCost.tuition || 0) +
                  (plan.oneTimeCost.exam || 0);

  const monthly = monthlyCost.total;
  const yearly = monthly * 12;
  const total = oneTime + yearly;

  return {
    oneTime,
    monthly,
    yearly,
    total,
    breakdown: {
      visa: plan.oneTimeCost.visa,
      relocation: plan.oneTimeCost.relocation,
      tuition: plan.oneTimeCost.tuition || 0,
      exam: plan.oneTimeCost.exam || 0,
      living: yearly
    }
  };
}

// 计算7年总成本
export function calculateSevenYearCost(selection: UserSelection): number {
  const firstYear = calculateFirstYearCost(selection);
  const monthlyCost = calculateMonthlyCost(selection);

  // 假设生活成本每年增长3%
  let total = firstYear.total;
  let yearlyBase = monthlyCost.total * 12;

  for (let year = 2; year <= 7; year++) {
    yearlyBase *= 1.03;
    total += yearlyBase;
  }

  return Math.round(total);
}

// 生成决策建议
export function generateRecommendation(
  selection: UserSelection,
  input: DecisionInput
): {
  recommended: 'A' | 'B';
  confidence: number;
  reasons: string[];
  warnings: string[];
  actionItems: string[];
} {
  let scoreA = 0;
  let scoreB = 0;
  const reasons: string[] = [];
  const warnings: string[] = [];
  const actionItems: string[] = [];

  // 评估因素

  // 1. 丈夫是否能离开
  if (!input.canHusbandLeave) {
    scoreB += 30;
    reasons.push('丈夫无法长期离开，方案B更适合');
  } else {
    scoreA += 15;
  }

  // 2. 是否有可靠团队
  if (input.hasReliableTeam) {
    scoreA += 20;
    reasons.push('有可靠团队管理West Shore，方案A可行性提高');
  } else {
    scoreB += 25;
    warnings.push('缺乏可靠团队，方案A风险较高');
  }

  // 3. 妻子英语水平
  if (input.wifeEnglishLevel === 'advanced') {
    scoreB += 25;
    reasons.push('妻子英语水平高，进修方案成功率更高');
  } else if (input.wifeEnglishLevel === 'intermediate') {
    scoreB += 15;
    actionItems.push('建议妻子开始雅思备考，目标6.0分');
  } else {
    scoreB += 5;
    warnings.push('妻子英语基础需要加强，建议提前3-4个月备考');
    actionItems.push('立即开始雅思备考，考虑报名培训班');
  }

  // 4. 风险承受能力
  if (input.riskTolerance === 'low') {
    scoreB += 20;
    reasons.push('风险承受能力较低，方案B成功率更有保障');
  } else if (input.riskTolerance === 'high') {
    scoreA += 10;
  }

  // 5. 预算评估
  const firstYearCostA = calculateFirstYearCost({ ...selection, plan: 'A' });
  const firstYearCostB = calculateFirstYearCost({ ...selection, plan: 'B' });

  if (input.monthlyBudget * 12 < firstYearCostA.total) {
    warnings.push('当前预算可能无法支撑方案A的生活成本');
    scoreB += 10;
  }

  if (input.monthlyBudget * 12 < firstYearCostB.total) {
    warnings.push('当前预算可能无法支撑方案B的生活成本');
  }

  // 6. 年利润评估
  if (input.annualProfit > 500000) {
    scoreA += 15;
    reasons.push('West Shore年利润较高，值得保护业务连续性');
  }

  // 计算推荐
  const recommended = scoreB > scoreA ? 'B' : 'A';
  const totalScore = scoreA + scoreB;
  const confidence = Math.round(Math.max(scoreA, scoreB) / totalScore * 100);

  // 添加通用行动项
  if (recommended === 'B') {
    actionItems.push('2026年3月前：完成雅思考试');
    actionItems.push('2026年4月：提交香港教育大学申请');
    actionItems.push('2026年5-6月：准备签证材料');
    actionItems.push('2026年7-8月：开始在香港看房');
  } else {
    actionItems.push('与香港朋友确认雇佣意向和职位细节');
    actionItems.push('准备专才申请材料（学历、工作证明等）');
    actionItems.push('制定West Shore团队授权计划');
    actionItems.push('开始在香港考察租房区域');
  }

  return {
    recommended,
    confidence,
    reasons,
    warnings,
    actionItems
  };
}

// 格式化金额显示
export function formatCurrency(amount: number, currency: 'HKD' | 'RMB' = 'HKD'): string {
  const formatted = new Intl.NumberFormat('zh-CN').format(Math.round(amount));
  return currency === 'HKD' ? `HKD ${formatted}` : `¥${formatted}`;
}

// HKD转RMB
export function hkdToRmb(hkd: number, rate: number = 0.92): number {
  return Math.round(hkd * rate);
}
