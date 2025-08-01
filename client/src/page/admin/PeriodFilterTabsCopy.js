// PeriodFilterTabs.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ATTENDANCE_SEARCH_REQUEST } from "../../reducers/attendance";

const PeriodFilterTabs = () => {
  const dispatch = useDispatch();

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

  const [checkedTabs, setCheckedTabs] = useState({
    day: false,
    month: false,
    year: false,
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleTab = (tab) => {
    setCheckedTabs({ ...checkedTabs, [tab]: !checkedTabs[tab] });
  };

  const handleSearch = () => {
    const data = {
      ...checkedTabs,
      ...filters,
    };
    dispatch({ type: ATTENDANCE_SEARCH_REQUEST, data });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md px-6 py-6 w-full">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <label className="text-sm font-medium text-gray-700">검색옵션</label>
        {[
          "전체",
          "임시저장",
          "등록완료",
          "대기정보",
          "승인요청",
          "승인취소",
          "내부작성",
          "최종승인",
        ].map((label, index) => (
          <label key={index} className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              className="mr-1.5"
              defaultChecked={label === "등록완료" || label === "승인요청"}
            />
            {label}
          </label>
        ))}
        <button
          onClick={handleSearch}
          className="ml-auto bg-indigo-100 text-indigo-600 text-sm font-medium px-4 py-1.5 rounded-md"
        >
          검색
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        {[
          { key: "day", label: "일별" },
          { key: "month", label: "월별" },
          { key: "year", label: "연도별" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkedTabs[key]}
              onChange={() => toggleTab(key)}
            />
            {label}
          </label>
        ))}
      </div>

      {checkedTabs.day && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">시작일</label>
            <input
              type="date"
              name="startDay"
              value={filters.startDay}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">종료일</label>
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

      {checkedTabs.month && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">시작 년월</label>
            <input
              type="month"
              name="startMonth"
              value={filters.startMonth}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">종료 년월</label>
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

      {checkedTabs.year && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">시작 연도</label>
            <select
              name="startYear"
              value={filters.startYear}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">선택</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">종료 연도</label>
            <select
              name="endYear"
              value={filters.endYear}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">선택</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">검색필터</label>
        <select className="text-sm border border-gray-300 rounded px-2 py-1">
          <option>전체</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className="flex-1 text-sm border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default PeriodFilterTabs;
