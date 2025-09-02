import React, { useEffect, useState } from 'react';
import {
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { VACATION_APPROVAL_REQUEST, VACATION_LIST_REQUEST, VACATION_REJECT_REQUEST } from '../../reducers/vacation';

const VacationApproval = () => {
  const dispatch = useDispatch();
  const { vacationList } = useSelector((state) => state.vacation);
  console.log(vacationList)

  useEffect(() => {
    vacationListDB();
  }, []);

  const vacationListDB = async () => {
    dispatch({
      type: VACATION_LIST_REQUEST,
    });
  };
  const [vacations, setVacations] = useState([
    {
      vacation_id: 1,
      user:{
        user_name : '김철수',
      },
      name: '김철수',
      reason: '가족 여행',
      period: '2025-07-15 ~ 2025-07-16',
      vacation_state: null,
    },
    // {
    //   vacation_id: 2,
    //   name: '박지민',
    //   reason: '병원 방문',
    //   period: '2025-07-18 ~ 2025-07-18',
    //   vacation_state: true,
    // },
    // {
    //   vacation_id: 3,
    //   name: '이영희',
    //   reason: '개인 사정',
    //   period: '2025-07-20 ~ 2025-07-21',
    //   vacation_state: false,
    // },
  ]);

  function approval(vacation_id) {
    if (!window.confirm("승인 하시겠습니까?")) {
      return;
    }

    console.log(vacation_id)

    const data = {
      vacation_id: vacation_id
    }

    dispatch({
      type: VACATION_APPROVAL_REQUEST,
      data: data
    });
  }

  function reject(vacation_id) {
    if (!window.confirm("거절 하시겠습니까?")) {
      return;
    }

    console.log(vacation_id)

    const data = {
      vacation_id: vacation_id
    }

    dispatch({
      type: VACATION_REJECT_REQUEST,
      data: data
    });
  }

  const vacationState = (vacation_state) => {
    if (vacation_state === 1) return <span className="text-green-600 font-semibold">승인</span>;
    if (vacation_state === -1) return <span className="text-red-500 font-semibold">거절</span>;
    return <span className="text-gray-400 font-semibold">대기</span>;
  };

  function vacationStateApprovalButton(vacation_state, vacation_id) {
    if (vacation_state === 1 || vacation_state === -1) {
      return <span className="text-gray-400 font-semibold"> - </span>;
    }
    return <button
      onClick={() => approval(vacation_id)}
      className="bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-700 p-2 rounded-lg transition-colors duration-200 hover:shadow-md"
      title="승인"
    >
      <CheckIcon className="h-4 w-4" />
    </button>
  }

  function vacationStateRejectButton(vacation_state, vacation_id) {
    if (vacation_state === 1 || vacation_state === -1) {
      return <span className="text-gray-400 font-semibold"> - </span>;
    }
    return <button
    onClick={() => reject(vacation_id)}
    className="bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 p-2 rounded-lg transition-colors duration-200 hover:shadow-md"
    title="거절"
  >
    <XMarkIcon className="h-4 w-4" />
  </button>
  }

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">
      <div className="p-5 flex flex-1 gap-4">
        {/* 휴가 관리 시스템 정보 박스 */}
        <div className="bg-white shadow p-5 w-1/5 flex flex-col">
          <div className="inline-block mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              🏖️ 휴가 관리 시스템
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
            휴가승인
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            직원들의 휴가 신청을 승인하거나 거절할 수 있습니다.
          </p>
        </div>
        
        {/* 휴가 승인 목록 박스 */}
        <div className="bg-white shadow p-5 w-4/5 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto">
            <div className="overflow-x-auto">
              <div className="min-w-full text-sm flex flex-col border-b">
                <div className="grid grid-cols-6 border-b text-left font-medium border-t bg-gray-50">
                  <div className="px-4 py-4">이름</div>
                  <div className="px-4 py-4">기간</div>
                  <div className="px-4 py-4">사유</div>
                  <div className="px-4 py-4 text-center">상태</div>
                  <div className="px-4 py-4 text-center text-green-600">승인</div>
                  <div className="px-4 py-4 text-center text-red-600">거절</div>
                </div>

                {/* 테이블 바디 */}
                {vacations?.map((vacation) => (
                  <div
                    key={vacation.vacation_id}
                    className="grid grid-cols-6 items-center hover:bg-gray-50 transition"
                  >
                    <div className="px-4 py-4">
                      {vacation.user.user_name}
                    </div>
                    <div className="px-4 py-4">
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                        {vacation.start_date} ~ {vacation.end_date}
                      </span>
                    </div>
                    <div className="px-4 py-4">
                      {vacation.reason}
                    </div>
                    <div className="px-4 py-4 text-center">
                      {vacationState(vacation.vacation_state)}
                    </div>
                    <div className="px-4 py-4 text-center">
                      {vacationStateApprovalButton(vacation.vacation_state, vacation.vacation_id)}
                    </div>
                    <div className="px-4 py-4 text-center">
                      {vacationStateRejectButton(vacation.vacation_state, vacation.vacation_id)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationApproval;
