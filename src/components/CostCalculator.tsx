import { useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Home, Utensils, Bus, Lightbulb, GraduationCap, Heart, Package, Calculator } from 'lucide-react';
import type { UserSelection, AreaType, FoodMode, SchoolType } from '../types';
import { HOUSING_COSTS, FOOD_COSTS, SCHOOL_COSTS, OTHER_COSTS, EXCHANGE_RATE } from '../data/constants';
import { calculateMonthlyCost, calculateFirstYearCost, calculateSevenYearCost, formatCurrency, hkdToRmb } from '../utils/calculations';

interface CostCalculatorProps {
  selection: UserSelection;
  onSelectionChange: (selection: UserSelection) => void;
}

const COLORS = ['#3B82F6', '#F97316', '#10B981', '#6366F1', '#EC4899', '#8B5CF6', '#14B8A6'];

export default function CostCalculator({ selection, onSelectionChange }: CostCalculatorProps) {
  const [showRmb, setShowRmb] = useState(false);
  const monthlyCost = calculateMonthlyCost(selection);
  const firstYearCost = calculateFirstYearCost(selection);
  const sevenYearCost = calculateSevenYearCost(selection);

  // 饼图数据
  const pieData = [
    { name: '住房', value: monthlyCost.housing, icon: Home },
    { name: '饮食', value: monthlyCost.food, icon: Utensils },
    { name: '交通', value: monthlyCost.transport, icon: Bus },
    { name: '水电煤网', value: monthlyCost.utilities, icon: Lightbulb },
    { name: '子女教育', value: monthlyCost.education, icon: GraduationCap },
    { name: '医疗保险', value: monthlyCost.insurance, icon: Heart },
    { name: '其他杂费', value: monthlyCost.miscellaneous, icon: Package },
  ].filter(item => item.value > 0);

  // 年度成本柱状图数据
  const yearlyData = [
    { name: '第1年', total: firstYearCost.total },
    { name: '第2年', total: monthlyCost.total * 12 * 1.03 },
    { name: '第3年', total: monthlyCost.total * 12 * 1.03 * 1.03 },
    { name: '第4年', total: monthlyCost.total * 12 * Math.pow(1.03, 3) },
    { name: '第5年', total: monthlyCost.total * 12 * Math.pow(1.03, 4) },
    { name: '第6年', total: monthlyCost.total * 12 * Math.pow(1.03, 5) },
    { name: '第7年', total: monthlyCost.total * 12 * Math.pow(1.03, 6) },
  ];

  const displayAmount = (amount: number) => {
    if (showRmb) {
      return formatCurrency(hkdToRmb(amount, EXCHANGE_RATE.hkdToRmb), 'RMB');
    }
    return formatCurrency(amount, 'HKD');
  };

  return (
    <div className="space-y-6">
      {/* 标题和货币切换 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">生活成本计算器</h2>
          <p className="text-gray-600 mt-1">自定义选项，实时计算每月/年度开支</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${!showRmb ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>HKD</span>
          <button
            onClick={() => setShowRmb(!showRmb)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              showRmb ? 'bg-orange-500' : 'bg-blue-500'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                showRmb ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${showRmb ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>RMB</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 选择器面板 */}
        <div className="lg:col-span-1 space-y-4">
          {/* 居住区域选择 */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-500" />
              居住区域
            </h3>
            <div className="space-y-2">
              {(Object.keys(HOUSING_COSTS) as AreaType[]).map((area) => (
                <label
                  key={area}
                  className={`block p-3 rounded-lg cursor-pointer transition-all ${
                    selection.area === area
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="area"
                    value={area}
                    checked={selection.area === area}
                    onChange={() => onSelectionChange({ ...selection, area })}
                    className="hidden"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800">{HOUSING_COSTS[area].name}</div>
                      <div className="text-xs text-gray-500">{HOUSING_COSTS[area].description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">
                        {displayAmount(HOUSING_COSTS[area].avg)}
                      </div>
                      <div className="text-xs text-gray-500">/月</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 饮食模式选择 */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              饮食模式
            </h3>
            <div className="space-y-2">
              {(Object.keys(FOOD_COSTS) as FoodMode[]).map((mode) => (
                <label
                  key={mode}
                  className={`block p-3 rounded-lg cursor-pointer transition-all ${
                    selection.foodMode === mode
                      ? 'bg-orange-50 border-2 border-orange-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="foodMode"
                    value={mode}
                    checked={selection.foodMode === mode}
                    onChange={() => onSelectionChange({ ...selection, foodMode: mode })}
                    className="hidden"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800">{FOOD_COSTS[mode].name}</div>
                      <div className="text-xs text-gray-500">{FOOD_COSTS[mode].description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">
                        {displayAmount(FOOD_COSTS[mode].avg)}
                      </div>
                      <div className="text-xs text-gray-500">/月</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 子女教育选择 */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-500" />
              子女教育
            </h3>

            {/* 孩子1 */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">孩子1（5年级）</div>
              <select
                value={selection.child1.schoolType}
                onChange={(e) =>
                  onSelectionChange({
                    ...selection,
                    child1: { ...selection.child1, schoolType: e.target.value as SchoolType }
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                {(Object.keys(SCHOOL_COSTS) as SchoolType[]).map((type) => (
                  <option key={type} value={type}>
                    {SCHOOL_COSTS[type].name} - {SCHOOL_COSTS[type].tuition === 0 ? '免费' : `HKD ${SCHOOL_COSTS[type].tuition.toLocaleString()}/年`}
                    {!SCHOOL_COSTS[type].dseReady && ' (不推荐)'}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selection.child1.tutoring}
                    onChange={(e) =>
                      onSelectionChange({
                        ...selection,
                        child1: { ...selection.child1, tutoring: e.target.checked }
                      })
                    }
                    className="rounded text-blue-500"
                  />
                  补习班
                </label>
                {selection.child1.tutoring && (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selection.child1.tutoringCount}
                    onChange={(e) =>
                      onSelectionChange({
                        ...selection,
                        child1: { ...selection.child1, tutoringCount: parseInt(e.target.value) || 1 }
                      })
                    }
                    className="w-16 p-1 border border-gray-300 rounded text-sm"
                  />
                )}
                <span className="text-xs text-gray-500">次/周</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selection.child1.extracurricular}
                    onChange={(e) =>
                      onSelectionChange({
                        ...selection,
                        child1: { ...selection.child1, extracurricular: e.target.checked }
                      })
                    }
                    className="rounded text-blue-500"
                  />
                  兴趣班
                </label>
                {selection.child1.extracurricular && (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selection.child1.extracurricularCount}
                    onChange={(e) =>
                      onSelectionChange({
                        ...selection,
                        child1: { ...selection.child1, extracurricularCount: parseInt(e.target.value) || 1 }
                      })
                    }
                    className="w-16 p-1 border border-gray-300 rounded text-sm"
                  />
                )}
                <span className="text-xs text-gray-500">次/周</span>
              </div>
            </div>

            {/* 孩子2 */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">孩子2（4年级）</div>
              <select
                value={selection.child2.schoolType}
                onChange={(e) =>
                  onSelectionChange({
                    ...selection,
                    child2: { ...selection.child2, schoolType: e.target.value as SchoolType }
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                {(Object.keys(SCHOOL_COSTS) as SchoolType[]).map((type) => (
                  <option key={type} value={type}>
                    {SCHOOL_COSTS[type].name} - {SCHOOL_COSTS[type].tuition === 0 ? '免费' : `HKD ${SCHOOL_COSTS[type].tuition.toLocaleString()}/年`}
                    {!SCHOOL_COSTS[type].dseReady && ' (不推荐)'}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selection.child2.tutoring}
                    onChange={(e) =>
                      onSelectionChange({
                        ...selection,
                        child2: { ...selection.child2, tutoring: e.target.checked }
                      })
                    }
                    className="rounded text-blue-500"
                  />
                  补习班
                </label>
                {selection.child2.tutoring && (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selection.child2.tutoringCount}
                    onChange={(e) =>
                      onSelectionChange({
                        ...selection,
                        child2: { ...selection.child2, tutoringCount: parseInt(e.target.value) || 1 }
                      })
                    }
                    className="w-16 p-1 border border-gray-300 rounded text-sm"
                  />
                )}
                <span className="text-xs text-gray-500">次/周</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selection.child2.extracurricular}
                    onChange={(e) =>
                      onSelectionChange({
                        ...selection,
                        child2: { ...selection.child2, extracurricular: e.target.checked }
                      })
                    }
                    className="rounded text-blue-500"
                  />
                  兴趣班
                </label>
                {selection.child2.extracurricular && (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selection.child2.extracurricularCount}
                    onChange={(e) =>
                      onSelectionChange({
                        ...selection,
                        child2: { ...selection.child2, extracurricularCount: parseInt(e.target.value) || 1 }
                      })
                    }
                    className="w-16 p-1 border border-gray-300 rounded text-sm"
                  />
                )}
                <span className="text-xs text-gray-500">次/周</span>
              </div>
            </div>
          </div>

          {/* 医疗保险 */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              医疗保险
            </h3>
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={selection.includeInsurance}
                onChange={(e) =>
                  onSelectionChange({ ...selection, includeInsurance: e.target.checked })
                }
                className="rounded text-red-500"
              />
              <span className="text-sm text-gray-700">购买医疗保险</span>
            </label>
            {selection.includeInsurance && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">投保人数：</span>
                <select
                  value={selection.insuranceCount}
                  onChange={(e) =>
                    onSelectionChange({ ...selection, insuranceCount: parseInt(e.target.value) })
                  }
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value={2}>2人（两个孩子）</option>
                  <option value={4}>4人（全家）</option>
                </select>
              </div>
            )}
            <div className="text-xs text-gray-500 mt-2">
              成人: {displayAmount(OTHER_COSTS.insurance.adult)}/年 | 儿童: {displayAmount(OTHER_COSTS.insurance.child)}/年
            </div>
          </div>
        </div>

        {/* 结果展示面板 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 月度成本汇总 */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-500" />
                每月成本明细
              </h3>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600">{displayAmount(monthlyCost.total)}</div>
                <div className="text-sm text-gray-500">/月</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* 饼图 */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => displayAmount(Number(value))}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 详细列表 */}
              <div className="space-y-2">
                {pieData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">{displayAmount(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 年度成本对比 */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-800 mb-4">7年成本趋势（含3%年增长）</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) =>
                      showRmb
                        ? `¥${(hkdToRmb(value, EXCHANGE_RATE.hkdToRmb) / 10000).toFixed(0)}万`
                        : `${(value / 10000).toFixed(0)}万`
                    }
                  />
                  <Tooltip
                    formatter={(value) => displayAmount(Number(value))}
                  />
                  <Bar dataKey="total" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 成本汇总卡片 */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
              <div className="text-sm opacity-80">第一年总成本</div>
              <div className="text-2xl font-bold mt-1">{displayAmount(firstYearCost.total)}</div>
              <div className="text-xs opacity-70 mt-2">
                一次性: {displayAmount(firstYearCost.oneTime)} | 生活: {displayAmount(firstYearCost.yearly)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
              <div className="text-sm opacity-80">年度生活成本</div>
              <div className="text-2xl font-bold mt-1">{displayAmount(monthlyCost.total * 12)}</div>
              <div className="text-xs opacity-70 mt-2">月均: {displayAmount(monthlyCost.total)}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
              <div className="text-sm opacity-80">7年总成本</div>
              <div className="text-2xl font-bold mt-1">{displayAmount(sevenYearCost)}</div>
              <div className="text-xs opacity-70 mt-2">含每年3%增长预估</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
