import { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import DateSearchFilter from "../../../component/DateSearchFilter";
import { ATTENDANCE_LIST_REQUEST } from "../../../reducers/attendance";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
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
      <div className="p-5 flex flex-col lg:flex-row flex-1 gap-4">
        {/* 왼쪽 영역 */}
        <div className="w-full lg:w-1/5 flex flex-col gap-4">
          {/* 근태 관리 시스템 정보 박스 */}
          {/* <div className="bg-white shadow p-5 flex flex-col flex-2">
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
          </div> */}

          {/* 날짜 검색 박스 */}
          <div className="bg-white shadow p-5 flex-1">
            <DateSearchFilter yyyyMmDd={yyyyMmDd} onSearch={handleDateSearch} />
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-full lg:w-4/5 flex flex-col min-w-0 space-y-4">
          {/* 이름 검색 박스 */}
          <div className="bg-white shadow p-5">
            <SearchBox keyword={keyword} onChange={setKeyword} />
          </div>

          {/* 근태 기록 목록 박스 */}
          <div className="bg-white shadow p-5 flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto">
              <div className="overflow-x-auto">
                <div className="min-w-[800px] text-sm flex flex-col border-b ">
                  <div className="grid grid-cols-10 border-b text-left font-medium border-t">
                    <div className="px-4 py-4">이름</div>
                    <div className="px-4 py-4">날짜</div>
                    <div className="px-4 py-4">출근 시간</div>
                    <div className="px-4 py-4">퇴근 시간</div>
                    <div className="px-4 py-4">쉬는 시간</div>
                    <div className="px-4 py-4">근무 시간</div>
                    <div className="px-4 py-4">출근 상태</div>
                    <div className="px-4 py-4">퇴근 상태</div>
                    <div className="px-4 py-4 text-blue-600">수정</div>
                    <div className="px-4 py-4 text-red-600">삭제</div>
                  </div>

                  {/* 테이블 바디 */}
                  {filteredData?.map((attendance, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-10 items-center hover:bg-gray-50 transition"
                    >
                      <div className="px-4 py-4">
                        {attendance.user.user_info.user_name}
                      </div>
                      <div className="px-4 py-4">
                        {attendance.attendance_start_date}
                      </div>
                      <div className="px-4 py-4">
                        {attendance.attendance_start_time}
                      </div>
                      <div className="px-4 py-4">
                        {attendance.attendance_end_time}
                      </div>
                      <div className="px-4 py-4">
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {attendance.rest_start_time} ~ {attendance.rest_end_time}
                        </span>
                      </div>

                      <div className="px-4 py-4">
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
                      </div>
                      <div className="px-4 py-4">
                        {attendance.attendance_start_state}
                      </div>
                      <div className="px-4 py-4">
                        {attendance.attendance_end_state}
                      </div>

                      <div className="px-4 py-4 text-blue-600">
                        <button
                          onClick={() => handleEdit(attendance)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <PencilSquareIcon className="w-5 h-5 inline-block" />
                        </button>
                      </div>
                      <div className="px-4 py-4 text-red-600">
                        <button
                        // onClick={() => EmployDetail(user.user_code, user.user_info.user_name)}
                        // className="text-blue-500 hover:text-blue-700"
                        >
                          <TrashIcon className="w-5 h-5 inline-block" />
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