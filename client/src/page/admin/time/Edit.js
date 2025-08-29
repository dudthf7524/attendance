import { useEffect, useState } from "react";
import { ClockIcon, ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { TIME_EDIT_REQUEST } from "../../../reducers/time";
import { useLocation, useNavigate } from "react-router-dom";

const TimeEdit = () => {
    const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minuteOptions = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { timeDetail } = useSelector((state) => state.time);
    const { user_code, user_name } = location.state || {};
    const [formData, setFormData] = useState({
        startHour: "09",
        startMin: "00",
        endHour: "18",
        endMin: "00",
        breakStartHour: "12",
        breakStartMin: "00",
        breakEndHour: "13",
        breakEndMin: "00",
    });


    useEffect(() => {
        if (timeDetail) {
            setFormData({
                time_id: timeDetail.time_id,
                startHour: timeDetail.start_time?.split(":")[0] || "09",
                startMin: timeDetail.start_time?.split(":")[1] || "00",
                endHour: timeDetail.end_time?.split(":")[0] || "18",
                endMin: timeDetail.end_time?.split(":")[1] || "00",
                breakStartHour: timeDetail.rest_start_time?.split(":")[0] || "12",
                breakStartMin: timeDetail.rest_start_time?.split(":")[1] || "00",
                breakEndHour: timeDetail.rest_end_time?.split(":")[0] || "13",
                breakEndMin: timeDetail.rest_end_time?.split(":")[1] || "00",
            });
        }
    }, [timeDetail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => {
        const data = {
            ...formData,
            start_time: `${formData.startHour}:${formData.startMin}`,
            end_time: `${formData.endHour}:${formData.endMin}`,
            rest_start_time: `${formData.breakStartHour}:${formData.breakStartMin}`,
            rest_end_time: `${formData.breakEndHour}:${formData.breakEndMin}`,
        };
        dispatch({
            type: TIME_EDIT_REQUEST,
            data: data
        });
        navigate('/admin/time/setting', {
            state: { user_code, user_name }
        });
    };

    const handleCancel = () => {
        navigate('/admin/time/setting', {
            state: { user_code, user_name }
        });
    };

    return (
        <div className="w-full min-w-[700px] overflow-x-auto">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-4">
                <div className="mb-3">
                    <div className="inline-block mb-3">
                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            ✏️ 근무시간 수정 시스템
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
                                {user_name}님의 시간 수정
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                출근, 퇴근, 휴게시간을 수정할 수 있습니다
                            </p>
                        </div>
                        <button
                            onClick={handleCancel}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                            <span>뒤로가기</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-bold mb-1">근무시간 수정</h2>
                        <p className="">
                            원하는 시간으로 수정하고 저장 버튼을 눌러주세요
                        </p>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold mb-2">
                                                {user_name}님 근무시간 수정
                                            </h3>
                                            <p className="text-sm">
                                                각 시간을 선택하여 수정해주세요
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleEdit}
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all duration-200"
                                        >
                                            <PencilSquareIcon className="w-5 h-5" />
                                            <span>수정하기</span>
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* 출근시간 */}
                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center mb-3">
                                                <ClockIcon className="w-5 h-5 text-green-600 mr-2" />
                                                <h4 className="text-base font-semibold text-gray-900">출근시간</h4>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <select
                                                    name="startHour"
                                                    value={formData.startHour}
                                                    onChange={handleChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                                >
                                                    {hourOptions.map((h) => (
                                                        <option key={h} value={h}>{h}시</option>
                                                    ))}
                                                </select>
                                                <span className="text-gray-500 font-medium">:</span>
                                                <select
                                                    name="startMin"
                                                    value={formData.startMin}
                                                    onChange={handleChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                                >
                                                    {minuteOptions.map((m) => (
                                                        <option key={m} value={m}>{m}분</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* 퇴근시간 */}
                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center mb-3">
                                                <ClockIcon className="w-5 h-5 text-red-600 mr-2" />
                                                <h4 className="text-base font-semibold text-gray-900">퇴근시간</h4>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <select
                                                    name="endHour"
                                                    value={formData.endHour}
                                                    onChange={handleChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                                >
                                                    {hourOptions.map((h) => (
                                                        <option key={h} value={h}>{h}시</option>
                                                    ))}
                                                </select>
                                                <span className="text-gray-500 font-medium">:</span>
                                                <select
                                                    name="endMin"
                                                    value={formData.endMin}
                                                    onChange={handleChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                                >
                                                    {minuteOptions.map((m) => (
                                                        <option key={m} value={m}>{m}분</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* 휴게 시작 */}
                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center mb-3">
                                                <ClockIcon className="w-5 h-5 text-blue-600 mr-2" />
                                                <h4 className="text-base font-semibold text-gray-900">휴게 시작</h4>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <select
                                                    name="breakStartHour"
                                                    value={formData.breakStartHour}
                                                    onChange={handleChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                >
                                                    {hourOptions.map((h) => (
                                                        <option key={h} value={h}>{h}시</option>
                                                    ))}
                                                </select>
                                                <span className="text-gray-500 font-medium">:</span>
                                                <select
                                                    name="breakStartMin"
                                                    value={formData.breakStartMin}
                                                    onChange={handleChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                >
                                                    {minuteOptions.map((m) => (
                                                        <option key={m} value={m}>{m}분</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* 휴게 종료 */}
                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center mb-3">
                                                <ClockIcon className="w-5 h-5 text-purple-600 mr-2" />
                                                <h4 className="text-base font-semibold text-gray-900">휴게 종료</h4>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <select
                                                    name="breakEndHour"
                                                    value={formData.breakEndHour}
                                                    onChange={handleChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                                >
                                                    {hourOptions.map((h) => (
                                                        <option key={h} value={h}>{h}시</option>
                                                    ))}
                                                </select>
                                                <span className="text-gray-500 font-medium">:</span>
                                                <select
                                                    name="breakEndMin"
                                                    value={formData.breakEndMin}
                                                    onChange={handleChange}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                                >
                                                    {minuteOptions.map((m) => (
                                                        <option key={m} value={m}>{m}분</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeEdit;