import { useEffect, useState } from "react";
import { MapPinIcon } from '@heroicons/react/24/outline';
import BottomBar from "../../component/BottomBar";
import Today from "../../component/Today";
import MyLocation from "./MyLocation";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { TIME_DETAIL_REQUEST } from "../../reducers/time";
import dayjs from 'dayjs';
import { ATTENDANCE_REGISTER_REQUEST, ATTENDANCE_TODAY_REQUEST, ATTENDANCE_UPDATE_REQUEST } from "../../reducers/attendance";


const Attendance = () => {
    const dispatch = useDispatch();
    const [showLocationModal, setShowLocationModal] = useState(false);

    const { timeDetail } = useSelector((state) => state.time);
    useEffect(() => {
         timeDetailDB();
    }, [])
    const timeDetailDB = () => {
        dispatch({
            type: TIME_DETAIL_REQUEST
        })
    }

    const { attendanceToday } = useSelector((state) => state.attendance);
    useEffect(() => {
        attendanceTodayDB();
    }, [])
    const attendanceTodayDB = () => {
        dispatch({
            type: ATTENDANCE_TODAY_REQUEST
        })
    }

    console.log(attendanceToday);

    const attendance = () => {
        if (!timeDetail) {
            alert('지정된 출근/퇴근 시간이 존재하지 않습니다.\n관리자에게 문의 해주세요.');
            return;
        }

        if (attendanceToday?.attendance_id) {
            alert('이미 출근 기록이 존재합니다.');
            return;
        }

        // if (!isWithinRadius) {
        //     alert('근무지 반경 외부입니다. 출근할 수 없습니다.');
        //     return;
        // }

        const now = dayjs(); // 여기에 새로 선언
        const attendance_start_date = now.format('YYYY-MM-DD');
        const attendance_start_time = now.format('HH:mm');

        console.log(attendance_start_date);
        console.log(attendance_start_time);

        var attendance_start_state = "";

        if (timeDetail?.start_time < attendance_start_time) {
            attendance_start_state = "지각";
        } else {
            attendance_start_state = "정상";
        }

        console.log(attendance_start_state)

        const data = {
            attendance_start_date: attendance_start_date,
            attendance_start_time: attendance_start_time,
            attendance_start_state: attendance_start_state,
            start_time: timeDetail.start_time,
            rest_start_time: timeDetail.rest_start_time,
            rest_end_time: timeDetail.rest_end_time,
        }

        dispatch({
            type: ATTENDANCE_REGISTER_REQUEST,
            data: data
        });
    }
    const leaveWork = () => {
        if (!timeDetail) {
            alert('지정된 출근/퇴근 시간이 존재하지 않습니다.\n관리자에게 문의 해주세요.');
            return;
        }

        const now = dayjs(); // 여기에 새로 선언
        const attendance_end_date = now.format('YYYY-MM-DD');
        const attendance_end_time = now.format('HH:mm');
        var attendance_end_state = "퇴근";
        const data = {
            attendance_id: attendanceToday?.attendance_id,
            attendance_end_date: attendance_end_date,
            attendance_end_time: attendance_end_time,
            attendance_end_state: attendance_end_state,
        }

        dispatch({
            type: ATTENDANCE_UPDATE_REQUEST,
            data: data
        });
    }
    const hasStarted = !!attendanceToday?.attendance_start_time;
    const hasEnded = !!attendanceToday?.attendance_end_time;

    const isCheckInDisabled = hasStarted && !hasEnded;
    const isCheckOutDisabled = !hasStarted || hasEnded;

    return (
        <div className="h-90% w-full bg-gray-50 flex flex-col items-center px-4 py-10 pb-24 overflow-auto space-y-10">
            {/* 공지사항 */}
            <div className="w-full text-sm bg-blue-50 border border-blue-200 rounded-md py-2 px-4 text-blue-700">
                오늘 17:00 이후 퇴근 처리됩니다. 지각 주의하세요!
            </div>
            <Today />
            <div className="w-full bg-white border border-gray-200 px-6 py-4 text-center">
                <button
                    onClick={() => setShowLocationModal(true)}
                    className="w-full px-4 py-2 bg-white border border-blue-400 text-blue-400 hover:bg-blue-50 active:scale-95 transition flex items-center justify-center gap-2"
                >
                    <MapPinIcon className="h-5 w-5 text-blue-400" />
                    <span className="leading-none">현재 위치 찾기</span>
                </button>
            </div>

            <div className="w-full grid grid-cols-3 gap-6 bg-white border border-gray-200 rounded-md p-6 text-center">
                <div>
                    <p className="text-xs text-gray-500">출근 시간</p>
                    <p className="text-base font-medium">{timeDetail?.start_time || '출근시간 미정'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">퇴근 시간</p>
                    <p className="text-base font-medium">{timeDetail?.end_time || '퇴근시간 미정'}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">휴게 시간</p>
                    <p className="text-base font-medium">{timeDetail?.rest_start_time || '휴게시작시간 미정'} ~ {timeDetail?.rest_end_time || '휴게종료시간 미정'}</p>
                </div>
            </div>

            {/* 출근/퇴근 기록 */}
            <div className="w-full grid grid-cols-2 gap-6 bg-white border border-gray-200 rounded-md p-6 text-center">
                <div>
                    <p className="text-xs text-gray-500">출근 날짜</p>
                    <p className="text-base font-medium">{attendanceToday?.attendance_start_date || "출근 전"}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">출근 시간</p>
                    <p className="text-base font-medium">{attendanceToday?.attendance_start_time || "출근 전"}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">퇴근 날짜</p>
                    <p className="text-base font-medium">{attendanceToday?.attendance_end_date || "퇴근 전"}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">퇴근 시간</p>
                    <p className="text-base font-medium">{attendanceToday?.attendance_end_time || "퇴근 전"}</p>
                </div>
            </div>

            {/* 출근/퇴근 버튼 */}
            <div className="w-full flex flex-col md:flex-row gap-4">
                <button
                    disabled={isCheckInDisabled}
                    onClick={attendance}
                    className={`w-full md:w-1/2 py-6 font-semibold rounded-md border transition duration-150
      ${isCheckInDisabled
                            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-blue-400 text-blue-400 hover:bg-blue-50 active:scale-95 active:ring-2 active:ring-blue-400 active:ring-offset-2'}
    `}
                >
                    출근
                </button>

                <button
                    disabled={isCheckOutDisabled}
                    onClick={leaveWork}
                    className={`w-full md:w-1/2 py-6 font-semibold rounded-md border transition duration-150
      ${isCheckOutDisabled
                            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-blue-400 text-blue-400 hover:bg-blue-50 active:scale-95 active:ring-2 active:ring-blue-400 active:ring-offset-2'}
    `}
                >
                    퇴근
                </button>
            </div>
            <BottomBar />
            {showLocationModal &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg w-4/5 p-4 h-[90vh] overflow-y-auto">
                            <MyLocation closeModal={() => setShowLocationModal(false)} />
                        </div>
                    </div>,
                    document.body
                )
            }
        </div >
    );
};

export default Attendance;
