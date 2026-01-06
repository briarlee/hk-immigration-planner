import { useState } from 'react';
import {
  Calculator, School, Home, BookOpen, FileText, ExternalLink,
  ArrowRightLeft, Clock, CheckSquare, Info
} from 'lucide-react';
import { SCHOOL_COSTS, HOUSING_COSTS, EXCHANGE_RATE } from '../data/constants';
import type { SchoolType, AreaType } from '../types';

export default function ToolsSection() {
  const [exchangeAmount, setExchangeAmount] = useState<number>(100000);
  const [exchangeDirection, setExchangeDirection] = useState<'hkdToRmb' | 'rmbToHkd'>('hkdToRmb');
  const [activeTab, setActiveTab] = useState<'exchange' | 'schools' | 'rent' | 'ielts' | 'checklist'>('exchange');

  const tabs = [
    { id: 'exchange', label: '汇率计算', icon: ArrowRightLeft },
    { id: 'schools', label: '学校参考', icon: School },
    { id: 'rent', label: '租房参考', icon: Home },
    { id: 'ielts', label: '雅思备考', icon: BookOpen },
    { id: 'checklist', label: '材料清单', icon: FileText }
  ];

  const convertCurrency = () => {
    if (exchangeDirection === 'hkdToRmb') {
      return exchangeAmount * EXCHANGE_RATE.hkdToRmb;
    }
    return exchangeAmount / EXCHANGE_RATE.hkdToRmb;
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">实用工具集</h2>
        <p className="text-gray-600 mt-2">帮助您规划香港生活的各种实用工具</p>
      </div>

      {/* 标签页 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* 汇率计算器 */}
          {activeTab === 'exchange' && (
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-gray-800">HKD/RMB 汇率转换</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  当前汇率：1 HKD = {EXCHANGE_RATE.hkdToRmb} RMB
                </div>
                <div className="text-xs text-gray-500">
                  更新时间：{EXCHANGE_RATE.lastUpdate}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {exchangeDirection === 'hkdToRmb' ? '港币金额 (HKD)' : '人民币金额 (RMB)'}
                  </label>
                  <input
                    type="number"
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  onClick={() =>
                    setExchangeDirection(exchangeDirection === 'hkdToRmb' ? 'rmbToHkd' : 'hkdToRmb')
                  }
                  className="w-full py-2 bg-gray-100 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  切换方向
                </button>

                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    {exchangeDirection === 'hkdToRmb' ? '等于人民币' : '等于港币'}
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {exchangeDirection === 'hkdToRmb'
                      ? `¥${convertCurrency().toLocaleString('zh-CN', { maximumFractionDigits: 2 })}`
                      : `HKD ${convertCurrency().toLocaleString('zh-CN', { maximumFractionDigits: 2 })}`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 学校参考 */}
          {activeTab === 'schools' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <School className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-gray-800">香港学校类型参考</h3>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>DSE升学目标提醒：</strong>选择官津学校或直资学校，
                    确保孩子走DSE课程路径。国际学校走IB/A-Level，不适合通过DSE升内地名校。
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {(Object.entries(SCHOOL_COSTS) as [SchoolType, typeof SCHOOL_COSTS[SchoolType]][]).map(
                  ([type, info]) => (
                    <div
                      key={type}
                      className={`p-4 rounded-lg border-2 ${
                        info.dseReady
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{info.name}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            info.dseReady
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {info.dseReady ? '适合DSE' : '不适合DSE'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">学费：</span>
                        <span className="font-medium">
                          {info.tuition === 0
                            ? '免费'
                            : `HKD ${info.tuition.toLocaleString()}/年`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">杂费：</span>
                        <span className="font-medium">
                          约 HKD {info.extras.toLocaleString()}/年
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  香港教育局小一入学信息
                </a>
                <a
                  href="https://www.schooland.hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  SchoolAnd 学校搜索
                </a>
              </div>
            </div>
          )}

          {/* 租房参考 */}
          {activeTab === 'rent' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-gray-800">各区租房参考价格</h3>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                以下为3房单位（约700-900呎）参考月租
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {(Object.entries(HOUSING_COSTS) as [AreaType, typeof HOUSING_COSTS[AreaType]][]).map(
                  ([area, info]) => (
                    <div key={area} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{info.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">最低：</span>
                          <span>HKD {info.min.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">平均：</span>
                          <span className="font-medium text-indigo-600">
                            HKD {info.avg.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">最高：</span>
                          <span>HKD {info.max.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://www.28hse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  28Hse 香港屋网
                </a>
                <a
                  href="https://www.591.com.hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  591房屋交易网
                </a>
                <a
                  href="https://www.centanet.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  中原地产
                </a>
              </div>
            </div>
          )}

          {/* 雅思备考 */}
          {activeTab === 'ielts' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-gray-800">雅思备考指南</h3>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-orange-800">
                  <strong>目标分数：</strong>雅思6.0分（单项不低于5.5）或托福80分
                  <br />
                  <strong>适用人群：</strong>方案B申请人（妻子）
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">备考时间规划</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">英语基础一般</div>
                        <div className="text-sm text-gray-600">建议备考3-4个月</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">英语基础较好</div>
                        <div className="text-sm text-gray-600">建议备考1-2个月</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">推荐备考资源</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-green-500" />
                      剑桥雅思真题 (剑4-剑18)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-green-500" />
                      雅思哥APP（口语题库）
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-green-500" />
                      Simon雅思写作课程
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-green-500" />
                      新东方/环球雅思培训班
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://ielts.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  雅思官网
                </a>
                <a
                  href="https://www.britishcouncil.cn/exam/ielts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  英国文化协会雅思报名
                </a>
              </div>
            </div>
          )}

          {/* 材料清单 */}
          {activeTab === 'checklist' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-gray-800">签证材料清单</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* 方案A材料 */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">方案A：专才计划</h4>
                  <ul className="space-y-2 text-sm text-blue-900">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>ID990A申请表</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>护照复印件</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>近照（白底）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>学历证明及认证</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>工作经验证明</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>香港雇主聘用信</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>雇主公司注册证明</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>雇主商业登记证</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>雇主财务报表</span>
                    </li>
                  </ul>
                </div>

                {/* 方案B材料 */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-3">方案B：进修移民</h4>
                  <ul className="space-y-2 text-sm text-orange-900">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>ID995A申请表</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>护照复印件</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>近照（白底）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>学历证明及认证</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>雅思/托福成绩单</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>香港院校录取通知书</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>财力证明（约30万港币）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>受养人申请表（家属）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>结婚证/出生证明</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <strong>提示：</strong>所有内地文件需要做公证和翻译。
                    建议预留2-4周时间准备材料。详细要求请参考香港入境处官网。
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <a
                  href="https://www.immd.gov.hk/hkt/services/visas/quality_migrant_admission_scheme.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  香港入境处官网
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
