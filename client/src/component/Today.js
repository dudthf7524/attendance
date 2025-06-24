import { useEffect, useState } from "react";

const Today = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // 날짜 및 시간 포맷팅
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
    const date = String(currentTime.getDate()).padStart(2, '0');
    const day = days[currentTime.getDay()];
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}시 ${minutes}분 ${seconds}초`;

    return (
        <div className="w-full bg-white border border-gray-200 px-6 py-4 text-center rounded-md shadow-sm">
            <p className="font-semibold mb-4 text-gray-700">
                {year}.{month}.{date} ({day})
            </p>
            <p className="text-sm text-gray-400">현재 시간</p>
            <p className="text-3xl font-semibold text-blue-600">{formattedTime}</p>
        </div>
    );
};

export default Today;
