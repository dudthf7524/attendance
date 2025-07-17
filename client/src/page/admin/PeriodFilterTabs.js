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
    <div className="w-full bg-white border border-gray-200 rounded-lg">
      {/* 탭 네비게이션 */}
      <nav className="flex border-b border-gray-200">
        {[
          { key: "day", label: "일별" },
          { key: "month", label: "월별" },
          { key: "year", label: "연도별" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`px-6 py-3 text-sm font-medium w-full transition ${activeTab === key
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-500"
              }`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* 탭 내용 */}
      <div className="p-6">
        {activeTab === "day" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600">시작일</label>
              <input
                type="date"
                name="startDay"
                value={filters.startDay}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">종료일</label>
              <input
                type="date"
                name="endDay"
                value={filters.endDay}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          </div>
        )}

        {activeTab === "month" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600">시작 년월</label>
              <input
                type="month"
                name="startMonth"
                value={filters.startMonth}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">종료 년월</label>
              <input
                type="month"
                name="endMonth"
                value={filters.endMonth}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          </div>
        )}

        {activeTab === "year" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600">시작 연도</label>
              <select
                name="startYear"
                value={filters.startYear}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="">선택</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">종료 연도</label>
              <select
                name="endYear"
                value={filters.endYear}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="">선택</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <button
          onClick={handleSearch}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          조회
        </button>
      </div>
    </div>
  );
};

export default PeriodFilterTabs;
