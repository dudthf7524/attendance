import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { VACATION_LIST_REQUEST } from '../reducers/vacation';

const VacationCalendar = ({
  vacationData = [],
  selectedDate,
  onDateSelect,
  className = ""
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    vacationListDB();
  }, []);

  const vacationListDB = async () => {
    dispatch({
      type: VACATION_LIST_REQUEST,
    });
  };
  const { vacationList } = useSelector((state) => state.vacation);

  console.log("vacationList", vacationList)

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 달력 데이터 계산
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 이번 달 첫날과 마지막날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 이번 달 첫날의 요일 (0: 일요일)
    const firstDayWeek = firstDay.getDay();

    // 달력에 표시할 날짜들
    const days = [];

    // 이전 달 마지막 날짜들 (빈 칸 채우기)
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonth.getDate() - i);
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth: false,
        isPrevMonth: true,
        isNextMonth: false
      });
    }

    // 이번 달 날짜들
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isPrevMonth: false,
        isNextMonth: false
      });
    }

    // 다음 달 첫 날짜들 (6주 맞추기)
    const remainingDays = 42 - days.length; // 6주 × 7일 = 42일
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isPrevMonth: false,
        isNextMonth: true
      });
    }

    return { days, year, month };
  }, [currentDate]);

  // 날짜별 휴가 데이터 매핑
  const getVacationInfo = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const vacations = vacationList?.filter(v => v.start_date === dateStr);
    return {
      count: vacations?.length,
      vacations,
      types: [...new Set(vacations?.map(v => v.type))]
    };
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    onDateSelect && onDateSelect(date);
  };

  // 이전/다음 달 이동
  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 오늘 날짜 체크
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // 선택된 날짜 체크
  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  // 주말 체크
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // 휴가 유형별 색상
  const getTypeColor = (type) => {
    switch (type) {
      case '연차': return 'bg-blue-500';
      case '반차': return 'bg-purple-500';
      case '병가': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  // 상태별 스타일
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'border-green-400';
      case 'pending': return 'border-yellow-400';
      case 'rejected': return 'border-red-400';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className={`vacation-calendar bg-white rounded-2xl p-6 ${className}`}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {calendarData.year}년 {calendarData.month + 1}월
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            오늘
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center py-3 text-sm font-semibold ${index === 0 || index === 6 ? 'text-red-500' : 'text-gray-600'
              }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarData.days.map((dayInfo, index) => {
          const { date, day, isCurrentMonth } = dayInfo;
          const vacationInfo = getVacationInfo(date);
          const todayCheck = isToday(date);
          const selectedCheck = isSelected(date);
          const weekendCheck = isWeekend(date);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date, isCurrentMonth)}
              className={`
                relative h-20 p-2 border-2 rounded-xl transition-all duration-300 cursor-pointer
                ${isCurrentMonth ? 'border-gray-200' : 'border-transparent'}
                ${!isCurrentMonth ? 'opacity-40' : ''}
                ${selectedCheck ? 'border-black bg-black text-white shadow-lg' : ''}
                ${todayCheck && !selectedCheck ? 'border-blue-500 bg-blue-50' : ''}
                ${vacationInfo.count > 0 && !selectedCheck ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300' : ''}
                ${vacationInfo.count >= 3 && !selectedCheck ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300' : ''}
                hover:shadow-md hover:scale-105 hover:z-10
                ${isCurrentMonth ? 'hover:border-gray-400' : ''}
              `}
            >
              {/* 날짜 숫자 */}
              <div className={`text-sm font-semibold ${selectedCheck ? 'text-white' :
                todayCheck ? 'text-blue-600' :
                  weekendCheck && isCurrentMonth ? 'text-red-500' :
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                }`}>
                {day}
              </div>

              {/* 휴가 정보 */}
              {vacationInfo.count > 0 && (
                <div className="absolute bottom-1 left-1 right-1">
                  {/* 휴가자 수 표시 */}
                  {vacationInfo.count > 1 ? (
                    <div className={`
                      w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1
                      ${selectedCheck ? 'bg-white text-black' : 'bg-blue-500 text-white'}
                    `}>
                      {vacationInfo.count}
                    </div>
                  ) : (
                    <div className={`
                      w-2 h-2 rounded-full mx-auto mb-1
                      ${selectedCheck ? 'bg-white' : 'bg-blue-500'}
                    `} />
                  )}

                  {/* 휴가 유형 인디케이터 */}
                  <div className="flex justify-center space-x-0.5">
                    {vacationInfo.types.slice(0, 3).map((type, idx) => (
                      <div
                        key={idx}
                        className={`w-1 h-1 rounded-full ${selectedCheck ? 'bg-white' : getTypeColor(type)
                          }`}
                      />
                    ))}
                  </div>

                  {/* 승인 상태 인디케이터 */}
                  {vacationInfo.vacations.some(v => v.status === 'pending') && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  )}
                </div>
              )}

              {/* 오늘 표시 */}
              {todayCheck && (
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>휴가 있는 날</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-black rounded"></div>
            <span>선택된 날</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 border-2 border-blue-200 rounded"></div>
            <span>오늘</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-100 border-2 border-red-300 rounded"></div>
            <span>3명 이상 휴가</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>승인 대기</span>
          </div>
        </div>

        {/* 휴가 유형 범례 */}
        <div className="flex flex-wrap gap-4 text-xs mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>연차</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>반차</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>병가</span>
          </div>
        </div>
      </div>

      {/* 선택된 날짜 정보 */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-800 mb-1">
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
          </h4>
          <p className="text-sm text-blue-600">
            {getVacationInfo(selectedDate).count > 0
              ? `${getVacationInfo(selectedDate).count}명이 휴가 중입니다`
              : '휴가자가 없는 날입니다'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default VacationCalendar;