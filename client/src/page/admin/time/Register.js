import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ClockIcon,
  UserIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { TIME_REGISTER_REQUEST } from "../../../reducers/time";

const TimeRegister = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedUser = location.state;
  console.log(selectedUser)
  const [timeData, setTimeData] = useState({
    start_time: "09:00",
    end_time: "18:00",
    rest_start_time: "12:00",
    rest_end_time: "13:00",
    user_code: selectedUser?.user_code
  });

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeData(prev => ({ ...prev, [name]: value }));
  };


  async function handleSubmit(e) {
    e.preventDefault();
    const data = timeData;

    dispatch({
      type: TIME_REGISTER_REQUEST,
      data: data
    });

    navigate('/admin/employee/list');

  }


  return (
    <div className="w-full h-full bg-gray-100">
      <div className="p-5 flex flex-1 flex-col gap-4 h-full">
        <form id="time-register-form" onSubmit={handleSubmit} className="flex gap-4 flex-1 h-full">
          <div className="bg-white p-6 w-1/3 h-full flex flex-col border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <UserIcon className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">직원 정보</h3>
              </div>
              <p className="text-xs text-gray-500">시간을 등록할 직원 정보</p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="py-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  직원명
                </label>
                <input
                  type="text"
                  value={selectedUser?.user_info.user_name || ""}
                  readOnly
                  className="w-full border-2 border-gray-300 px-3 py-2.5 text-sm bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 w-1/3 h-full flex flex-col border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <ClockIcon className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">근무 시간</h3>
              </div>
              <p className="text-xs text-gray-500">출근 및 퇴근 시간 설정</p>
            </div>

            <div className="space-y-6 flex-1">
              <div className=" py-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  출근 시간
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={timeData.start_time}
                  onChange={handleTimeChange}
                  className="w-full border-2 border-gray-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div className=" py-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  퇴근 시간
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={timeData.end_time}
                  onChange={handleTimeChange}
                  className="w-full border-2 border-gray-300  px-3 py-2.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 w-1/3 h-full flex flex-col border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <ClockIcon className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">휴계 시간</h3>
              </div>
              <p className="text-xs text-gray-500">점심시간 및 휴계시간 설정</p>
            </div>

            <div className="space-y-6 flex-1">
              <div className=" py-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  휴계 시작
                </label>
                <input
                  type="time"
                  name="rest_start_time"
                  value={timeData.rest_start_time}
                  onChange={handleTimeChange}
                  className="w-full border-2 border-gray-300 px-3 py-2.5 text-sm"
                />
              </div>

              <div className=" py-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  휴계 종료
                </label>
                <input
                  type="time"
                  name="rest_end_time"
                  value={timeData.rest_end_time}
                  onChange={handleTimeChange}
                  className="w-full border-2 border-gray-300 focus:border-purple-500 px-3 py-2.5 text-sm"
                />
              </div>
            </div>

            <button
              form="time-register-form"
              type="submit"
              className="mt-6 w-full border border-gray-300 font-bold py-4 px-6 flex items-center justify-center"
            >
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              시간 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeRegister;