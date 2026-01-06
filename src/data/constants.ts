import type { PlanOption, UniversityInfo, TimelineEvent, AreaType, FoodMode, SchoolType } from '../types';

// 住房成本 (HKD/月)
export const HOUSING_COSTS: Record<AreaType, { min: number; max: number; avg: number; name: string; description: string }> = {
  newTerritories: {
    min: 12000,
    max: 18000,
    avg: 15000,
    name: '新界区',
    description: '元朗/屯门/天水围 - 经济实惠，交通时间较长'
  },
  kowloon: {
    min: 20000,
    max: 30000,
    avg: 25000,
    name: '九龙区',
    description: '九龙塘/黄埔/何文田 - 交通便利，教育资源丰富'
  },
  hongKongIsland: {
    min: 25000,
    max: 40000,
    avg: 32500,
    name: '港岛区',
    description: '北角/炮台山/太古 - 生活便利，租金较高'
  }
};

// 饮食成本 (HKD/月)
export const FOOD_COSTS: Record<FoodMode, { min: number; max: number; avg: number; name: string; description: string }> = {
  frugal: {
    min: 8000,
    max: 12000,
    avg: 10000,
    name: '节俭型',
    description: '主要自己做饭，偶尔外出'
  },
  normal: {
    min: 12000,
    max: 18000,
    avg: 15000,
    name: '普通型',
    description: '自己做饭与外食相结合'
  },
  comfortable: {
    min: 18000,
    max: 25000,
    avg: 21500,
    name: '舒适型',
    description: '经常外出就餐，生活品质优先'
  }
};

// 学校费用 (HKD/年)
export const SCHOOL_COSTS: Record<SchoolType, { tuition: number; extras: number; name: string; description: string; dseReady: boolean }> = {
  government: {
    tuition: 0,
    extras: 2000,
    name: '官立/津贴学校',
    description: '政府资助，学费全免，粤语教学，DSE主流路径',
    dseReady: true
  },
  direct_economy: {
    tuition: 25000,
    extras: 5000,
    name: '直资学校（经济型）',
    description: '部分政府资助，质量较高，学费适中',
    dseReady: true
  },
  direct_elite: {
    tuition: 45000,
    extras: 8000,
    name: '直资名校',
    description: '如拔萃、圣保罗等，需面试，竞争激烈',
    dseReady: true
  },
  international: {
    tuition: 180000,
    extras: 20000,
    name: '国际学校',
    description: 'IB/A-Level课程，不适合DSE升内地大学目标',
    dseReady: false
  }
};

// 其他固定成本
export const OTHER_COSTS = {
  transport: { min: 2000, max: 3000, avg: 2500, description: '2大人+2小孩' },
  utilities: { min: 1500, max: 2500, avg: 2000, description: '水电煤网' },
  miscellaneous: { min: 3000, max: 5000, avg: 4000, description: '日常杂费' },
  tutoring: { perSession: 400, description: '补习班（每次）' },
  extracurricular: { perSession: 300, description: '兴趣班（每次）' },
  insurance: { adult: 4000, child: 3000, description: '年度医疗保险' }
};

// 方案A时间线
const planATimeline: TimelineEvent[] = [
  {
    id: 'a1',
    date: '2026年Q1',
    title: '准备申请材料',
    description: '准备学历证明、工作经验证明、雇佣合同等',
    type: 'preparation'
  },
  {
    id: 'a2',
    date: '2026年Q1-Q2',
    title: '提交专才申请',
    description: '向入境处提交申请，等待审批',
    type: 'application'
  },
  {
    id: 'a3',
    date: '2026年Q2-Q3',
    title: '获批签证',
    description: '预计3-6个月获批，首次签证2年',
    type: 'approval'
  },
  {
    id: 'a4',
    date: '2026年暑假',
    title: '全家赴港',
    description: '找房、安顿、适应新环境',
    type: 'relocation'
  },
  {
    id: 'a5',
    date: '2026年9月',
    title: '孩子入学',
    description: '两个孩子正式入读香港学校',
    type: 'education'
  },
  {
    id: 'a6',
    date: '2028-2029年',
    title: '首次续签',
    description: '需证明真实工作关系，续签3年',
    type: 'milestone'
  },
  {
    id: 'a7',
    date: '2033年',
    title: '申请永居',
    description: '满7年可申请香港永久居民身份',
    type: 'milestone'
  }
];

// 方案B时间线
const planBTimeline: TimelineEvent[] = [
  {
    id: 'b1',
    date: '2026年1-3月',
    title: '雅思备考',
    description: '准备雅思考试，目标6.0分以上',
    type: 'preparation'
  },
  {
    id: 'b2',
    date: '2026年3-4月',
    title: '提交申请',
    description: '向目标院校提交硕士申请',
    type: 'application'
  },
  {
    id: 'b3',
    date: '2026年5-6月',
    title: '获得Offer',
    description: '收到录取通知书',
    type: 'approval'
  },
  {
    id: 'b4',
    date: '2026年6-7月',
    title: '申请签证',
    description: '申请学生签证和受养人签证',
    type: 'application'
  },
  {
    id: 'b5',
    date: '2026年9月',
    title: '全家赴港',
    description: '妻子入学，孩子入读香港学校',
    type: 'relocation'
  },
  {
    id: 'b6',
    date: '2027年9月',
    title: '毕业获IANG',
    description: '妻子毕业，获得IANG签证（2年）',
    type: 'milestone'
  },
  {
    id: 'b7',
    date: '2027年后',
    title: '身份优化',
    description: '可选择工作、创业或其他方式续签',
    type: 'milestone'
  },
  {
    id: 'b8',
    date: '2033年',
    title: '申请永居',
    description: '满7年可申请香港永久居民身份',
    type: 'milestone'
  }
];

// 方案详情
export const PLAN_OPTIONS: Record<'A' | 'B', PlanOption> = {
  A: {
    id: 'A',
    name: 'Talent Admission Scheme',
    nameCn: '专才计划',
    applicant: '丈夫（Operations Director）',
    successRate: 75,
    timeline: planATimeline,
    oneTimeCost: {
      visa: 5000,
      relocation: 30000
    },
    pros: [
      '有现成的雇主关系（朋友教育公司）',
      '丈夫有20年国际业务经验，职位包装空间大',
      '全家可立即获得香港身份',
      '可远程管理West Shore Furniture业务',
      '职位可设计为"大中华区教育家具采购总监"'
    ],
    cons: [
      '必须真实在港工作（周一到周五）',
      'West Shore日常运营需授权给团队',
      '续签时需证明真实工作关系，有一定风险',
      '短期内收入可能下降',
      '需要雇主配合提供完整材料'
    ],
    risks: {
      applicationSuccess: 7,
      renewalStability: 5,
      businessImpact: 4,
      familyImpact: 6,
      financialPressure: 5,
      flexibility: 4
    }
  },
  B: {
    id: 'B',
    name: 'Study Immigration',
    nameCn: '进修移民',
    applicant: '妻子（英语专业背景）',
    successRate: 95,
    timeline: planBTimeline,
    oneTimeCost: {
      visa: 3000,
      relocation: 30000,
      tuition: 120000,
      exam: 3000
    },
    pros: [
      '申请成功率最高（接近100%）',
      '妻子英文专业背景完美匹配TESOL/语言学',
      '丈夫可继续全职管理West Shore',
      'IANG签证灵活（可工作/创业/不工作）',
      '妻子额外获得硕士学历，提升个人发展',
      '2026年9月即可入学，时间紧凑高效'
    ],
    cons: [
      '第一年妻子需全职读书',
      '需要考雅思（6.0+）或托福（80+）',
      '第一年学费成本较高（约12-16万港币）',
      '丈夫作为受养人第一年不能在港工作',
      '妻子需要一定的学习适应期'
    ],
    risks: {
      applicationSuccess: 9,
      renewalStability: 8,
      businessImpact: 8,
      familyImpact: 7,
      financialPressure: 6,
      flexibility: 8
    }
  }
};

// 推荐院校
export const UNIVERSITIES: UniversityInfo[] = [
  {
    name: 'The Education University of Hong Kong',
    nameCn: '香港教育大学',
    program: 'MA in TESOL',
    tuition: 120000,
    duration: '1年全日制',
    requirements: [
      '学士学位',
      '雅思6.0或托福80',
      '英语相关背景优先'
    ],
    features: [
      '教育类专业排名亚洲领先',
      '课程实用性强',
      '就业率高',
      '学费相对较低'
    ],
    recommended: true
  },
  {
    name: 'Hong Kong Baptist University',
    nameCn: '香港浸会大学',
    program: 'MA in Applied Linguistics',
    tuition: 150000,
    duration: '1年全日制',
    requirements: [
      '学士学位',
      '雅思6.5或托福79',
      '语言学/英语背景'
    ],
    features: [
      '语言学研究实力强',
      '小班教学',
      '校园环境优美'
    ],
    recommended: false
  },
  {
    name: 'Lingnan University',
    nameCn: '岭南大学',
    program: 'MA in Chinese / MA in Education',
    tuition: 140000,
    duration: '1年全日制',
    requirements: [
      '学士学位',
      '雅思6.0或托福80',
      '相关专业背景'
    ],
    features: [
      '博雅教育传统',
      '师生比例优',
      '国际化氛围'
    ],
    recommended: false
  }
];

// 汇率（可更新）
export const EXCHANGE_RATE = {
  hkdToRmb: 0.92,
  lastUpdate: '2026-01-07'
};
