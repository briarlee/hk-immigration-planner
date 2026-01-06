import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { PLAN_OPTIONS } from '../data/constants';

interface RiskAssessmentProps {
  selectedPlan: 'A' | 'B' | null;
}

const riskLabels: Record<string, string> = {
  applicationSuccess: '申请成功率',
  renewalStability: '续签稳定性',
  businessImpact: 'West Shore影响',
  familyImpact: '家庭生活影响',
  financialPressure: '经济压力承受',
  flexibility: '时间灵活性'
};

const getRiskDescription = (key: string, _value: number, planId: 'A' | 'B'): string => {
  const descriptions: Record<string, Record<'A' | 'B', string>> = {
    applicationSuccess: {
      A: '专才计划成功率70-80%，需证明真实工作需求',
      B: '进修移民成功率95%+，申请门槛相对较低'
    },
    renewalStability: {
      A: '续签需证明真实雇佣关系，有一定风险',
      B: 'IANG签证灵活，续签方式多样'
    },
    businessImpact: {
      A: '丈夫需在港工作，West Shore需授权团队管理',
      B: '丈夫可继续全职管理，业务影响最小'
    },
    familyImpact: {
      A: '全家需适应丈夫在港工作的生活模式',
      B: '妻子读书期间家庭需适应，但更灵活'
    },
    financialPressure: {
      A: '需在港获得稳定收入，收入来源需调整',
      B: '可依靠West Shore收入，财务压力可控'
    },
    flexibility: {
      A: '工作时间固定，灵活性较低',
      B: 'IANG签证灵活，可根据情况调整'
    }
  };
  return descriptions[key]?.[planId] || '';
};

export default function RiskAssessment(_props: RiskAssessmentProps) {
  const planA = PLAN_OPTIONS.A;
  const planB = PLAN_OPTIONS.B;

  // 准备雷达图数据
  const radarData = Object.keys(riskLabels).map((key) => ({
    subject: riskLabels[key],
    planA: planA.risks[key as keyof typeof planA.risks],
    planB: planB.risks[key as keyof typeof planB.risks],
    fullMark: 10
  }));

  // 计算综合得分
  const calculateOverallScore = (risks: typeof planA.risks) => {
    const values = Object.values(risks);
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  const renderRiskCard = (planId: 'A' | 'B') => {
    const plan = planId === 'A' ? planA : planB;
    const score = calculateOverallScore(plan.risks);

    return (
      <div className={`bg-white rounded-xl shadow-md p-5 border-t-4 ${
        planId === 'A' ? 'border-blue-500' : 'border-orange-500'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className={`font-semibold ${planId === 'A' ? 'text-blue-700' : 'text-orange-700'}`}>
            方案{planId}：{plan.nameCn}
          </h4>
          <div className="text-center">
            <div className={`text-3xl font-bold ${planId === 'A' ? 'text-blue-600' : 'text-orange-600'}`}>
              {score}
            </div>
            <div className="text-xs text-gray-500">综合评分</div>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(plan.risks).map(([key, value]) => {
            const label = riskLabels[key];
            let barColor = 'bg-green-500';
            let textColor = 'text-green-600';
            if (value < 5) {
              barColor = 'bg-red-500';
              textColor = 'text-red-600';
            } else if (value < 7) {
              barColor = 'bg-yellow-500';
              textColor = 'text-yellow-600';
            }

            return (
              <div key={key} className="group relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{label}</span>
                  <span className={`text-sm font-medium ${textColor}`}>{value}/10</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${value * 10}%` }}
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute left-0 right-0 -bottom-12 bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  {getRiskDescription(key, value, planId)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">风险评估分析</h2>
        <p className="text-gray-600 mt-2">从多个维度评估两个方案的风险与优势</p>
      </div>

      {/* 评分说明 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">评分说明</span>
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600">7-10分：低风险/优势明显</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-gray-600">5-6分：中等风险/需注意</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-gray-600">1-4分：高风险/明显劣势</span>
          </div>
        </div>
      </div>

      {/* 雷达图 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4 text-center">风险雷达图对比</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#4B5563', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 10]}
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
              />
              <Radar
                name="方案A 专才"
                dataKey="planA"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Radar
                name="方案B 进修"
                dataKey="planB"
                stroke="#F97316"
                fill="#F97316"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 详细评分卡片 */}
      <div className="grid md:grid-cols-2 gap-6">
        {renderRiskCard('A')}
        {renderRiskCard('B')}
      </div>

      {/* 风险对比分析 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4">关键风险对比分析</h3>

        <div className="space-y-4">
          {/* 申请成功率 */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium text-gray-800">申请成功率</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                  <strong>方案A（70-80%）：</strong>专才计划需要证明雇佣公司确实需要该人才，
                  且申请人的专业背景与职位高度匹配。丈夫20年经验是优势，但需要雇主提供充分材料。
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="text-sm text-orange-800">
                  <strong>方案B（95%+）：</strong>进修移民是最稳妥的方式，只要满足入学条件
                  （学历+雅思），获批几乎是确定的。妻子英语专业背景非常适合TESOL专业。
                </div>
              </div>
            </div>
          </div>

          {/* 续签风险 */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-gray-800">续签稳定性</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                  <strong>方案A：</strong>续签时入境处会审查真实工作关系，包括薪资记录、
                  MPF供款、实际工作内容等。如果被认定为"假雇佣"，可能面临签证被拒甚至追究责任。
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="text-sm text-orange-800">
                  <strong>方案B：</strong>毕业后获IANG签证（2年），续签时可选择受雇、
                  创业或其他方式。即使不工作，只要保持在港时间要求，续签难度较低。
                </div>
              </div>
            </div>
          </div>

          {/* West Shore影响 */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-gray-800">West Shore业务影响</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm text-blue-800">
                  <strong>方案A（高影响）：</strong>丈夫作为主申请人必须在港真实工作，
                  意味着West Shore日常运营需要完全交给团队。这是方案A最大的不确定因素。
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="text-sm text-orange-800">
                  <strong>方案B（低影响）：</strong>丈夫作为受养人不能在港工作，
                  但可以继续远程管理West Shore。业务连续性得到保障，是方案B的核心优势。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 综合建议 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">风险评估结论</h4>
            <p className="text-gray-700">
              从风险控制角度，<strong className="text-orange-600">方案B（进修移民）</strong>综合评分更高，
              主要优势在于：申请成功率更高、续签更灵活、对West Shore业务影响最小。
              <strong className="text-blue-600">方案A（专才计划）</strong>虽然也可行，
              但需要更多准备工作和更强的风险承受能力。建议根据您的实际情况和风险偏好做出选择。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
