import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ATTENDANCE_SEARCH_REQUEST } from "../../reducers/attendance";

const PeriodFilterTabs = () => {
  const [activeTab, setActiveTab] = useState("day");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i);

  const [filters, setFilters] = useState({
    startDay: "",
    endDay: "",
    startMonth: "",
    endMonth: "",
    startYear: "",
    endYear: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSearch = () => {
    console.log("일별, 월별, 연도별", activeTab)
    console.log("조회 조건:", filters);

    var data = {}

    if (activeTab == "day") {
      data = {
        activeTab: activeTab,
        startDay: filters.startDay,
        endDay: filters.endDay
      }
    } else if (activeTab == "month") {
      data = {
        activeTab: activeTab,
        startMonth: filters.startMonth,
        endMonth: filters.endMonth
      }
    } else if (activeTab == "year") {
      data = {
        activeTab: activeTab,
        startYear: filters.startYear,
        endYear: filters.endYear
      }
    }
    dispatch({
      type: ATTENDANCE_SEARCH_REQUEST,
      data: data
    })


  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-full">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">조회 기간 설정</h3>
        <p className="text-sm text-gray-600 mt-1">원하는 기간을 선택하여 데이터를 조회하세요</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="px-6 pt-6">
        <nav className="flex bg-gray-100 rounded-lg p-1">
          {[
            { key: "day", label: "일별", icon: "📅" },
            { key: "month", label: "월별", icon: "🗓️" },
            { key: "year", label: "연도별", icon: "📊" },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                activeTab === key
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(key)}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 탭 내용 */}
      <div className="p-6">
        {activeTab === "day" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                시작일 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDay"
                value={filters.startDay}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                종료일 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDay"
                value={filters.endDay}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 bg-gray-50"
              />
            </div>
          </div>
        )}

        {activeTab === "month" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                시작 년월 <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                name="startMonth"
                value={filters.startMonth}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                종료 년월 <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                name="endMonth"
                value={filters.endMonth}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 bg-gray-50"
              />
            </div>
          </div>
        )}

        {activeTab === "year" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                시작 연도 <span className="text-red-500">*</span>
              </label>
              <select
                name="startYear"
                value={filters.startYear}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 bg-gray-50"
              >
                <option value="">연도를 선택하세요</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                종료 연도 <span className="text-red-500">*</span>
              </label>
              <select
                name="endYear"
                value={filters.endYear}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 bg-gray-50"
              >
                <option value="">연도를 선택하세요</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="mt-8 flex space-x-3">
          <button
            onClick={handleSearch}
            className="flex-1 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            <span>🔍</span>
            <span>조회</span>
          </button>
          <button
            onClick={() => setFilters({
              startDay: "",
              endDay: "",
              startMonth: "",
              endMonth: "",
              startYear: "",
              endYear: "",
            })}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
          >
            <span>🔄</span>
            <span>초기화</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodFilterTabs;
