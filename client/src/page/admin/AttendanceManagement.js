import React, { useState } from "react";
import PeriodFilterTabs from "./PeriodFilterTabs";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

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
    rest_end_time
  ) => {
    const start = dayjs(`${attendance_start_date} ${attendance_start_time}`);
    const end = dayjs(`${attendance_end_date} ${attendance_end_time}`);
    const restStart = dayjs(`2000-01-01 ${rest_start_time}`);
    const restEnd = dayjs(`2000-01-01 ${rest_end_time}`);
    const diffWork = end.diff(start, "minute");
    const diffRest = restEnd.diff(restStart, "minute");
    const diff = diffWork - diffRest;

    if (diff < 0) return "0";

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}시간 ${minutes}분`;
  };

  return (
    <div className="min-w-[1000px] w-full overflow-x-auto">
      <main className="flex-1">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-4">
          {/* 타이틀 */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-blue-600">근태 기록</h2>
              <p className="text-sm text-gray-400 mt-1">
                이름으로 검색하고 지각 여부를 확인할 수 있습니다.
              </p>
            </div>
          </div>

          <PeriodFilterTabs />
          <SearchBox keyword={keyword} onChange={setKeyword} />

          {/* 테이블 헤더 */}
          <div className="grid grid-cols-7 bg-blue-50 text-blue-600 text-xs font-semibold px-6 py-3 tracking-wide border border-blue-100 rounded mt-2">
            <span>이름</span>
            <span>날짜</span>
            <span>출근 시간</span>
            <span>퇴근 시간</span>
            <span>쉬는 시간</span>
            <span>근무 시간</span>
            <span>지각 여부</span>
          </div>

          {/* 기록 리스트 */}
          <div className="flex flex-col divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
            {filteredData?.map((attendance, idx) => (
              <div
                key={idx}
                className="grid grid-cols-7 items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 transition"
              >
                <span className="font-medium text-gray-800">{attendance.user.user_name}</span>
                <span>{attendance.attendance_start_date}</span>
                <span>{attendance.attendance_start_time}</span>
                <span>{attendance.attendance_end_time}</span>
                <span>
                  {attendance.rest_start_time} ~ {attendance.rest_end_time}
                </span>
                <span>
                  {calculateWorkTime(
                    attendance.attendance_start_date,
                    attendance.attendance_start_time,
                    attendance.attendance_end_date,
                    attendance.attendance_end_time,
                    attendance.rest_start_time,
                    attendance.rest_end_time
                  )}
                </span>
                <span>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium text-center w-fit ${
                      attendance.attendance_start_state === "지각"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {attendance?.attendance_start_state || "정상"}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceManagement;