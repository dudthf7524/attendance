import { FC, useEffect, useState } from "react";
import { MapPinIcon } from '@heroicons/react/24/outline';
import BottomBar from "../../component/BottomBar";
import Today from "../../component/Today";

const CheckInOutPage = () => {
    const [gps, setGps] = useState("위치 정보 없음");

    const handleGPS = () => {
        if (!navigator.geolocation) return alert("GPS를 지원하지 않습니다.");
        navigator.geolocation.getCurrentPosition((position) => {
            setGps(`위도: ${position.coords.latitude.toFixed(5)}, 경도: ${position.coords.longitude.toFixed(5)}`);
        });
    };

    return (
        <div className="h-90% w-full bg-gray-50 flex flex-col items-center px-4 py-10 pb-24 overflow-auto space-y-10">
            {/* 공지사항 */}
            <div className="w-full text-sm bg-blue-50 border border-blue-200 rounded-md py-2 px-4 text-blue-700">
                오늘 17:00 이후 퇴근 처리됩니다. 지각 주의하세요!
            </div>
            <Today/>
            <div className="w-full bg-white border border-gray-200 px-6 py-4 text-center">
                <button
                    onClick={handleGPS}
                    className="w-full px-4 py-2 bg-white border border-blue-400 text-blue-400 hover:bg-blue-50 active:scale-95 transition flex items-center justify-center gap-2"
                >
                    <MapPinIcon className="h-5 w-5 text-blue-400" />
                    <span className="leading-none">현재 위치 찾기</span>
                </button>
            </div>

            {/* 출근/퇴근 기록 */}
            <div className="w-full grid grid-cols-2 gap-6 bg-white border border-gray-200 rounded-md p-6">
                <div>
                    <p className="text-xs text-gray-500">출근 날짜</p>
                    <p className="text-base font-medium">2025-06-20</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">출근 시간</p>
                    <p className="text-base font-medium">09:03</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">퇴근 날짜</p>
                    <p className="text-base font-medium">2025-06-20</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">퇴근 시간</p>
                    <p className="text-base font-medium">18:02</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">근무 시간</p>
                    <p className="text-base font-medium">8시간 30분</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">휴게 시간</p>
                    <p className="text-base font-medium">1시간</p>
                </div>
            </div>

            {/* 출근/퇴근 버튼 */}
            <div className="w-full flex flex-col md:flex-row gap-4">
                <button
                    className="w-full md:w-1/2 py-6 bg-white border border-blue-400 text-blue-400 font-semibold rounded-md 
               hover:bg-blue-50 active:scale-95
               active:ring-2 active:ring-blue-400 active:ring-offset-2
               transition duration-150"
                >
                    출근
                </button>
                <button
                    className="w-full md:w-1/2 py-6 bg-white border border-blue-400 text-blue-400 font-semibold rounded-md 
               hover:bg-blue-50 active:scale-95
               active:ring-2 active:ring-blue-400 active:ring-offset-2
               transition duration-150"
                >
                    퇴근
                </button>
            </div>
            <BottomBar />
        </div >
    );
};

export default CheckInOutPage;
