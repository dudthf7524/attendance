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
      name: '김철수',
      reason: '가족 여행',
      period: '2025-07-15 ~ 2025-07-16',
      vacation_state: null,
    },
    {
      vacation_id: 2,
      name: '박지민',
      reason: '병원 방문',
      period: '2025-07-18 ~ 2025-07-18',
      vacation_state: true,
    },
    {
      vacation_id: 3,
      name: '이영희',
      reason: '개인 사정',
      period: '2025-07-20 ~ 2025-07-21',
      vacation_state: false,
    },
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
      className="text-green-500 hover:text-green-600"
    >
      <CheckIcon className="h-5 w-5" />
    </button>
  }

  function vacationStateRejectButton(vacation_state, vacation_id) {
    if (vacation_state === 1 || vacation_state === -1) {
      return <span className="text-gray-400 font-semibold"> - </span>;
    }
    return <button
    onClick={() => reject(vacation_id)}
    className="text-red-500 hover:text-red-600"
    title="거절"
  >
    <XMarkIcon className="h-5 w-5" />
  </button>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">휴가 승인 요청 목록</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="px-4 py-2 text-left">이름</th>
              <th className="px-4 py-2 text-left">기간</th>
              <th className="px-4 py-2 text-left">사유</th>
              <th className="px-4 py-2 text-center">상태</th>
              <th className="px-4 py-2 text-center">승인</th>
              <th className="px-4 py-2 text-center">거절</th>

            </tr>
          </thead>
          <tbody>
            {vacationList?.map((vacation) => (
              <tr key={vacation.vacation_id} className="border-t text-sm text-gray-700">
                <td className="px-4 py-2">{vacation.user.user_name}</td>
                <td className="px-4 py-2">{vacation.start_date} ~ {vacation.end_date}</td>
                <td className="px-4 py-2">{vacation.reason}</td>
                <td className="px-4 py-2 text-center">{vacationState(vacation.vacation_state)}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  {vacationStateApprovalButton(vacation.vacation_state, vacation.vacation_id)}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  {vacationStateRejectButton(vacation.vacation_state, vacation.vacation_id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VacationApproval;
