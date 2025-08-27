import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_VIEW_REQUEST } from "../../reducers/user";

export default function EmployeeDetailModal({ user_code, user_name, onClose }) {
    const navigate = useNavigate();

    const handleEdit = (user_code) => {
        onClose(); // 모달 닫기
        navigate(`/admin/employee/edit/${user_code}`); // 수정 페이지로 이동
    };

    const { userView } = useSelector((state) => state.user);
    console.log(userView)
    const dispatch = useDispatch();
    useEffect(() => {
        userViewDB();
    }, [user_code]);

    const userViewDB = async () => {
        const data = user_code;
        dispatch({
            type: USER_VIEW_REQUEST,
            data: data
        });
    };

    if (!user_code) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative transform transition-all duration-300">
                {/* 헤더 */}
                <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                    {user_name}
                                </h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* 컨텐츠 */}
                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* 기본 정보 카드 */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <span className="text-xl mr-2">📋</span>
                                기본 정보
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <span className="text-sm font-semibold text-gray-700">생년월일</span>
                                    <span className="text-sm text-gray-900 font-medium bg-white px-3 py-1 rounded-md">
                                        {userView?.user_birth_date || '미입력'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <span className="text-sm font-semibold text-gray-700">혈액형</span>
                                    <span className="text-sm text-gray-900 font-medium bg-white px-3 py-1 rounded-md">
                                        {userView?.user_blood_type || '미입력'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <span className="text-sm font-semibold text-gray-700">국적</span>
                                    <span className="text-sm text-gray-900 font-medium bg-white px-3 py-1 rounded-md">
                                        {userView?.country?.country_name || '미입력'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-sm font-semibold text-gray-700">학력</span>
                                    <span className="text-sm text-gray-900 font-medium bg-white px-3 py-1 rounded-md">
                                        {userView?.education_level?.education_level_name || '미입력'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 연락처 정보 카드 */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <span className="text-xl mr-2">📞</span>
                                연락처 정보
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <span className="text-sm font-semibold text-gray-700">전화번호</span>
                                    <span className="text-sm text-gray-900 font-medium bg-white px-3 py-1 rounded-md">
                                        {userView?.user_phone || '미입력'}
                                    </span>
                                </div>
                                <div className="py-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-gray-700">주소</span>
                                    </div>
                                    <div className="bg-white p-3 rounded-md">
                                        {userView?.user_postcode && userView?.user_address_basic && userView?.user_address_detail ? (
                                            <div className="text-sm text-gray-900">
                                                <div className="font-medium mb-1">
                                                    [{userView.user_postcode}]
                                                </div>
                                                <div>
                                                    {userView.user_address_basic}
                                                </div>
                                                <div className="text-gray-600">
                                                    {userView.user_address_detail}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-500">주소 미입력</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 근무 정보 카드 */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-r from-black to-gray-800 rounded-xl p-6 text-white">
                                <h3 className="text-lg font-bold mb-4 flex items-center">
                                    <span className="text-xl mr-2">💼</span>
                                    근무 정보
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                                        <div className="text-sm text-gray-300 mb-2">부서</div>
                                        <div className="text-lg font-bold">
                                            {userView?.department?.department_name || '미배정'} 부서
                                        </div>
                                    </div>

                                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                                        <div className="text-sm text-gray-300 mb-2">연차 수</div>
                                        <div className="text-lg font-bold flex items-center">
                                            {userView?.user_annual_leave || '0'}
                                            <span className="text-sm text-gray-300 ml-1">일</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 푸터 */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold"
                    >
                        닫기
                    </button>
                    <button
                        onClick={() => handleEdit(userView?.user_code)}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                        <span>정보 수정</span>
                    </button>
                </div>
            </div>
        </div>
    );
}