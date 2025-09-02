import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { ATTENDANCE_EDIT_REQUEST } from "../../../reducers/attendance";

const Edit = ({ attendance, onClose, onSave }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        attendance_id: attendance?.attendance_id || "",
        attendance_start_time: attendance?.attendance_start_time || "",
        attendance_end_time: attendance?.attendance_end_time || "",
        attendance_start_state: attendance?.attendance_start_state || "",
        attendance_end_state: attendance?.attendance_end_state || ""
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        const data = formData
        dispatch({
            type: ATTENDANCE_EDIT_REQUEST,
            data: data,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-96 max-w-md mx-4">
                {/* 헤더 */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">근태 수정</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* 본문 */}
                <div className="p-6 space-y-4">
                    {/* 직원 정보 표시 */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600">직원명</div>
                        <div className="font-medium">{attendance?.user?.user_info?.user_name}</div>
                        <div className="text-sm text-gray-600 mt-1">날짜: {attendance?.attendance_start_date}</div>
                    </div>

                    {/* 출근 시간 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            출근 시간
                        </label>
                        <input
                            type="time"
                            value={formData.attendance_start_time}
                            onChange={(e) => handleInputChange('attendance_start_time', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* 퇴근 시간 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            퇴근 시간
                        </label>
                        <input
                            type="time"
                            value={formData.attendance_end_time}
                            onChange={(e) => handleInputChange('attendance_end_time', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* 출근 상태 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            출근 상태
                        </label>
                        <select
                            value={formData.attendance_start_state}
                            onChange={(e) => handleInputChange('attendance_start_state', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">선택하세요</option>
                            <option value="출근">출근</option>
                            <option value="지각">지각</option>
                        </select>
                    </div>

                    {/* 퇴근 상태 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            퇴근 상태
                        </label>
                        <select
                            value={formData.attendance_end_state}
                            onChange={(e) => handleInputChange('attendance_end_state', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">선택하세요</option>
                            <option value="퇴근">퇴근</option>
                            <option value="조기퇴근">조기퇴근</option>
                        </select>
                    </div>
                </div>

                {/* 푸터 */}
                <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Edit;