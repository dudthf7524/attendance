import React, { useState } from "react";
import PeriodFilterTabs from "./PeriodFilterTabs";
import SearchBox from "./SearchBox"; // 검색창 컴포넌트

const attendanceData = [
  {
    name: "김철수",
    date: "2025-06-21",
    checkIn: "09:02",
    checkOut: "18:01",
    workTime: "8시간 30분",
    late: false,
  },
  {
    name: "이영희",
    date: "2025-06-20",
    checkIn: "09:17",
    checkOut: "18:00",
    workTime: "8시간",
    late: true,
  },
  {
    name: "김철수",
    date: "2025-06-19",
    checkIn: "08:55",
    checkOut: "17:58",
    workTime: "8시간 20분",
    late: false,
  },
];

const AttendanceManagement = () => {
  const [keyword, setKeyword] = useState("");

  const filteredData = attendanceData.filter((item) =>
    item.name.includes(keyword)
  );

  return (
    <div className="h-[90vh] w-full bg-[#f9fafb] px-4 py-8 min-w-[700px] overflow-x-auto">
      {/* 상단 헤더 */}
      <div className="bg-white border border-blue-200 shadow-sm px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-blue-600">근태 기록</h1>
        <p className="text-sm text-gray-500 mt-1">
          이름으로 검색하고 지각 여부를 확인할 수 있습니다.
        </p>
      </div>

      {/* 기간 필터 탭 */}
      <div className="mb-4">
        <PeriodFilterTabs />
      </div>

      {/* 검색창 */}
      <div className="mb-8">
        <SearchBox keyword={keyword} onChange={setKeyword} />
      </div>

      {/* 기록 카드 */}
      <div className="bg-white border border-blue-300 overflow-hidden shadow-sm w-full h-[calc(100%-100px)] flex flex-col">
        <div className="grid grid-cols-6 bg-blue-50 text-blue-600 text-xs font-semibold px-6 py-3 tracking-wide border-b border-blue-100">
          <span>이름</span>
          <span>날짜</span>
          <span>출근 시간</span>
          <span>퇴근 시간</span>
          <span>근무 시간</span>
          <span>지각 여부</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredData.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-6 items-center px-6 py-4 text-sm text-gray-700 border-t border-blue-100 hover:bg-blue-50 transition"
            >
              <span className="font-medium text-gray-800">{item.name}</span>
              <span>{item.date}</span>
              <span>{item.checkIn}</span>
              <span>{item.checkOut}</span>
              <span>{item.workTime}</span>
              <span>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full font-medium text-center w-fit ${
                    item.late
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.late ? "지각" : "정상"}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
