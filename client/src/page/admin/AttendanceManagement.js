import React, { useEffect, useState } from "react";
import PeriodFilterTabs from "./PeriodFilterTabs";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { EyeIcon } from "@heroicons/react/24/outline";
import DateSearchFilter from "../../component/DateSearchFilter";
import { ATTENDANCE_TODAY_LIST_REQUEST } from "../../reducers/attendance";

const AttendanceManagement = () => {

  const today = dayjs();
  const yyyyMmDd = today.format('YYYY-MM-DD');


  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { attendanceDay } = useSelector((state) => state.attendance);
  const { attendanceTodayList } = useSelector((state) => state.attendance);

  console.log("attendanceTodayList", attendanceTodayList)
  const filteredData = attendanceDay?.filter((attendance) =>
    attendance?.user?.user_name?.includes(keyword)
  );
  
  useEffect(() => {
    attendanceTodayListDB();
  }, [])

  const attendanceTodayListDB = () => {
    const data = {
      today: yyyyMmDd
    }
    dispatch({
      type: ATTENDANCE_TODAY_LIST_REQUEST,
      data: data,
    })
  }

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

  const getStatusColor = (auth_code) => {
    switch (auth_code) {
      case "A1":
        return "text-green-600 bg-green-100";
      case "A2":
        return "text-yellow-600 bg-yellow-100";
      case "A3":
        return "text-red-600 bg-red-100";
      default:
        return "";
    }
  };

  const userList = [
    {
      auth: {
        auth_code: "A1",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A1",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A1",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A1",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A1",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A1",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A1",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A3",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A1",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
    {
      auth: {
        auth_code: "A2",
        auth_name: "마스터"
      },
      company_code: 1,
      user_code: 1,
      user_info: {
        user_name: "a",
        user_nickname: "boss",
        user_position: "대표",
        user_hire_date: "2025-07-28"
      }
    },
  ];

  return (
    <div className="min-w-[1000px] w-full overflow-x-auto">
      <main className="flex-1">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-4">

          <div className="mb-3">
            <div className="inline-block mb-3">
              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                👤 근태 관리 시스템
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
              근태기록
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              이름으로 검색하고 지각 여부를 확인할 수 있습니다.
            </p>
          </div>
          <DateSearchFilter />
          {/* <PeriodFilterTabs /> */}
          <SearchBox keyword={keyword} onChange={setKeyword} />
          <div className="overflow-x-auto">
            <div className="min-w-full text-sm flex flex-col border-b">
              <div className="grid grid-cols-7 border-b text-left font-medium border-t">
                <div className="px-4 py-4">이름</div>
                <div className="px-4 py-4">날짜</div>
                <div className="px-4 py-4">출근 시간</div>
                <div className="px-4 py-4">퇴근 시간</div>
                <div className="px-4 py-4">쉬는 시간</div>
                <div className="px-4 py-4">근무 시간</div>
                <div className="px-4 py-4 text-blue-700">지각여부</div>
              </div>

              {/* 테이블 바디 */}
              {userList.map((user, i) => (
                <div
                  key={i}
                  className="grid grid-cols-7 items-center hover:bg-gray-50 transition"
                >
                  <div className="px-4 py-4">
                    {user.user_info.user_name}
                  </div>
                  <div className="px-4 py-4">
                    {user.user_info.user_name}
                  </div>
                  <div className="px-4 py-4">
                    {user.user_info.user_nickname}
                  </div>
                  <div className="px-4 py-4">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {user.user_info.user_hire_date}
                    </span>
                  </div>
                  <div className="px-4 py-4">
                    {user.user_info.user_position}
                  </div>
                  <div className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(user.auth.auth_code)}`}>
                      {user.auth.auth_name}
                    </span>
                  </div>
                  <div className="px-4 py-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="상세보기"
                    >
                      <EyeIcon className="w-5 h-5 inline-block" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium text-center w-fit ${attendance.attendance_start_state === "지각"
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