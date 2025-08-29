import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import { TIME_REGISTER_REQUEST } from "../../../reducers/time";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const Register = ({ user_code, user_name }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSave() {
        const data = formData;

        dispatch({
            type: TIME_REGISTER_REQUEST,
            data: data
        });

        navigate('/admin/employee/list');

    }

    const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minuteOptions = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, '0'));

    const [formData, setFormData] = useState({
        startHour: "00",
        startMin: "00",
        endHour: "00",
        endMin: "00",
        breakStartHour: "00",
        breakStartMin: "00",
        breakEndHour: "00",
        breakEndMin: "00",
        user_code: user_code,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        {user_name ? `${user_name}님 ` : ''}근무시간
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">출근, 퇴근, 휴게시간을 설정해주세요</p>
                </div>

                <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all duration-200"
                >
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>저장하기</span>
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
                            <option value="">시</option>
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
                            <option value="">분</option>
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
                            <option value="">시</option>
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
                            <option value="">분</option>
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
                            <option value="">시</option>
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
                            <option value="">분</option>
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
                            <option value="">시</option>
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
                            <option value="">분</option>
                            {minuteOptions.map((m) => (
                                <option key={m} value={m}>{m}분</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register


