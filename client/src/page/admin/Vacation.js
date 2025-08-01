import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { FaPlaneDeparture, FaUser, FaCalendarAlt, FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const vacationList = [
    { name: '김철수', reason: '가족 여행', period: '2025-07-15 ~ 2025-07-16', date: '2025-07-15' },
    { name: '박지민', reason: '휴식', period: '2025-07-22 ~ 2025-07-22', date: '2025-07-22' },
];

export default function Vacation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
    const vacationOfDay = vacationList.filter((v) => v.date === formattedDate);

    return (
        <div className="w-full min-w-[1000px] overflow-x-auto">
            <main className="flex-1">
                <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">휴가 관리</h2>
                            <p className="text-sm text-gray-400 mt-1">달력에서 날짜를 선택해 휴가자를 확인하거나 등록하세요.</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/vacation/approval')}
                            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                        >
                            <FaPen /> 휴가 등록
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Calendar */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                            <Calendar
                                onChange={(date) => setSelectedDate(date)}
                                value={selectedDate}
                                tileContent={({ date, view }) => {
                                    const dateStr = format(date, 'yyyy-MM-dd');
                                    const isVacation = vacationList.some((v) => v.date === dateStr);
                                    return view === 'month' ? (
                                        <div className="flex justify-center mt-1" style={{ height: 16 }}>
                                            {isVacation ? (
                                                <FaPlaneDeparture className="text-green-500 text-xs" />
                                            ) : (
                                                <div style={{ width: 16, height: 16 }} />
                                            )}
                                        </div>
                                    ) : null;
                                }}
                            />
                        </div>

                        {/* Vacation Info */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
                            {selectedDate ? (
                                vacationOfDay.length > 0 ? (
                                    <>
                                        <h3 className="text-base font-semibold text-blue-600">
                                            ✈️ {formattedDate} 휴가자 목록
                                        </h3>
                                        {vacationOfDay.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="border border-gray-100 rounded p-4 bg-gray-50"
                                            >
                                                <p className="font-semibold text-gray-800 mb-1">
                                                    <FaUser className="inline mr-2" /> {item.name}
                                                </p>
                                                <p className="text-gray-600 text-sm mb-1">
                                                    <FaCalendarAlt className="inline mr-2" /> {item.period}
                                                </p>
                                                <p className="text-gray-500 text-sm">📝 {item.reason}</p>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p className="text-gray-500">선택한 날짜에 휴가자가 없습니다.</p>
                                )
                            ) : (
                                <p className="text-gray-500">날짜를 선택하면 휴가 정보를 볼 수 있어요.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
