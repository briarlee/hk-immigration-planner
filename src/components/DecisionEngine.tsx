import { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, ListChecks, Lightbulb, ArrowRight } from 'lucide-react';
import type { DecisionInput, UserSelection } from '../types';
import { generateRecommendation } from '../utils/calculations';

interface DecisionEngineProps {
  selection: UserSelection;
}

const defaultInput: DecisionInput = {
  annualProfit: 300000,
  monthlyBudget: 50000,
  canHusbandLeave: false,
  hasReliableTeam: false,
  wifeEnglishLevel: 'intermediate',
  riskTolerance: 'medium'
};

export default function DecisionEngine({ selection }: DecisionEngineProps) {
  const [input, setInput] = useState<DecisionInput>(defaultInput);
  const [showResult, setShowResult] = useState(false);
  const [recommendation, setRecommendation] = useState<ReturnType<typeof generateRecommendation> | null>(null);

  const handleGenerateRecommendation = () => {
    const result = generateRecommendation(selection, input);
    setRecommendation(result);
    setShowResult(true);
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">智能决策建议</h2>
        <p className="text-gray-600 mt-2">根据您的实际情况，获取个性化方案推荐</p>
      </div>

      {/* 输入参数表单 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-6 h-6 text-indigo-500" />
          <h3 className="font-semibold text-gray-800">请填写您的实际情况</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 年利润 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              West Shore年净利润（RMB）
            </label>
            <select
              value={input.annualProfit}
              onChange={(e) => setInput({ ...input, annualProfit: parseInt(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value={100000}>10-20万</option>
              <option value={200000}>20-30万</option>
              <option value={300000}>30-50万</option>
              <option value={500000}>50-80万</option>
              <option value={800000}>80-100万</option>
              <option value={1000000}>100万以上</option>
            </select>
          </div>

          {/* 月度预算 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              香港生活月度预算上限（HKD）
            </label>
            <select
              value={input.monthlyBudget}
              onChange={(e) => setInput({ ...input, monthlyBudget: parseInt(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value={30000}>3万以内</option>
              <option value={40000}>3-4万</option>
              <option value={50000}>4-5万</option>
              <option value={60000}>5-6万</option>
              <option value={80000}>6-8万</option>
              <option value={100000}>8万以上</option>
            </select>
          </div>

          {/* 丈夫是否能离开 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              丈夫是否能在香港全职工作2-3年？
            </label>
            <div className="flex gap-4">
              <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-all ${
                input.canHusbandLeave
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="canLeave"
                  checked={input.canHusbandLeave}
                  onChange={() => setInput({ ...input, canHusbandLeave: true })}
                  className="hidden"
                />
                可以
              </label>
              <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-all ${
                !input.canHusbandLeave
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="canLeave"
                  checked={!input.canHusbandLeave}
                  onChange={() => setInput({ ...input, canHusbandLeave: false })}
                  className="hidden"
                />
                不可以/困难
              </label>
            </div>
          </div>

          {/* 团队可靠性 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              West Shore是否有可信赖的团队独立运营？
            </label>
            <div className="flex gap-4">
              <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-all ${
                input.hasReliableTeam
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="hasTeam"
                  checked={input.hasReliableTeam}
                  onChange={() => setInput({ ...input, hasReliableTeam: true })}
                  className="hidden"
                />
                有
              </label>
              <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-all ${
                !input.hasReliableTeam
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="hasTeam"
                  checked={!input.hasReliableTeam}
                  onChange={() => setInput({ ...input, hasReliableTeam: false })}
                  className="hidden"
                />
                没有/不确定
              </label>
            </div>
          </div>

          {/* 妻子英语水平 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              妻子当前英语水平评估
            </label>
            <select
              value={input.wifeEnglishLevel}
              onChange={(e) =>
                setInput({ ...input, wifeEnglishLevel: e.target.value as DecisionInput['wifeEnglishLevel'] })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="basic">基础（需要较多备考时间）</option>
              <option value="intermediate">中等（英语专业毕业，但多年未用）</option>
              <option value="advanced">良好（日常能用英语交流）</option>
            </select>
          </div>

          {/* 风险承受能力 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              风险承受能力
            </label>
            <select
              value={input.riskTolerance}
              onChange={(e) =>
                setInput({ ...input, riskTolerance: e.target.value as DecisionInput['riskTolerance'] })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="low">保守型（优先考虑成功率）</option>
              <option value="medium">平衡型（综合考虑各因素）</option>
              <option value="high">进取型（愿意承担一定风险）</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateRecommendation}
          className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
        >
          <Brain className="w-5 h-5" />
          生成个性化建议
        </button>
      </div>

      {/* 结果展示 */}
      {showResult && recommendation && (
        <div className="space-y-6 animate-fadeIn">
          {/* 推荐方案 */}
          <div className={`rounded-xl p-6 ${
            recommendation.recommended === 'A'
              ? 'bg-gradient-to-br from-blue-500 to-blue-600'
              : 'bg-gradient-to-br from-orange-500 to-orange-600'
          } text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-80 mb-1">AI推荐方案</div>
                <h3 className="text-2xl font-bold">
                  方案{recommendation.recommended}：{recommendation.recommended === 'A' ? '专才计划' : '进修移民'}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{recommendation.confidence}%</div>
                <div className="text-sm opacity-80">推荐置信度</div>
              </div>
            </div>
          </div>

          {/* 推荐理由 */}
          {recommendation.reasons.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h4 className="font-semibold text-gray-800">推荐理由</h4>
              </div>
              <ul className="space-y-2">
                {recommendation.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 风险警示 */}
          {recommendation.warnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">风险警示</h4>
              </div>
              <ul className="space-y-2">
                {recommendation.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-yellow-800">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 行动清单 */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="w-5 h-5 text-indigo-500" />
              <h4 className="font-semibold text-gray-800">下一步行动清单</h4>
            </div>
            <div className="space-y-3">
              {recommendation.actionItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </div>
                  <span className="text-gray-700">{item}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* 时间规划建议 */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <h4 className="font-semibold text-gray-800 mb-4">时间规划建议</h4>
            <div className="grid md:grid-cols-4 gap-4">
              {recommendation.recommended === 'B' ? (
                <>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">立即开始</div>
                    <div className="font-medium text-gray-800">雅思备考</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">2026年3月</div>
                    <div className="font-medium text-gray-800">完成雅思考试</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">2026年4-5月</div>
                    <div className="font-medium text-gray-800">提交申请</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">2026年9月</div>
                    <div className="font-medium text-gray-800">全家赴港</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">立即开始</div>
                    <div className="font-medium text-gray-800">与雇主沟通</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">2026年Q1-Q2</div>
                    <div className="font-medium text-gray-800">准备材料提交</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">2026年Q2-Q3</div>
                    <div className="font-medium text-gray-800">等待审批</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">2026年9月</div>
                    <div className="font-medium text-gray-800">全家赴港</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
