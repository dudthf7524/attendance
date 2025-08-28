import React, { useEffect, useMemo, useState } from "react";
import { CheckCircleIcon, ClockIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { TIME_LIST_OUTER_REQUEST } from "../../../reducers/time";
import { useLocation, useNavigate } from "react-router-dom";

const TimeSettingPage = () => {
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minuteOptions = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location)
  // state로 전달받은 직원 정보
  const { user_code: selectedUserCode, user_name: selectedUserName } = location.state || {};

  const [formData, setFormData] = useState({
    startHour: "00",
    startMin: "00",
    endHour: "00",
    endMin: "00",
    breakStartHour: "00",
    breakStartMin: "00",
    breakEndHour: "00",
    breakEndMin: "00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const dispatch = useDispatch();

  const { timeListOuter } = useSelector((state) => state.time);

  useEffect(() => {
    timeListOuterDB();
  }, []);
  const timeListOuterDB = async () => {
    dispatch({
      type: TIME_LIST_OUTER_REQUEST,
    });
  };

  const [selectedUser, setSelectedUser] = useState(selectedUserCode || null);

  const selectedTime = useMemo(() => {
    return timeListOuter?.find((u) => u.user_code === selectedUser)?.time;
  }, [timeListOuter, selectedUser]);

  const handleSave = () => {

  };
  const handleUpdate = () => {

  };
  
  return (
    <div className="w-full min-w-[700px] overflow-x-auto">

      <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-4">
        <div className="mb-3">
          <div className="inline-block mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              ⏱️ 근무시간 설정 시스템
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
                시간 설정
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                각 직원의 출근, 퇴근, 휴게시간을 개별적으로 설정하고 관리할 수 있습니다
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/employee/list')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>직원 목록으로</span>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedTime ? '근무시간 정보' : '근무시간 등록'}</h2>
            <p className="text-gray-600">

              {selectedTime ? '출근, 퇴근, 휴게시간을 수정시 수정하기 버튼을 눌러주세요' : '출근, 퇴근, 휴게시간을 설정해주세요'}
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* 시간 설정 섹션 */}
              <div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {selectedUserName ? `${selectedUserName}님 ` : ''}근무시간
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">출근, 퇴근, 휴게시간을 설정해주세요</p>
                    </div>
                    {
                      selectedTime ?
                        (
                          <button
                            onClick={handleUpdate}
                            className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                            수정하기
                          </button>
                        ) : (
                          <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          >
                            저장하기
                          </button>
                        )
                    }

                  </div>

                  {selectedTime ? (
                    /* 이미 설정된 시간 표시 */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-2">
                          <ClockIcon className="w-5 h-5 text-green-600 mr-2" />
                          <h4 className="text-base font-semibold text-gray-900">출근시간</h4>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {selectedTime.start_time.split(":")[0]}:{selectedTime.start_time.split(":")[1]}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">설정완료</p>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-2">
                          <ClockIcon className="w-5 h-5 text-red-600 mr-2" />
                          <h4 className="text-base font-semibold text-gray-900">퇴근시간</h4>
                        </div>
                        <div className="text-2xl font-bold text-red-600">
                          {selectedTime.end_time.split(":")[0]}:{selectedTime.end_time.split(":")[1]}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">설정완료</p>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-2">
                          <ClockIcon className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="text-base font-semibold text-gray-900">휴게 시작</h4>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedTime.rest_start_time.split(":")[0]}:{selectedTime.rest_start_time.split(":")[1]}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">설정완료</p>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-2">
                          <ClockIcon className="w-5 h-5 text-purple-600 mr-2" />
                          <h4 className="text-base font-semibold text-gray-900">휴게 종료</h4>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                          {selectedTime.rest_end_time.split(":")[0]}:{selectedTime.rest_end_time.split(":")[1]}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">설정완료</p>
                      </div>
                    </div>
                  ) :
                    /* 시간 설정 폼 */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 출근시간 */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-3">
                          <ClockIcon className="w-5 h-5 text-green-600 mr-2" />
                          <h4 className="text-base font-semibold text-gray-900">출근시간</h4>
                        </div>
                        <div className="flex gap-2 items-center">
                          <select
                            name="startHour"
                            value={formData.startHour}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          >
                            <option value="">시</option>
                            {hourOptions.map((h) => (
                              <option key={h} value={h}>{h}시</option>
                            ))}
                          </select>
                          <span className="text-gray-500 font-medium">:</span>
                          <select
                            name="startMin"
                            value={formData.startMin}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          >
                            <option value="">분</option>
                            {minuteOptions.map((m) => (
                              <option key={m} value={m}>{m}분</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* 퇴근시간 */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-3">
                          <ClockIcon className="w-5 h-5 text-red-600 mr-2" />
                          <h4 className="text-base font-semibold text-gray-900">퇴근시간</h4>
                        </div>
                        <div className="flex gap-2 items-center">
                          <select
                            name="endHour"
                            value={formData.endHour}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                          >
                            <option value="">시</option>
                            {hourOptions.map((h) => (
                              <option key={h} value={h}>{h}시</option>
                            ))}
                          </select>
                          <span className="text-gray-500 font-medium">:</span>
                          <select
                            name="endMin"
                            value={formData.endMin}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                          >
                            <option value="">분</option>
                            {minuteOptions.map((m) => (
                              <option key={m} value={m}>{m}분</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* 휴게 시작 */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-3">
                          <ClockIcon className="w-5 h-5 text-blue-600 mr-2" />
                          <h4 className="text-base font-semibold text-gray-900">휴게 시작</h4>
                        </div>
                        <div className="flex gap-2 items-center">
                          <select
                            name="breakStartHour"
                            value={formData.breakStartHour}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          >
                            <option value="">시</option>
                            {hourOptions.map((h) => (
                              <option key={h} value={h}>{h}시</option>
                            ))}
                          </select>
                          <span className="text-gray-500 font-medium">:</span>
                          <select
                            name="breakStartMin"
                            value={formData.breakStartMin}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          >
                            <option value="">분</option>
                            {minuteOptions.map((m) => (
                              <option key={m} value={m}>{m}분</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* 휴게 종료 */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-3">
                          <ClockIcon className="w-5 h-5 text-purple-600 mr-2" />
                          <h4 className="text-base font-semibold text-gray-900">휴게 종료</h4>
                        </div>
                        <div className="flex gap-2 items-center">
                          <select
                            name="breakEndHour"
                            value={formData.breakEndHour}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          >
                            <option value="">시</option>
                            {hourOptions.map((h) => (
                              <option key={h} value={h}>{h}시</option>
                            ))}
                          </select>
                          <span className="text-gray-500 font-medium">:</span>
                          <select
                            name="breakEndMin"
                            value={formData.breakEndMin}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          >
                            <option value="">분</option>
                            {minuteOptions.map((m) => (
                              <option key={m} value={m}>{m}분</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSettingPage;
