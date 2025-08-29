import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, UserIcon, BuildingOfficeIcon, CalendarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { USER_EDIT_REQUEST, USER_VIEW_REQUEST } from "../../../reducers/user";
import { Countries } from "../../../constant/Countries";

const EmployeeEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user_code } = useParams();
    const { userView } = useSelector((state) => state.user);
    console.log(userView)
    const [formData, setFormData] = useState({
        user_code: "",
        user_name: "",
        user_nickname: "",
        user_position: "",
        user_hire_date: "",
        user_birth_date: "",
        user_blood_type: "",
        user_phone: "",
        user_annual_leave: "",
        user_country: "",
        user_postcode: "",
        user_address_basic: "",
        user_address_detail: "",
        department_code: "",
        education_level_code: "",
    });

    useEffect(() => {
        if (user_code) {
            dispatch({
                type: USER_VIEW_REQUEST,
                data: user_code
            });
        }
    }, [user_code, dispatch]);

    useEffect(() => {
        if (userView) {
            setFormData({
                user_code: userView.user_code || "",
                user_name: userView.user_name || "",
                user_nickname: userView.user_nickname || "",
                user_position: userView.user_position || "",
                user_hire_date: userView.user_hire_date || "",
                user_birth_date: userView.user_birth_date || "",
                user_blood_type: userView.user_blood_type || "",
                user_phone: userView.user_phone || "",
                user_annual_leave: userView.user_annual_leave || "",
                user_country: userView.user_country || "",
                user_postcode: userView.user_postcode || "",
                user_address_basic: userView.user_address_basic || "",
                user_address_detail: userView.user_address_detail || "",
                department_code: userView.department?.department_code || "",
                education_level_code: userView.education_level?.education_level_code || "",
            });
        }
    }, [userView]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("수정할 데이터:", formData);

        dispatch({
            type: USER_EDIT_REQUEST,
            data: formData
        });

        // 수정 후 목록으로 돌아가기
        navigate('/admin/employee/list');
    };

    const bloodTypes = [
        { value: "", label: "선택해주세요" },
        { value: "A", label: "A형" },
        { value: "B", label: "B형" },
        { value: "AB", label: "AB형" },
        { value: "O", label: "O형" },
    ];

    return (
        <div className="w-full min-w-[700px] overflow-x-auto">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-4">
                {/* 상단 헤더 */}
                <div className="mb-3">
                    <button
                        onClick={() => navigate('/admin/employee/list')}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        직원 목록으로 돌아가기
                    </button>

                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
                        {formData.user_name} 님의 정보 수정
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        직원의 상세 정보를 수정하여 최신 상태로 유지하세요
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-8">
                        {/* 기본 정보 섹션 */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                                    <UserIcon className="w-7 h-7 mr-3" />
                                    기본 정보
                                </h2>
                                <p className="text-gray-600">직원의 기본적인 개인 정보를 입력하세요</p>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            이름 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="user_name"
                                            value={formData.user_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            닉네임 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="user_nickname"
                                            value={formData.user_nickname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            생년월일
                                        </label>
                                        <input
                                            type="date"
                                            name="user_birth_date"
                                            value={formData.user_birth_date}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            혈액형
                                        </label>
                                        <select
                                            name="user_blood_type"
                                            value={formData.user_blood_type}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        >
                                            {bloodTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            국적
                                        </label>
                                        <select
                                            name="user_country"
                                            value={formData.user_country}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        >
                                            <option value="">국가를 선택해주세요</option>
                                            {Countries.map((country) => (
                                                <option key={country.value} value={country.value}>
                                                    {country.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            전화번호
                                        </label>
                                        <input
                                            type="tel"
                                            name="user_phone"
                                            value={formData.user_phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            placeholder="010-1234-5678"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 근무 정보 섹션 */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                                    <BuildingOfficeIcon className="w-7 h-7 mr-3" />
                                    근무 정보
                                </h2>
                                <p className="text-gray-600">직원의 근무와 관련된 정보를 입력하세요</p>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            직책 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="user_position"
                                            value={formData.user_position}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            placeholder="예: 팀장, 대리, 사원"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            입사일 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="user_hire_date"
                                            value={formData.user_hire_date}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            연차 수
                                        </label>
                                        <input
                                            type="number"
                                            name="user_annual_leave"
                                            value={formData.user_annual_leave}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                                            placeholder="연차 일수를 입력해주세요"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 주소 정보 섹션 */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                                    <GlobeAltIcon className="w-7 h-7 mr-3" />
                                    주소 정보
                                </h2>
                                <p className="text-gray-600">직원의 거주 주소를 입력하세요</p>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                우편번호
                                            </label>
                                            <input
                                                type="text"
                                                name="user_postcode"
                                                value={formData.user_postcode}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                                                placeholder="12345"
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                기본 주소
                                            </label>
                                            <input
                                                type="text"
                                                name="user_address_basic"
                                                value={formData.user_address_basic}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                                                placeholder="예: 서울특별시 중구 세종대로"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            상세 주소
                                        </label>
                                        <input
                                            type="text"
                                            name="user_address_detail"
                                            value={formData.user_address_detail}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                                            placeholder="예: 101동 1502호"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 버튼 섹션 */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="p-8">
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/admin/employee/list')}
                                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        수정 완료
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeEdit;