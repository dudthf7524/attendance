import React, { useEffect, useMemo, useState } from "react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { TIME_LIST_OUTER_REQUEST } from "../../reducers/time";

const TimeSettingPage = () => {
  const userList = [
    {
      user_code: 1,
      user_info: {
        user_name: "김철수",
        user_position: "개발자",
      },
    },
    {
      user_code: 2,
      user_info: {
        user_name: "이영희",
        user_position: "디자이너",
      },
    },
    {
      user_code: 3,
      user_info: {
        user_name: "박민수",
        user_position: "기획자",
      },
    },
  ];
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

  console.log("timeListOuter", timeListOuter)

  useEffect(() => {
    timeListOuterDB();
  }, []);
  const timeListOuterDB = async () => {
    dispatch({
      type: TIME_LIST_OUTER_REQUEST,
    });
  };
  const [selectedUser, setSelectedUser] = useState(null);

  const selectedTime = useMemo(() => {
    return timeListOuter?.find((u) => u.user_code === selectedUser)?.time;
  }, [timeListOuter, selectedUser]);

  const handleUserClick = (user_code) => {
    setSelectedUser(user_code);
  };



  const handleSave = () => {

  };



  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minuteOptions = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));

  const formatTime = (time) => {
    if (!time?.hour || !time?.minute) return '-';
    return `${time.hour}:${time.minute}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none"></div>
      
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="mb-6">
          <div className="inline-block mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              ⏱️ 근무시간 설정 시스템
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            시간 등록
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            각 직원의 출근, 퇴근, 휴게시간을 개별적으로 설정하고 관리할 수 있습니다
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-1">직원별 근무시간 설정</h2>
            <p className="text-gray-600">
              좌측에서 직원을 선택하고 개별 근무시간을 설정해주세요
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 직원 목록 섹션 */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">직원 목록</h3>
                  <div className="space-y-2">
                    {timeListOuter?.map((user, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleUserClick(user.user_code)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          selectedUser === user.user_code 
                            ? "bg-black text-white border-black shadow-lg" 
                            : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                        }`}
                      >
                        <div className={`font-semibold text-sm ${selectedUser === user.user_code ? "text-white" : "text-gray-900"}`}>
                          {user.user_info.user_name}
                        </div>
                        <div className={`text-xs mt-1 ${selectedUser === user.user_code ? "text-gray-300" : "text-gray-500"}`}>
                          {user.user_info.user_position}
                        </div>
                        {selectedUser === user.user_code && (
                          <CheckCircleIcon className="w-4 h-4 text-white mt-1" />
                        )}
                      </div>
                    ))}
                    
                    {(!timeListOuter || timeListOuter.length === 0) && (
                      <div className="text-center py-6 text-gray-500">
                        <ClockIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-xs">등록된 직원이 없습니다</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 시간 설정 섹션 */}
              <div className="lg:col-span-3">
                {selectedUser ? (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {timeListOuter.find((u) => u.user_code === selectedUser)?.user_info.user_name}님 근무시간
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">출근, 퇴근, 휴게시간을 설정해주세요</p>
                      </div>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        저장하기
                      </button>
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
                ) : (
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <ClockIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">직원을 선택해주세요</h3>
                    <p className="text-sm text-gray-600">
                      좌측 직원 목록에서 시간을 설정할 직원을 선택하세요
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSettingPage;
