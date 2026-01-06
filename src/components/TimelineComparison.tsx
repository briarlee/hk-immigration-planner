import { PLAN_OPTIONS } from '../data/constants';
import type { TimelineEvent } from '../types';
import {
  FileText, Send, CheckCircle, Plane, School, Flag, Calendar,
  AlertTriangle
} from 'lucide-react';

const getEventIcon = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'preparation':
      return FileText;
    case 'application':
      return Send;
    case 'approval':
      return CheckCircle;
    case 'relocation':
      return Plane;
    case 'education':
      return School;
    case 'milestone':
      return Flag;
    default:
      return Calendar;
  }
};

const getEventColor = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'preparation':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'application':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'approval':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'relocation':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'education':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    case 'milestone':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

interface TimelineComparisonProps {
  selectedPlan: 'A' | 'B' | null;
}

export default function TimelineComparison({ selectedPlan }: TimelineComparisonProps) {
  const planA = PLAN_OPTIONS.A;
  const planB = PLAN_OPTIONS.B;

  const renderTimeline = (events: TimelineEvent[], color: string, label: string) => (
    <div className="relative">
      {/* 时间线标签 */}
      <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
        color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
      }`}>
        {label}
      </div>

      {/* 时间线 */}
      <div className="relative">
        {/* 连接线 */}
        <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${
          color === 'blue' ? 'bg-blue-200' : 'bg-orange-200'
        }`} />

        {/* 事件列表 */}
        <div className="space-y-6">
          {events.map((event) => {
            const Icon = getEventIcon(event.type);
            const eventColor = getEventColor(event.type);

            return (
              <div key={event.id} className="relative flex gap-4">
                {/* 图标 */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 ${eventColor}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* 内容 */}
                <div className="flex-1 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {event.date}
                    </span>
                    {event.date.includes('2026年9月') && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        关键节点
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-800">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">时间线对比</h2>
        <p className="text-gray-600 mt-2">两个方案的关键时间节点对比</p>
      </div>

      {/* 重要提示 */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-800">时间紧迫性提醒</h4>
            <p className="text-sm text-red-700 mt-1">
              为确保孩子（5年级和4年级）能在<strong>2026年9月</strong>入读香港学校，
              必须在<strong>2026年7-8月</strong>前完成全部签证流程。
              方案B（进修移民）的时间节点更紧凑，请尽早准备雅思考试。
            </p>
          </div>
        </div>
      </div>

      {/* 时间线对比视图 */}
      {selectedPlan ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          {renderTimeline(
            selectedPlan === 'A' ? planA.timeline : planB.timeline,
            selectedPlan === 'A' ? 'blue' : 'orange',
            selectedPlan === 'A' ? `方案A：${planA.nameCn}` : `方案B：${planB.nameCn}`
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* 方案A时间线 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {renderTimeline(planA.timeline, 'blue', `方案A：${planA.nameCn}`)}
          </div>

          {/* 方案B时间线 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {renderTimeline(planB.timeline, 'orange', `方案B：${planB.nameCn}`)}
          </div>
        </div>
      )}

      {/* 甘特图简化版 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4">时间规划甘特图</h3>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* 时间轴头部 */}
            <div className="flex border-b border-gray-200 pb-2 mb-4">
              <div className="w-32 flex-shrink-0" />
              {['2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027', '2028-2029', '2033'].map((period) => (
                <div
                  key={period}
                  className="flex-1 text-center text-xs font-medium text-gray-600"
                >
                  {period}
                </div>
              ))}
            </div>

            {/* 方案A */}
            <div className="flex items-center mb-3">
              <div className="w-32 flex-shrink-0 text-sm font-medium text-blue-600">方案A 专才</div>
              <div className="flex-1 flex gap-1">
                <div className="flex-1 h-6 bg-gray-100 rounded" />
                <div className="flex-1 h-6 bg-yellow-200 rounded flex items-center justify-center text-xs">准备</div>
                <div className="flex-1 h-6 bg-blue-200 rounded flex items-center justify-center text-xs">申请审批</div>
                <div className="flex-1 h-6 bg-green-200 rounded flex items-center justify-center text-xs">赴港入学</div>
                <div className="flex-1 h-6 bg-purple-200 rounded flex items-center justify-center text-xs">在港生活</div>
                <div className="flex-1 h-6 bg-orange-200 rounded flex items-center justify-center text-xs">续签</div>
                <div className="flex-1 h-6 bg-red-200 rounded flex items-center justify-center text-xs">永居</div>
              </div>
            </div>

            {/* 方案B */}
            <div className="flex items-center">
              <div className="w-32 flex-shrink-0 text-sm font-medium text-orange-600">方案B 进修</div>
              <div className="flex-1 flex gap-1">
                <div className="flex-1 h-6 bg-yellow-200 rounded flex items-center justify-center text-xs">雅思备考</div>
                <div className="flex-1 h-6 bg-blue-200 rounded flex items-center justify-center text-xs">申请</div>
                <div className="flex-1 h-6 bg-green-200 rounded flex items-center justify-center text-xs">赴港入学</div>
                <div className="flex-1 h-6 bg-purple-200 rounded flex items-center justify-center text-xs">读书毕业</div>
                <div className="flex-1 h-6 bg-indigo-200 rounded flex items-center justify-center text-xs">IANG</div>
                <div className="flex-1 h-6 bg-teal-200 rounded flex items-center justify-center text-xs">身份优化</div>
                <div className="flex-1 h-6 bg-red-200 rounded flex items-center justify-center text-xs">永居</div>
              </div>
            </div>
          </div>
        </div>

        {/* 图例 */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 rounded" />
            <span className="text-xs text-gray-600">准备阶段</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 rounded" />
            <span className="text-xs text-gray-600">申请阶段</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 rounded" />
            <span className="text-xs text-gray-600">关键节点</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-200 rounded" />
            <span className="text-xs text-gray-600">在港期间</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 rounded" />
            <span className="text-xs text-gray-600">永居申请</span>
          </div>
        </div>
      </div>
    </div>
  );
}
