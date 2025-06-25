import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TIME_EDIT_REQUEST } from "../../reducers/time";

const generateOptions = (range) =>
    Array.from({ length: range }, (_, i) => String(i).padStart(2, "0"));

const TimeEditModal = ({ isOpen, onClose, timeData }) => {
    console.log(timeData)
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        startHour: "00",
        startMin: "00",
        endHour: "00",
        endMin: "00",
        breakStartHour: "00",
        breakStartMin: "00",
        breakEndHour: "00",
        breakEndMin: "00",
    });

    useEffect(() => {
        if (timeData) {
            setFormData({
                time_id: timeData.time_id,
                startHour: timeData.start_time?.split(":")[0] || "00",
                startMin: timeData.start_time?.split(":")[1] || "00",
                endHour: timeData.end_time?.split(":")[0] || "00",
                endMin: timeData.end_time?.split(":")[1] || "00",
                breakStartHour: timeData.rest_start_time?.split(":")[0] || "00",
                breakStartMin: timeData.rest_start_time?.split(":")[1] || "00",
                breakEndHour: timeData.rest_end_time?.split(":")[0] || "00",
                breakEndMin: timeData.rest_end_time?.split(":")[1] || "00",
            });
        }
    }, [timeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log(formData)
        const data = formData;
        dispatch({
            type: TIME_EDIT_REQUEST,
            data: data
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl z-50">
                <h2 className="text-lg font-bold text-blue-600 mb-4">{timeData.user_name}님의 시간 수정</h2>

                <div className="flex flex-col gap-4">
                    {/* 시간 필드 반복 */}
                    {[
                        { label: "출근 시간", hour: "startHour", min: "startMin" },
                        { label: "퇴근 시간", hour: "endHour", min: "endMin" },
                        { label: "휴게 시작", hour: "breakStartHour", min: "breakStartMin" },
                        { label: "휴게 종료", hour: "breakEndHour", min: "breakEndMin" },
                    ].map(({ label, hour, min }) => (
                        <div key={hour}>
                            <p className="text-sm font-medium text-blue-500 mb-2">{label}</p>
                            <div className="flex gap-2">
                                <select
                                    name={hour}
                                    value={formData[hour]}
                                    onChange={handleChange}
                                    className="w-1/2 border rounded-md px-3 py-2 text-sm"
                                >
                                    {generateOptions(24).map((h) => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                                <span className="self-center">:</span>
                                <select
                                    name={min}
                                    value={formData[min]}
                                    onChange={handleChange}
                                    className="w-1/2 border rounded-md px-3 py-2 text-sm"
                                >
                                    {generateOptions(60).map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-right flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeEditModal;
