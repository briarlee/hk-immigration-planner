// 核心类型定义

// 学校类型
export type SchoolType = 'government' | 'direct_economy' | 'direct_elite' | 'international';

// 居住区域
export type AreaType = 'newTerritories' | 'kowloon' | 'hongKongIsland';

// 饮食模式
export type FoodMode = 'frugal' | 'normal' | 'comfortable';

// 身份方案类型
export type PlanType = 'A' | 'B' | 'mixed';

// 进修学制
export type StudyDuration = '1year' | '2year';

// 子女教育配置
export interface ChildEducation {
  schoolType: SchoolType;
  tutoring: boolean;
  tutoringCount: number; // 每周次数
  extracurricular: boolean;
  extracurricularCount: number;
}

// 成本计算结构
export interface CostCalculation {
  housing: number;
  food: number;
  transport: number;
  utilities: number;
  education: {
    child1: ChildEducation;
    child2: ChildEducation;
  };
  insurance: {
    adults: number;
    children: number;
  };
  miscellaneous: number;
}

// 时间线事件
export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'preparation' | 'application' | 'approval' | 'relocation' | 'education' | 'milestone';
}

// 风险评估
export interface RiskAssessment {
  applicationSuccess: number; // 1-10
  renewalStability: number;
  businessImpact: number;
  familyImpact: number;
  financialPressure: number;
  flexibility: number;
}

// 方案配置
export interface PlanOption {
  id: 'A' | 'B';
  name: string;
  nameCn: string;
  applicant: string;
  successRate: number;
  timeline: TimelineEvent[];
  oneTimeCost: {
    visa: number;
    relocation: number;
    tuition?: number;
    exam?: number;
  };
  pros: string[];
  cons: string[];
  risks: RiskAssessment;
}

// 用户选择
export interface UserSelection {
  plan: PlanType;
  studyDuration: StudyDuration;
  area: AreaType;
  foodMode: FoodMode;
  child1: ChildEducation;
  child2: ChildEducation;
  includeInsurance: boolean;
  insuranceCount: number;
}

// 决策输入参数
export interface DecisionInput {
  annualProfit: number;
  monthlyBudget: number;
  canHusbandLeave: boolean;
  hasReliableTeam: boolean;
  wifeEnglishLevel: 'basic' | 'intermediate' | 'advanced';
  riskTolerance: 'low' | 'medium' | 'high';
}

// 院校信息
export interface UniversityInfo {
  name: string;
  nameCn: string;
  program: string;
  tuition: number;
  duration: string;
  requirements: string[];
  features: string[];
  recommended: boolean;
}

// 学校信息
export interface SchoolInfo {
  name: string;
  type: SchoolType;
  area: AreaType;
  tuition: number;
  features: string[];
  dseReady: boolean;
}

// 汇率
export interface ExchangeRate {
  hkdToRmb: number;
  lastUpdate: string;
}
