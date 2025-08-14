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
    <div className="w-full min-w-[1000px] overflow-x-auto">
      <main className="flex-1">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">직원별 시간 등록</h2>
              <p className="text-sm text-gray-400 mt-1">
                직원별 출퇴근 및 휴게 시간을 설정하세요.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 border-r pr-4">
              <h3 className="text-sm font-bold mb-2">직원 목록</h3>
              {timeListOuter?.map((user, idx) => (
                <div
                  key={idx}
                  onClick={() => handleUserClick(user.user_code)}
                  className={`p-2 border-t rounded cursor-pointer ${selectedUser === user.user_code ? "bg-blue-100" : "hover:bg-gray-50"}`}
                >
                  <div className="font-semibold mt-2">{user.user_info.user_name}</div>
                  <div className="text-xs text-gray-500 mb-2">{user.user_info.user_position}</div>
                </div>
              ))}
            </div>
            <div className="col-span-3">
              {selectedUser ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold mb-4">
                      {timeListOuter.find((u) => u.user_code === selectedUser)?.user_info.user_name}님 시간 설정
                    </h3>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                      저장
                    </button>
                  </div>

                  {
                    selectedTime ?
                      (
                        <table className="w-full table-fixed border-t border-gray-300 text-sm mb-4">
                          <tbody>
                            <tr>
                              <th className="border-b border-r w-40 bg-gray-50 text-center">출근시간</th>
                              <td className="border-b px-4 py-3">
                                <div className="flex gap-2 items-center">
                                  {selectedTime.start_time.split(":")[0]}시 {selectedTime.start_time.split(":")[1]}분
                                  <ClockIcon className="w-5 h-5 text-gray-400" />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="border-b border-r w-40 bg-gray-50 text-center">퇴근시간</th>
                              <td className="border-b px-4 py-3">
                                <div className="flex gap-2 items-center">
                                  {selectedTime.end_time.split(":")[0]}시 {selectedTime.end_time.split(":")[1]}분
                                  <ClockIcon className="w-5 h-5 text-gray-400" />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="border-b border-r w-40 bg-gray-50 text-center">휴게 시작 시간</th>
                              <td className="border-b px-4 py-3">
                                <div className="flex gap-2 items-center">
                                  {selectedTime.rest_start_time.split(":")[0]}시 {selectedTime.rest_start_time.split(":")[1]}분
                                  <ClockIcon className="w-5 h-5 text-gray-400" />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="border-b border-r w-40 bg-gray-50 text-center">휴게 종료 시간</th>
                              <td className="border-b px-4 py-3">
                                <div className="flex gap-2 items-center">
                                  {selectedTime.rest_end_time.split(":")[0]}시 {selectedTime.rest_end_time.split(":")[1]}분
                                  <ClockIcon className="w-5 h-5 text-gray-400" />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )
                      :
                      (<table className="w-full table-fixed border-t border-gray-300 text-sm mb-4">
                        <tbody>
                          <tr>
                            <th className="border-b border-r w-40 bg-gray-50 text-center">출근시간</th>
                            <td className="border-b px-4 py-3">
                              <div className="flex gap-2 items-center">
                                <select
                                  name="startHour"
                                  value={formData.startHour}
                                  onChange={handleChange}
                                >
                                  <option value=""></option>
                                  {hourOptions.map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                  ))}
                                </select>
                                <span>시</span>
                                <select
                                  name="startMin"
                                  value={formData.startMin}
                                  onChange={handleChange}
                                >
                                  <option value=""></option>
                                  {minuteOptions.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                  ))}
                                </select>
                                <span>분</span>
                                <ClockIcon className="w-5 h-5 text-gray-400" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="border-b border-r w-40 bg-gray-50 text-center">퇴근시간</th>
                            <td className="border-b px-4 py-3">
                              <div className="flex gap-2 items-center">
                                <select
                                  name="endHour"
                                  value={formData.endHour}
                                  onChange={handleChange}
                                >
                                  <option value=""></option>
                                  {hourOptions.map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                  ))}
                                </select>
                                <span>시</span>
                                <select
                                  name="endMin"
                                  value={formData.endMin}
                                  onChange={handleChange}
                                >
                                  <option value=""></option>
                                  {minuteOptions.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                  ))}
                                </select>
                                <span>분</span>
                                <ClockIcon className="w-5 h-5 text-gray-400" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="border-b border-r w-40 bg-gray-50 text-center">휴게 시작 시간</th>
                            <td className="border-b px-4 py-3">
                              <div className="flex gap-2 items-center">
                                <select
                                  name="breakStartHour"
                                  value={formData.breakStartHour}
                                  onChange={handleChange}
                                >
                                  <option value=""></option>
                                  {hourOptions.map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                  ))}
                                </select>
                                <span>시</span>
                                <select
                                  name="breakStartMin"
                                  value={formData.breakStartMin}
                                  onChange={handleChange}
                                >
                                  <option value=""></option>
                                  {minuteOptions.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                  ))}
                                </select>
                                <span>분</span>
                                <ClockIcon className="w-5 h-5 text-gray-400" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="border-b border-r w-40 bg-gray-50 text-center">휴게 종료 시간</th>
                            <td className="border-b px-4 py-3">
                              <div className="flex gap-2 items-center">
                                <select
                                  name="breakEndHour"
                                  value={formData.breakEndHour}
                                  onChange={handleChange}
                                >
                                  <option value=""></option>
                                  {hourOptions.map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                  ))}
                                </select>
                                <span>시</span>
                                <select
                                  name="breakEndMin"
                                  value={formData.breakEndMin}
                                  onChange={handleChange}
                                >
                                  <option value=""></option>
                                  {minuteOptions.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                  ))}
                                </select>
                                <span>분</span>
                                <ClockIcon className="w-5 h-5 text-gray-400" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>)
                  }
                </>
              ) : (
                <div className="text-gray-500">좌측에서 직원을 선택하세요.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimeSettingPage;
