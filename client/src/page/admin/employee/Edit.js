import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_CHECK_ID_REQUEST, USER_EDIT_REQUEST, USER_REGISTER_REQUEST } from "../../../reducers/user";
import { UserIcon, PhoneIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { Countries } from "../../../constant/Countries";
import { Departments } from "../../../constant/Departments";
import { BloodTypes } from "../../../constant/BloodTypes";
import { EducationLevels } from "../../../constant/EducationLevels";
import DaumPostcode from 'react-daum-postcode';
import { validateUserId, validateUserPassword } from "../../../hooks/validate/EmployeeRegister";
import { useLocation } from "react-router-dom";

const Edit = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const detailedUserData = location.state.detailedUserData; // navigate에서 넘긴 데이터가 여기 들어옴  
    const user_code = location.state.user_code;
    const phone = detailedUserData?.user_phone?.split("-") ?? ["010", "", ""];

    const [formData, setFormData] = useState({
        user_name: detailedUserData?.user_name || "",
        user_nickname: detailedUserData?.user_nickname || "",
        user_position: detailedUserData?.user_position || "",
        user_hire_date: detailedUserData?.user_hire_date || "",
        user_birth_date: detailedUserData?.user_birth_date || "",
        user_annual_leave: detailedUserData?.user_annual_leave || "",
        user_country: detailedUserData?.country.country_code || "",
        user_department: detailedUserData?.department.department_code || "",
        user_blood_type: detailedUserData?.user_blood_type || "",
        user_education: detailedUserData?.education_level.education_level_code || "",
        user_phone: "",
        user_postcode: detailedUserData?.user_postcode || "",
        user_address_basic: detailedUserData?.user_address_basic || "",
        user_address_detail: detailedUserData?.user_address_detail || "",
        user_code: user_code || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const userRegister = (e) => {
        e.preventDefault();

        const phone = phoneData.phone_1 + "-" + phoneData.phone_2 + "-" + phoneData.phone_3;
        formData.user_phone = phone;

        const data = formData;


        console.log(data)

        dispatch({
            type: USER_EDIT_REQUEST,
            data: data
        });
    }
    const [showPostcode, setShowPostcode] = useState(false);

    const [phoneData, setPhoneData] = useState({
        phone_1: "010",
        phone_2: phone[1] || '',
        phone_3: phone[2] || '',
    })
    const phoneDataChange = (e) => {
        const { name, value } = e.target;
        setPhoneData({
            ...phoneData,
            [name]: value
        });
    };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            if (extraAddress !== '') {
                fullAddress += ` (${extraAddress})`;
            }
        }
        setFormData(prev => ({
            ...prev,
            user_postcode: data.zonecode,
            user_address_basic: fullAddress,
        }));
        setShowPostcode(false);
    };
    const closeModal = () => setShowPostcode(false);

    if (!detailedUserData) {
        return (
            <div>직원목록에서 직원을 선택해주세요</div>
        )
    }

    return (
        <div className="w-full h-full bg-gray-50">
            <div className="p-6 flex flex-1 flex-col gap-6 h-full">
                <form id="employee-form" onSubmit={userRegister} className="flex gap-6 flex-1 h-full">
                    {/* 첫 번째 박스: 기본 정보 */}
                    <div className="bg-white shadow-lg p-6 w-1/3 space-y-4 h-full flex flex-col border border-gray-200">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                                기본 정보
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">이름</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                        placeholder="이름을 입력해주세요"
                                    />
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">닉네임</label>
                                    <input
                                        name="user_nickname"
                                        value={formData.user_nickname}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                        placeholder="닉네임을 입력하세요"
                                    />
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">생년월일</label>
                                    <input
                                        type="date"
                                        name="user_birth_date"
                                        value={formData.user_birth_date}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                    />
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">국가</label>
                                    <select
                                        name="user_country"
                                        value={formData.user_country}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                    >
                                        {Countries.map((type) => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 두 번째 박스: 개인 정보 */}
                    <div className="bg-white shadow-lg p-6 w-1/3 space-y-4 h-full flex flex-col border border-gray-200">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <PhoneIcon className="w-5 h-5 mr-2 text-red-600" />
                                개인 정보
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">혈액형</label>
                                    <select
                                        name="user_blood_type"
                                        value={formData.user_blood_type}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                    >
                                        {BloodTypes.map((type) => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">최종학력</label>
                                    <select
                                        name="user_education"
                                        value={formData.user_education}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                    >
                                        {EducationLevels.map((type) => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">연락처</label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            name="phone_1"
                                            maxLength={3}
                                            value={phoneData.phone_1}
                                            onChange={phoneDataChange}
                                            className="w-1/3 px-2 py-2 text-sm text-center border border-gray-300"
                                            placeholder="010"
                                        />
                                        <span className="text-green-600">-</span>
                                        <input
                                            type="text"
                                            name="phone_2"
                                            maxLength={4}
                                            value={phoneData.phone_2}
                                            onChange={phoneDataChange}
                                            className="w-1/3 px-2 py-2 text-sm text-center border border-gray-300"
                                            placeholder="1234"
                                        />
                                        <span className="text-green-600">-</span>
                                        <input
                                            type="text"
                                            name="phone_3"
                                            maxLength={4}
                                            value={phoneData.phone_3}
                                            onChange={phoneDataChange}
                                            className="w-1/3 px-2 py-2 text-sm text-center border border-gray-300"
                                            placeholder="5678"
                                        />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">주소</label>
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={formData.user_postcode}
                                                readOnly
                                                onClick={() => setShowPostcode(true)}
                                                placeholder="우편번호"
                                                className="w-2/3 border border-gray-300 px-3 py-2 text-sm cursor-pointer"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPostcode(true)}
                                                className="flex-1 px-4 py-2 font-semibold text-sm border border-gray-300"
                                            >
                                                주소 검색
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.user_address_basic}
                                            readOnly
                                            placeholder="기본주소"
                                            className="w-full border border-gray-300 px-3 py-2 text-sm"
                                        />
                                        <input
                                            type="text"
                                            name="user_address_detail"
                                            value={formData.user_address_detail}
                                            onChange={handleChange}
                                            placeholder="상세주소"
                                            className="w-full border border-gray-300 px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 세 번째 박스: 근무 정보 */}
                    <div className="bg-white shadow-lg p-6 w-1/3 space-y-4 h-full flex flex-col border border-gray-200">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <BriefcaseIcon className="w-5 h-5 mr-2 text-green-600" />
                                근무 정보
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">직책</label>
                                    <input
                                        type="text"
                                        name="user_position"
                                        value={formData.user_position}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                        placeholder="직책을 입력해주세요"
                                    />
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">입사일</label>
                                    <input
                                        type="date"
                                        name="user_hire_date"
                                        value={formData.user_hire_date}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                    />
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">부서</label>
                                    <select
                                        name="user_department"
                                        value={formData.user_department}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                    >
                                        {Departments.map((type) => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="p-4">
                                    <label className="block text-sm font-medium mb-2">연차수</label>
                                    <input
                                        type="number"
                                        name="user_annual_leave"
                                        value={formData.user_annual_leave}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 text-sm"
                                        placeholder="연차수를 입력해주세요"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* 직원 수정 버튼 - 박스 하단에 고정 */}
                        <button
                            form="employee-form"
                            type="submit"
                            className="w-full px-6 py-3 font-semibold border border-gary-300"
                        >
                            <div className="flex items-center justify-center">
                                직원 정보 수정
                            </div>
                        </button>
                    </div>
                </form>

                {showPostcode && (
                    <div
                        className="fixed inset-0 bg-gray-200 bg-opacity-50 z-50 flex items-center justify-center"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white p-6 shadow-2xl relative w-[600px] h-[500px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-900">주소 검색</h3>
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 transition-all duration-200 hover:shadow-md"
                                    onClick={closeModal}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="h-[calc(100%-60px)]">
                                <DaumPostcode onComplete={handleComplete} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Edit;
