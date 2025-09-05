import { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import DateSearchFilter from "../../../component/DateSearchFilter";
import { ATTENDANCE_LIST_REQUEST } from "../../../reducers/attendance";
import { PencilSquareIcon, TrashIcon, ClockIcon, UserGroupIcon, CalendarDaysIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Edit from "./Edit";

const AttendanceManagement = () => {
  const dispatch = useDispatch();
  const today = dayjs();
  const yyyyMmDd = today.format('YYYY-MM-DD');
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const { attendanceList } = useSelector((state) => state.attendance);

  const filteredData = attendanceList?.filter((attendance) =>
    attendance?.user?.user_info?.user_name?.includes(keyword)
  );

  useEffect(() => {
    attendanceListDB();
  }, [])

  const attendanceListDB = () => {
    const data = {
      startDate: yyyyMmDd,
      endDate: yyyyMmDd
    }
    dispatch({
      type: ATTENDANCE_LIST_REQUEST,
      data: data,
    })
  }

  const handleDateSearch = ({ startDate, endDate }) => {
    dispatch({
      type: ATTENDANCE_LIST_REQUEST,
      data: {
        startDate: startDate || yyyyMmDd,
        endDate: endDate || yyyyMmDd,
      },
    });
  };


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

  function handleEdit(attendance) {
    setSelectedAttendance(attendance);
    setIsModalOpen(true);
  }

  function handleSave(updatedData) {
    console.log("근태 수정 데이터:", updatedData);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedAttendance(null);
  }
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">
      <div className="p-5 flex flex-col lg:flex-row flex-1 gap-6">
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <div className="bg-white p-5 border border-gray-200 h-full flex flex-col">
            <div className="flex-1">
              <DateSearchFilter yyyyMmDd={yyyyMmDd} onSearch={handleDateSearch} />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col min-w-0 space-y-6">
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
              직원 검색
            </h3>
            <SearchBox keyword={keyword} onChange={setKeyword} />
          </div>
          <div className="bg-white p-6 flex flex-col flex-1 min-h-0 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
              근태 기록 목록
            </h3>
            <div className="flex-1 overflow-y-auto">
              <div className="overflow-x-auto">
                <div className="min-w-[1000px] text-sm flex flex-col border border-gray-200">
                  <div className="grid grid-cols-10 bg-gradient-to-r from-gray-50 to-blue-50 text-left font-bold text-gray-800 border-b-2 border-blue-200">
                    <div className="px-4 py-4 flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-2 text-blue-600" />
                      이름
                    </div>
                    <div className="px-4 py-4 flex items-center">
                      <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-600" />
                      날짜
                    </div>
                    <div className="px-4 py-4">출근 시간</div>
                    <div className="px-4 py-4">퇴근 시간</div>
                    <div className="px-4 py-4">쉬는 시간</div>
                    <div className="px-4 py-4">근무 시간</div>
                    <div className="px-4 py-4">출근 상태</div>
                    <div className="px-4 py-4">퇴근 상태</div>
                    <div className="px-4 py-4 text-blue-600">수정</div>
                    <div className="px-4 py-4 text-red-600">삭제</div>
                  </div>
                  {filteredData?.map((attendance, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-10 items-center border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                    >
                      <div className="px-4 py-4 font-medium text-gray-800">
                        {attendance.user.user_info.user_name}
                      </div>
                      <div className="px-4 py-4 text-gray-700">
                        {attendance.attendance_start_date}
                      </div>
                      <div className="px-4 py-4 text-gray-700">
                        {attendance.attendance_start_time}
                      </div>
                      <div className="px-4 py-4 text-gray-700">
                        {attendance.attendance_end_time || '-'}
                      </div>
                      <div className="px-4 py-4">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 font-medium">
                          {attendance.rest_start_time} ~ {attendance.rest_end_time}
                        </span>
                      </div>
                      <div className="px-4 py-4">
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 font-medium">
                          {
                            calculateWorkTime(
                              attendance.attendance_start_date,
                              attendance.attendance_start_time,
                              attendance.attendance_end_date,
                              attendance.attendance_end_time,
                              attendance.rest_start_time,
                              attendance.rest_end_time
                            )
                          }
                        </span>
                      </div>
                      <div className="px-4 py-4">
                        <span className={`text-xs px-3 py-1 font-medium ${attendance.attendance_start_state === '정상'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {attendance.attendance_start_state}
                        </span>
                      </div>
                      <div className="px-4 py-4">
                        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 font-medium">
                          {attendance.attendance_end_state || '근무중'}
                        </span>
                      </div>

                      <div className="px-4 py-4">
                        <button
                          onClick={() => handleEdit(attendance)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 transition-all duration-200 transform hover:scale-110"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="px-4 py-4">
                        <button
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 transition-all duration-200 transform hover:scale-110"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isModalOpen &&
        (
          <Edit
            attendance={selectedAttendance}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )
      }
    </div>
  );
};

export default AttendanceManagement;