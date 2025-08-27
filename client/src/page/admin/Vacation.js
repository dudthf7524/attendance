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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto z-10">
                {/* 상단 헤더 */}
                <div className="mb-8">
                    <div className="inline-block mb-4">
                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                            🏖️ 휴가 관리 시스템
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        휴가 관리
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        직원들의 휴가 일정을 한눈에 확인하고 효율적으로 관리하세요
                    </p>
                </div>

                {/* 통계 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">총 휴가 신청</p>
                                <p className="text-2xl font-bold text-gray-900">{vacationList.length}건</p>
                            </div>
                            <div className="p-3 rounded-full bg-blue-100">
                                <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">승인된 휴가</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {vacationList.filter(v => v.status === 'approved').length}건
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-green-100">
                                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">대기 중인 휴가</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {vacationList.filter(v => v.status === 'pending').length}건
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-yellow-100">
                                <ClockIcon className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">오늘 휴가자</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {vacationList.filter(v => v.date === format(new Date(), 'yyyy-MM-dd')).length}명
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-purple-100">
                                <UserGroupIcon className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 캘린더 섹션 */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                                <CalendarDaysIcon className="w-7 h-7 mr-3" />
                                휴가 캘린더
                            </h2>
                            <p className="text-gray-600">날짜를 선택하여 해당일의 휴가자를 확인하세요</p>
                        </div>

                        <div className="p-8">
                            <VacationCalendar
                                vacationData={vacationList}
                                selectedDate={selectedDate}
                                onDateSelect={setSelectedDate}
                                className=""
                            />
                        </div>
                    </div>

                    {/* 휴가 정보 섹션 */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                                        <UserGroupIcon className="w-7 h-7 mr-3" />
                                        {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '날짜 선택'} 휴가 정보
                                    </h2>
                                    <p className="text-gray-600">선택한 날짜의 휴가 신청 내역</p>
                                </div>
                                <button
                                    onClick={() => navigate('/admin/vacation/approval')}
                                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                    <span>휴가 등록</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            {selectedDate ? (
                                vacationOfDay.length > 0 ? (
                                    <div className="space-y-4">
                                        {vacationOfDay.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                                                            <span className="text-white font-bold text-lg">
                                                                {item.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                                            <p className="text-sm text-gray-600">{item.department}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                                                            {item.type}
                                                        </span>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)} space-x-1`}>
                                                            {getStatusIcon(item.status)}
                                                            <span>{item.status === 'approved' ? '승인' : item.status === 'pending' ? '대기' : '거절'}</span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <CalendarDaysIcon className="w-4 h-4 mr-2" />
                                                        <span>{item.period}</span>
                                                    </div>
                                                    <div className="flex items-start text-sm text-gray-600">
                                                        <span className="mr-2 mt-0.5">📝</span>
                                                        <span>{item.reason}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 text-6xl mb-4">📅</div>
                                        <p className="text-gray-500 text-lg">선택한 날짜에 휴가자가 없습니다.</p>
                                        <p className="text-gray-400 text-sm mt-2">다른 날짜를 선택해보세요</p>
                                    </div>
                                )
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">🗓️</div>
                                    <p className="text-gray-500 text-lg">날짜를 선택하면 휴가 정보를 볼 수 있어요.</p>
                                    <p className="text-gray-400 text-sm mt-2">왼쪽 캘린더에서 날짜를 클릭해주세요</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 최근 휴가 신청 목록 */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">최근 휴가 신청</h2>
                        <p className="text-gray-600">최근에 신청된 휴가 내역을 확인하세요</p>
                    </div>

                    <div className="p-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">직원명</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">부서</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">휴가 유형</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">기간</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">사유</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vacationList.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold text-sm">
                                                            {item.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium text-gray-900">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600">{item.department}</td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600">{item.period}</td>
                                            <td className="py-4 px-4 text-gray-600">{item.reason}</td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)} space-x-1`}>
                                                    {getStatusIcon(item.status)}
                                                    <span>{item.status === 'approved' ? '승인' : item.status === 'pending' ? '대기' : '거절'}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
