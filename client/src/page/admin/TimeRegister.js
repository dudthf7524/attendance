import React, { useEffect, useState } from "react";
import { TIME_LIST_OUTER_REQUEST, TIME_REGISTER_REQUEST } from "../../reducers/time";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const members = [
  { id: 1, name: "홍길동" },
  { id: 2, name: "김민지" },
  { id: 3, name: "이철수" },
];

const generateOptions = (range) =>
  Array.from({ length: range }, (_, i) => String(i).padStart(2, "0"));

const TimeManagementPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
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

  const timeRegister = () => {
    console.log("서버로 넘어갈 데이터들 : ", formData)
    console.log(selected.user_code);
    formData.user_code = selected.user_code;
    const data = formData;

    dispatch({
      type: TIME_REGISTER_REQUEST,
      data: data
    });
  }

  const { timeListOuter } = useSelector((state) => state.time);

  useEffect(() => {
    timeListOuterDB();
  }, []);
  const timeListOuterDB = async () => {
    dispatch({
      type: TIME_LIST_OUTER_REQUEST,
    });
  };




  return (
    <div className="h-[90vh] w-full px-4 py-8">
      {/* 타이틀 */}
      <div className="mx-auto bg-white border border-blue-200 shadow-sm px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-blue-600">시간 등록</h1>
        <p className="text-sm text-gray-500 mt-1">
          직원의 출퇴근 및 휴게 시작·종료 시간을 설정할 수 있습니다.
        </p>
      </div>

      {/* 본문 */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100%-100px)]">
        {/* 왼쪽 멤버 리스트 */}
        <div className="w-full lg:w-1/3 bg-white border border-blue-300 shadow-sm flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {timeListOuter?.map((time) => (
              <button
                key={time.user_code}
                onClick={() => setSelected(time)}
                className={`w-full px-5 py-4 border-b border-blue-100 hover:bg-blue-50 transition flex items-center justify-between ${selected?.user_code === time.user_code
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700"
                  }`}
              >
                {/* 왼쪽 이름 + 직책 */}
                <div className="flex flex-col items-start">
                  <span>{time.user_name}</span>
                  <span className="text-xs text-gray-400">{time.user_position}</span>
                </div>

                {/* 오른쪽 체크 아이콘 */}
                {time.time && (
                  <CheckCircleIcon
                    className="w-10 h-10 text-blue-500"
                    title="시간 설정 완료됨"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽 시간 설정 */}
        <div className="w-full lg:w-2/3 bg-white border border-blue-300 p-6 flex flex-col">
          {
            selected ?
              (
                <>
                  <div className="flex justify-between items-center border-b border-blue-100 pb-2 mb-4">
                    <h2 className="text-lg font-bold text-blue-600">
                      {selected.user_name} 님의 시간 설정
                    </h2>
                    {/* <button
              onClick={() => console.log("저장됨", times)} // 실제 저장 로직으로 교체 가능
              className="px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              저장
            </button> */}
                  </div>

                  {
                    selected?.time ?
                      (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-3xl">
                          시간 설정이 완료되었습니다.
                        </div>
                      )
                      :
                      (
                        <div className="flex-1 flex flex-col gap-6 h-full">
                          {/* 출근 시간 */}
                          <div className="flex-1 flex flex-col justify-center">
                            <p className="text-sm text-blue-500 font-medium mb-4">출근 시간</p>
                            <div className="flex gap-2">
                              <select
                                name="startHour"
                                value={formData.startHour}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                {generateOptions(24).map((hour) => (
                                  <option key={hour} value={hour}>
                                    {hour}
                                  </option>
                                ))}
                              </select>
                              <span className="self-center">:</span>
                              <select
                                name="startMin"
                                value={formData.startMin}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                {generateOptions(60).map((min) => (
                                  <option key={min} value={min}>
                                    {min}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* 퇴근 시간 */}
                          <div className="flex-1 flex flex-col justify-center">
                            <p className="text-sm text-blue-500 font-medium mb-4">퇴근 시간</p>
                            <div className="flex gap-2">
                              <select
                                name="endHour"
                                value={formData.endHour}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                {generateOptions(24).map((hour) => (
                                  <option key={hour} value={hour}>
                                    {hour}
                                  </option>
                                ))}
                              </select>
                              <span className="self-center">:</span>
                              <select
                                name="endMin"
                                value={formData.endMin}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                {generateOptions(60).map((min) => (
                                  <option key={min} value={min}>
                                    {min}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* 휴게 시작 시간 */}
                          <div className="flex-1 flex flex-col justify-center">
                            <p className="text-sm text-blue-500 font-medium mb-4">휴게 시작 시간</p>
                            <div className="flex gap-2">
                              <select
                                name="breakStartHour"
                                value={formData.breakStartHour}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                {generateOptions(24).map((hour) => (
                                  <option key={hour} value={hour}>
                                    {hour}
                                  </option>
                                ))}
                              </select>
                              <span className="self-center">:</span>
                              <select
                                name="breakStartMin"
                                value={formData.breakStartMin}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                {generateOptions(60).map((min) => (
                                  <option key={min} value={min}>
                                    {min}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* 휴게 종료 시간 */}
                          <div className="flex-1 flex flex-col justify-center">
                            <p className="text-sm text-blue-500 font-medium mb-4">휴게 종료 시간</p>
                            <div className="flex gap-2">
                              <select
                                name="breakEndHour"
                                value={formData.breakEndHour}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                {generateOptions(24).map((hour) => (
                                  <option key={hour} value={hour}>
                                    {hour}
                                  </option>
                                ))}
                              </select>
                              <span className="self-center">:</span>
                              <select
                                name="breakEndMin"
                                value={formData.breakEndMin}
                                onChange={handleChange}
                                className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                {generateOptions(60).map((min) => (
                                  <option key={min} value={min}>
                                    {min}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="w-full mt-10 text-right mx-auto">
                            <button
                              onClick={timeRegister}
                              type="button"
                              className="w-full bg-white border-2 border-blue-400 text-blue-400 font-semibold 
                            hover:bg-blue-50 active:scale-95
                            active:ring-2 active:ring-blue-400 active:ring-offset-2
                            transition duration-150 px-8 py-2 rounded-md"
                            >
                              등록하기
                            </button>
                          </div>
                        </div>
                      )
                  }


                </>
              )
              :
              (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-3xl">
                  직원을 선택해주세요.
                </div>
              )
          }

        </div>
      </div>
    </div>
  );
};

export default TimeManagementPage;
