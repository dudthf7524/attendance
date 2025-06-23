import React from "react";

const attendanceData = [
  {
    date: "2025-06-21",
    checkIn: "09:02",
    checkOut: "18:01",
    workTime: "8시간 30분",
    late: false,
  },
  {
    date: "2025-06-20",
    checkIn: "09:17",
    checkOut: "18:00",
    workTime: "8시간",
    late: true,
  },
  {
    date: "2025-06-19",
    checkIn: "08:55",
    checkOut: "17:58",
    workTime: "8시간 20분",
    late: false,
  },
];

const AttendanceHistoryPage = () => {
  return (
    <div className="h-screen w-full bg-[#f9fafb] px-4 py-8">
      {/* 상단 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600">근태 기록</h1>
        <p className="text-sm text-gray-500 mt-1">
          지난 출퇴근 기록을 확인하고 지각 여부를 한눈에 볼 수 있습니다.
        </p>
      </div>

      {/* 근태 목록 전체 카드 */}
      <div className="bg-white border border-blue-300 rounded-xl overflow-hidden shadow-sm w-full h-[calc(100%-100px)] flex flex-col">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-5 bg-blue-50 text-blue-600 text-xs font-semibold px-6 py-3 tracking-wide border-b border-blue-100">
          <span>날짜</span>
          <span>출근 시간</span>
          <span>퇴근 시간</span>
          <span>근무 시간</span>
          <span>지각 여부</span>
        </div>

        {/* 목록 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">
          {attendanceData.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-5 items-center px-6 py-4 text-sm text-gray-700 border-t border-blue-100 hover:bg-blue-50 transition"
            >
              <span className="text-gray-800 font-medium">{item.date}</span>
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

export default AttendanceHistoryPage;
