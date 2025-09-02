import React, { useState } from 'react';
import VacationCalendar from '../../component/VacationCalendar';
import { format } from 'date-fns';
import {
    PlusIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const vacationList = [
    {
        name: '김철수',
        reason: '가족 여행',
        period: '2025-07-15 ~ 2025-07-16',
        date: '2025-07-15',
        status: 'approved',
        department: '개발팀',
        type: '연차'
    },
    {
        name: '박지민',
        reason: '휴식',
        period: '2025-07-22 ~ 2025-07-22',
        date: '2025-07-22',
        status: 'pending',
        department: '디자인팀',
        type: '반차'
    },
    {
        name: '이준호',
        reason: '병가',
        period: '2025-07-20 ~ 2025-07-21',
        date: '2025-07-20',
        status: 'approved',
        department: '마케팅팀',
        type: '병가'
    },
];

export default function Vacation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
    const vacationOfDay = vacationList.filter((v) => v.date === formattedDate);

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <CheckCircleIcon className="w-4 h-4" />;
            case 'pending':
                return <ClockIcon className="w-4 h-4" />;
            case 'rejected':
                return <XCircleIcon className="w-4 h-4" />;
            default:
                return <ClockIcon className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case '연차':
                return 'bg-blue-100 text-blue-800';
            case '반차':
                return 'bg-purple-100 text-purple-800';
            case '병가':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="w-full h-full bg-gray-100 flex flex-col">
            <div className="p-5 flex flex-1 gap-4">
                <div className="w-1/5 flex flex-col gap-4">
                    {/* <div className="bg-white shadow p-5 flex-1">
                        <div className="inline-block mb-3">
                            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                🏖️ 휴가 관리 시스템
                            </span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
                            휴가 관리
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            직원들의 휴가 일정을 한눈에 확인하고 효율적으로 관리하세요
                        </p>
                    </div> */}
                    
                    {/* 통계 박스 */}
                    <div className="bg-white shadow p-5 flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">휴가 현황</h3>
                        <div className="space-y-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-600">총 신청</p>
                                        <p className="text-lg font-bold text-gray-900">{vacationList.length}건</p>
                                    </div>
                                    <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-600">승인</p>
                                        <p className="text-lg font-bold text-green-600">
                                            {vacationList.filter(v => v.status === 'approved').length}건
                                        </p>
                                    </div>
                                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-600">대기</p>
                                        <p className="text-lg font-bold text-yellow-600">
                                            {vacationList.filter(v => v.status === 'pending').length}건
                                        </p>
                                    </div>
                                    <ClockIcon className="w-5 h-5 text-yellow-600" />
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-600">오늘 휴가</p>
                                        <p className="text-lg font-bold text-purple-600">
                                            {vacationList.filter(v => v.date === format(new Date(), 'yyyy-MM-dd')).length}명
                                        </p>
                                    </div>
                                    <UserGroupIcon className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 영역 */}
                <div className="w-4/5 flex flex-col gap-4">
                    {/* 상단 액션 버튼 박스 */}
                    <div className="bg-white shadow p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">휴가 관리 대시보드</h2>
                            <button
                                onClick={() => navigate('/admin/vacation/approval')}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                            >
                                <PlusIcon className="w-4 h-4" />
                                <span>휴가 승인</span>
                            </button>
                        </div>
                    </div>

                    {/* 메인 콘텐츠 영역 */}
                    <div className="flex gap-4 flex-1">
                        {/* 캘린더 박스 */}
                        <div className="bg-white shadow p-5 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                                휴가 캘린더
                            </h3>
                            <VacationCalendar
                                vacationData={vacationList}
                                selectedDate={selectedDate}
                                onDateSelect={setSelectedDate}
                            />
                        </div>

                        {/* 선택된 날짜 정보 박스 */}
                        <div className="bg-white shadow p-5 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <UserGroupIcon className="w-5 h-5 mr-2" />
                                {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '날짜 선택'} 휴가 정보
                            </h3>
                            {selectedDate ? (
                                vacationOfDay.length > 0 ? (
                                    <div className="space-y-3 max-h-80 overflow-y-auto">
                                        {vacationOfDay.map((item, idx) => (
                                            <div key={idx} className="bg-gray-50 rounded-lg p-4 border">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white font-bold text-sm">
                                                                {item.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                                                            <p className="text-xs text-gray-600">{item.department}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-1">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
                                                            {item.type}
                                                        </span>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)} flex items-center space-x-1`}>
                                                            {getStatusIcon(item.status)}
                                                            <span>{item.status === 'approved' ? '승인' : item.status === 'pending' ? '대기' : '거절'}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-600 space-y-1">
                                                    <div>📅 {item.period}</div>
                                                    <div>📝 {item.reason}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-gray-400 text-4xl mb-2">📅</div>
                                        <p className="text-gray-500 text-sm">선택한 날짜에 휴가자가 없습니다.</p>
                                    </div>
                                )
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-4xl mb-2">🗓️</div>
                                    <p className="text-gray-500 text-sm">날짜를 선택하면 휴가 정보를 볼 수 있습니다.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 최근 휴가 신청 목록 박스 */}
                    <div className="bg-white shadow p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 휴가 신청</h3>
                        <div className="overflow-x-auto">
                            <div className="min-w-full text-sm flex flex-col">
                                <div className="grid grid-cols-6 border-b text-left font-medium bg-gray-50 rounded-t-lg">
                                    <div className="px-3 py-3">직원명</div>
                                    <div className="px-3 py-3">부서</div>
                                    <div className="px-3 py-3">유형</div>
                                    <div className="px-3 py-3">기간</div>
                                    <div className="px-3 py-3">사유</div>
                                    <div className="px-3 py-3">상태</div>
                                </div>
                                {vacationList.map((item, idx) => (
                                    <div key={idx} className="grid grid-cols-6 items-center hover:bg-gray-50 transition border-b border-gray-100">
                                        <div className="px-3 py-3">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-xs">
                                                        {item.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                            </div>
                                        </div>
                                        <div className="px-3 py-3 text-gray-600">{item.department}</div>
                                        <div className="px-3 py-3">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <div className="px-3 py-3 text-gray-600">{item.period}</div>
                                        <div className="px-3 py-3 text-gray-600">{item.reason}</div>
                                        <div className="px-3 py-3">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)} flex items-center space-x-1`}>
                                                {getStatusIcon(item.status)}
                                                <span>{item.status === 'approved' ? '승인' : item.status === 'pending' ? '대기' : '거절'}</span>
                                            </span>
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
}
