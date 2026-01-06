import { CheckCircle, XCircle, AlertCircle, User, Building, TrendingUp } from 'lucide-react';
import { PLAN_OPTIONS, UNIVERSITIES } from '../data/constants';

interface PlanComparisonProps {
  selectedPlan: 'A' | 'B' | null;
  onSelectPlan: (plan: 'A' | 'B') => void;
}

export default function PlanComparison({ selectedPlan, onSelectPlan }: PlanComparisonProps) {
  const planA = PLAN_OPTIONS.A;
  const planB = PLAN_OPTIONS.B;

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">方案对比分析</h2>
        <p className="text-gray-600 mt-2">点击选择您倾向的方案，查看详细信息</p>
      </div>

      {/* 方案卡片对比 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 方案A */}
        <div
          onClick={() => onSelectPlan('A')}
          className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 border-2 ${
            selectedPlan === 'A'
              ? 'border-blue-500 ring-2 ring-blue-200'
              : 'border-transparent hover:border-blue-300'
          }`}
        >
          {/* 方案头部 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">方案A：{planA.nameCn}</h3>
                <p className="text-sm text-gray-500">{planA.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{planA.successRate}%</div>
              <div className="text-xs text-gray-500">成功率</div>
            </div>
          </div>

          {/* 申请人信息 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-blue-700">
              <User className="w-4 h-4" />
              <span className="font-medium">申请人：{planA.applicant}</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">20+年教育家具行业经验</p>
          </div>

          {/* 关键信息 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">雇主</div>
              <div className="font-medium text-gray-800">朋友教育公司</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">职位</div>
              <div className="font-medium text-gray-800">大中华区采购总监</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">审批时间</div>
              <div className="font-medium text-gray-800">3-6个月</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">首签期限</div>
              <div className="font-medium text-gray-800">2年</div>
            </div>
          </div>

          {/* 优势 */}
          <div className="mb-4">
            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> 优势
            </h4>
            <ul className="space-y-1.5">
              {planA.pros.slice(0, 4).map((pro, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* 劣势 */}
          <div>
            <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-1">
              <XCircle className="w-4 h-4" /> 劣势
            </h4>
            <ul className="space-y-1.5">
              {planA.cons.slice(0, 4).map((con, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 方案B */}
        <div
          onClick={() => onSelectPlan('B')}
          className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 border-2 ${
            selectedPlan === 'B'
              ? 'border-orange-500 ring-2 ring-orange-200'
              : 'border-transparent hover:border-orange-300'
          }`}
        >
          {/* 推荐标签 */}
          <div className="absolute -top-3 right-4">
            <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
              推荐方案
            </span>
          </div>

          {/* 方案头部 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">方案B：{planB.nameCn}</h3>
                <p className="text-sm text-gray-500">{planB.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">{planB.successRate}%</div>
              <div className="text-xs text-gray-500">成功率</div>
            </div>
          </div>

          {/* 申请人信息 */}
          <div className="bg-orange-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-orange-700">
              <User className="w-4 h-4" />
              <span className="font-medium">申请人：{planB.applicant}</span>
            </div>
            <p className="text-sm text-orange-600 mt-1">大连外国语大学英文专业 | 1983年出生</p>
          </div>

          {/* 推荐院校 */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">推荐院校</h4>
            <div className="space-y-2">
              {UNIVERSITIES.map((uni, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    uni.recommended
                      ? 'bg-orange-50 border border-orange-200'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">{uni.nameCn}</span>
                      {uni.recommended && (
                        <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                          首选
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">
                      HKD {uni.tuition.toLocaleString()}/年
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{uni.program} | {uni.duration}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 优势 */}
          <div className="mb-4">
            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> 优势
            </h4>
            <ul className="space-y-1.5">
              {planB.pros.slice(0, 4).map((pro, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* 劣势 */}
          <div>
            <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-1">
              <XCircle className="w-4 h-4" /> 劣势
            </h4>
            <ul className="space-y-1.5">
              {planB.cons.slice(0, 4).map((con, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 重要提示 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800">重要提示：DSE教育目标</h4>
            <p className="text-sm text-yellow-700 mt-1">
              为确保两个孩子（5年级和4年级）能顺利通过DSE考试进入内地名校，
              建议<strong>2026年9月</strong>前完成全家赴港，让孩子尽早适应香港教育体系。
              无论选择哪个方案，都要确保孩子入读官津或直资学校（走DSE路径），
              <strong>不建议选择国际学校</strong>。
            </p>
          </div>
        </div>
      </div>

      {/* 快速对比表 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-6 py-4">
          <h3 className="font-bold text-lg">核心指标对比</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">对比项</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-blue-600">方案A 专才</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-orange-600">方案B 进修</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800">申请成功率</td>
                <td className="px-6 py-4 text-center text-sm">70-80%</td>
                <td className="px-6 py-4 text-center text-sm font-medium text-green-600">95%+</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">审批时间</td>
                <td className="px-6 py-4 text-center text-sm">3-6个月</td>
                <td className="px-6 py-4 text-center text-sm font-medium text-green-600">2-3个月</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800">第一年学费</td>
                <td className="px-6 py-4 text-center text-sm font-medium text-green-600">无</td>
                <td className="px-6 py-4 text-center text-sm">HKD 120,000-160,000</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">丈夫工作</td>
                <td className="px-6 py-4 text-center text-sm text-red-600">必须在港全职工作</td>
                <td className="px-6 py-4 text-center text-sm font-medium text-green-600">可继续管理West Shore</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800">续签灵活性</td>
                <td className="px-6 py-4 text-center text-sm">需证明真实雇佣关系</td>
                <td className="px-6 py-4 text-center text-sm font-medium text-green-600">IANG签证灵活</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">英语要求</td>
                <td className="px-6 py-4 text-center text-sm font-medium text-green-600">无</td>
                <td className="px-6 py-4 text-center text-sm">雅思6.0+/托福80+</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-800">永居时间</td>
                <td className="px-6 py-4 text-center text-sm">7年</td>
                <td className="px-6 py-4 text-center text-sm">7年</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
