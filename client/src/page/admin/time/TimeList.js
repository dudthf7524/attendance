import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { TIME_LIST_INNER_REQUEST } from "../../../reducers/time";
import TimeEditModal from "../../modal/TimeEditModal";

const TimeList = () => {
  const dispatch = useDispatch();
  const { timeListInner } = useSelector((state) => state.time);

  console.log("timeListInner : ", timeListInner)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    timeListInnerDB();
  }, []);

  const timeListInnerDB = async () => {
    dispatch({
      type: TIME_LIST_INNER_REQUEST,
    });
  };

  const handleEdit = (time) => {
    setSelectedTime({
      ...time.time,
      user_name: time.user_name,
    });
    setIsModalOpen(true);
  };

  const handleSave = (updatedData) => {
    console.log("수정된 데이터:", updatedData);
    // 수정 요청 디스패치 추가 가능
    setIsModalOpen(false);
  };

  return (
    <div className="h-[90vh] w-full px-4 py-8">
      {/* 상단 헤더 */}
      <div className="bg-white border border-blue-200 shadow-sm px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-blue-600">시간 목록</h1>
        <p className="text-sm text-gray-500 mt-1">
          직원별로 등록된 출퇴근 및 휴게 시간 정보를 확인할 수 있습니다.
        </p>
      </div>

      {/* 시간 기록 카드 */}
      <div className="bg-white border border-blue-300 overflow-hidden shadow-sm w-full h-[calc(100%-100px)] flex flex-col">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-7 bg-blue-50 text-blue-600 text-xs font-semibold px-6 py-3 tracking-wide border-b border-blue-100">
          <span>직원명</span>
          <span>출근시간</span>
          <span>퇴근시간</span>
          <span>휴게 시작 시간</span>
          <span>휴게 종료 시간</span>
          <span className="text-center text-purple-600">수정</span>
        </div>

        {/* 목록 */}
        <div className="flex-1 overflow-y-auto">
          {timeListInner?.map((time, i) => (
            <div
              key={i}
              className="grid grid-cols-7 items-center px-6 py-4 text-sm text-gray-700 border-t border-blue-100 hover:bg-blue-50 transition"
            >
              <span className="text-gray-800 font-medium">{time.user_info.user_name}</span>
              <span>{time.time.start_time}</span>
              <span>{time.time.end_time}</span>
              <span>{time.time.rest_start_time}</span>
              <span>{time.time.rest_end_time}</span>
              <span className="text-center">
                <button
                  onClick={() => handleEdit(time)}
                  className="text-purple-600 hover:text-purple-800"
                  title="수정하기"
                >
                  <PencilSquareIcon className="w-5 h-5 inline-block" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 수정 모달 */}
      {isModalOpen && (
        <TimeEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          timeData={selectedTime}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TimeList;
