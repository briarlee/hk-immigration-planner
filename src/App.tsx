import { useState } from 'react';
import {
  Scale, Calculator, Clock, Shield, Brain, Wrench,
  ChevronRight, Menu, X, Home
} from 'lucide-react';
import type { UserSelection } from './types';
import PlanComparison from './components/PlanComparison';
import CostCalculator from './components/CostCalculator';
import TimelineComparison from './components/TimelineComparison';
import RiskAssessment from './components/RiskAssessment';
import DecisionEngine from './components/DecisionEngine';
import ToolsSection from './components/ToolsSection';

// 默认选择
const defaultSelection: UserSelection = {
  plan: 'B',
  studyDuration: '1year',
  area: 'kowloon',
  foodMode: 'normal',
  child1: {
    schoolType: 'government',
    tutoring: true,
    tutoringCount: 2,
    extracurricular: true,
    extracurricularCount: 1
  },
  child2: {
    schoolType: 'government',
    tutoring: true,
    tutoringCount: 2,
    extracurricular: true,
    extracurricularCount: 1
  },
  includeInsurance: true,
  insuranceCount: 4
};

type Section = 'home' | 'comparison' | 'calculator' | 'timeline' | 'risk' | 'decision' | 'tools';

const sections: { id: Section; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'comparison', label: '方案对比', icon: Scale },
  { id: 'calculator', label: '成本计算', icon: Calculator },
  { id: 'timeline', label: '时间规划', icon: Clock },
  { id: 'risk', label: '风险评估', icon: Shield },
  { id: 'decision', label: '智能建议', icon: Brain },
  { id: 'tools', label: '实用工具', icon: Wrench }
];

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [selectedPlan, setSelectedPlan] = useState<'A' | 'B' | null>(null);
  const [selection, setSelection] = useState<UserSelection>(defaultSelection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePlanSelect = (plan: 'A' | 'B') => {
    setSelectedPlan(plan);
    setSelection({ ...selection, plan });
  };

  const renderHome = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            香港身份规划对比工具
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            为您的家庭定制最优香港身份申请方案，助力孩子通过DSE进入内地名校
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveSection('comparison')}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              开始方案对比
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSection('decision')}
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-400 transition-colors flex items-center gap-2"
            >
              获取智能建议
              <Brain className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-bold text-yellow-800 mb-3">核心目标</h3>
        <ul className="space-y-2 text-yellow-800">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            为两个孩子（5年级和4年级）获得香港身份
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            通过DSE考试进入内地名校（北大、清华、复旦等）
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <strong>关键时间节点：2026年9月全家赴港</strong>
          </li>
        </ul>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Plan A Card */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          onClick={() => {
            setSelectedPlan('A');
            setActiveSection('comparison');
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">方案A：专才计划</h3>
            <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">70-80%</span>
          </div>
          <p className="text-gray-600 mb-4">丈夫通过朋友教育公司雇佣申请专才计划</p>
          <div className="flex items-center text-blue-600">
            <span className="text-sm font-medium">查看详情</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Plan B Card */}
        <div
          className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-l-4 border-orange-500 relative"
          onClick={() => {
            setSelectedPlan('B');
            setActiveSection('comparison');
          }}
        >
          <div className="absolute -top-3 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            推荐
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">方案B：进修移民</h3>
            <span className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full">95%+</span>
          </div>
          <p className="text-gray-600 mb-4">妻子申请香港硕士课程，全家随同赴港</p>
          <div className="flex items-center text-orange-600">
            <span className="text-sm font-medium">查看详情</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-left group"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition-colors">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-800">{section.label}</h4>
            </button>
          );
        })}
      </div>

      {/* Family Info */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">家庭情况概览</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">丈夫</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Operations Director</li>
              <li>• 20+年教育家具行业经验</li>
              <li>• 经营West Shore Furniture</li>
              <li>• 有香港朋友可提供雇佣</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">妻子</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 1983年出生（42岁）</li>
              <li>• 大连外国语大学英文专业毕业</li>
              <li>• 英语基础好，适合进修</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-medium text-gray-700 mb-2">子女</h4>
            <div className="flex gap-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">孩子1：</span>5年级
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">孩子2：</span>4年级
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => setActiveSection('home')}
              className="flex items-center gap-2 font-bold text-xl text-indigo-600"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="hidden sm:inline">香港身份规划</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="p-4 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {activeSection !== 'home' && (
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button
              onClick={() => setActiveSection('home')}
              className="text-gray-500 hover:text-gray-700"
            >
              首页
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800 font-medium">
              {sections.find((s) => s.id === activeSection)?.label}
            </span>
          </div>
        )}

        {/* Section Content */}
        {activeSection === 'home' && renderHome()}
        {activeSection === 'comparison' && (
          <PlanComparison selectedPlan={selectedPlan} onSelectPlan={handlePlanSelect} />
        )}
        {activeSection === 'calculator' && (
          <CostCalculator selection={selection} onSelectionChange={setSelection} />
        )}
        {activeSection === 'timeline' && <TimelineComparison selectedPlan={selectedPlan} />}
        {activeSection === 'risk' && <RiskAssessment selectedPlan={selectedPlan} />}
        {activeSection === 'decision' && <DecisionEngine selection={selection} />}
        {activeSection === 'tools' && <ToolsSection />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-3">香港身份规划工具</h4>
              <p className="text-sm">
                帮助大陆家庭规划香港身份申请方案，为孩子DSE升学铺路。
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">重要链接</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a
                    href="https://www.immd.gov.hk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    香港入境处
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.edb.gov.hk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    香港教育局
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.eduhk.hk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    香港教育大学
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">免责声明</h4>
              <p className="text-sm">
                本工具仅供参考，具体政策以香港入境处官方信息为准。
                建议在正式申请前咨询专业移民顾问。
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
            © 2026 香港身份规划工具 | 为DSE升学目标设计
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
