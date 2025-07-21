import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { USER_EDIT_REQUEST } from "../../reducers/user";

const EmployeeEditModal = ({ isOpen, userData, onClose }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        user_code: "",
        user_name: "",
        user_nickname: "",
        user_position: "",
        user_hire_date: "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                user_code: userData.user_code || "",
                user_name: userData.user_name || "",
                user_nickname: userData.user_nickname || "",
                user_position: userData.user_position || "",
                user_hire_date: userData.user_hire_date || "",
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = (e) => {
        console.log(formData)
        e.preventDefault();
        const data = formData;
        dispatch({
            type: USER_EDIT_REQUEST,
            data: data
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 rounded-lg shadow-xl z-50">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
                    {/* {userData.user_name}님의 정보 수정 */}
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mb-8">
                    선택한 직원의 정보를 수정합니다.
                </p>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-sm text-blue-400 mb-1">이름</label>
                        <input
                            type="text"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-blue-400 mb-1">닉네임</label>
                        <input
                            type="text"
                            name="user_nickname"
                            value={formData.user_nickname}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-blue-400 mb-1">직책</label>
                        <input
                            type="text"
                            name="user_position"
                            value={formData.user_position}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-blue-400 mb-1">입사일</label>
                        <input
                            type="date"
                            name="user_hire_date"
                            value={formData.user_hire_date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div className="flex flex-col space-y-4 mt-10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full px-6 py-3 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            수정
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeEditModal;
