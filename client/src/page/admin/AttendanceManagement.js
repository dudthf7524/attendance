import React, { useState } from "react";
import PeriodFilterTabs from "./PeriodFilterTabs";
import SearchBox from "./SearchBox"; // 검색창 컴포넌트
import { useSelector } from "react-redux";
import dayjs from "dayjs";

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

  const { attendanceDay } = useSelector((state) => state.attendance);

  const filteredData = attendanceDay?.filter((attendance) =>
    attendance?.user?.user_name?.includes(keyword)
  );

  const calculateWorkTime = (
    attendance_start_date,
    attendance_start_time,
    attendance_end_date,
    attendance_end_time,
    rest_start_time,
    rest_end_time,
  ) => {
    const start = dayjs(`${attendance_start_date} ${attendance_start_time}`);
    const end = dayjs(`${attendance_end_date} ${attendance_end_time}`);
    const restStart = dayjs(`2000-01-01 ${rest_start_time}`);
    const restEnd = dayjs(`2000-01-01 ${rest_end_time}`);
    const diffWork = end.diff(start, 'minute'); // 분 단위 차이
    const diffRest = restEnd.diff(restStart, 'minute');
    const diff = diffWork - diffRest;

    if (diff < 0) return "0";

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}시간 ${minutes}분`;
  };

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
        <div className="grid grid-cols-7 bg-blue-50 text-blue-600 text-xs font-semibold px-6 py-3 tracking-wide border-b border-blue-100">
          <span>이름</span>
          <span>날짜</span>
          <span>출근 시간</span>
          <span>퇴근 시간</span>
          <span>쉬는 시간</span>
          <span>근무 시간</span>
          <span>지각 여부</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredData?.map((attendance, idx) => (
            <div
              key={idx}
              className="grid grid-cols-7 items-center px-6 py-4 text-sm text-gray-700 border-t border-blue-100 hover:bg-blue-50 transition"
            >
              <span className="font-medium text-gray-800">{attendance.user.user_name}</span>
              <span>{attendance.attendance_start_date}</span>
              <span>{attendance.attendance_start_time}</span>
              <span>{attendance.attendance_end_time}</span>
              <span>{attendance.rest_start_time} ~ {attendance.rest_end_time}</span>
              <span>{calculateWorkTime(
                attendance.attendance_start_date,
                attendance.attendance_start_time,
                attendance.attendance_end_date,
                attendance.attendance_end_time,
                attendance.rest_start_time,
                attendance.rest_end_time,
              )}</span>
              <span>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full font-medium text-center w-fit ${attendance.attendance_start_state === "지각"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                    }`}
                >
                  {attendance?.attendance_start_state}
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
