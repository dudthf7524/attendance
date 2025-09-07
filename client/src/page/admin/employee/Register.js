import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_CHECK_ID_REQUEST, USER_REGISTER_REQUEST } from "../../../reducers/user";
import { Countries } from "../../../constant/Countries";
import { Departments } from "../../../constant/Departments";
import { BloodTypes } from "../../../constant/BloodTypes";
import { EducationLevels } from "../../../constant/EducationLevels";
import DaumPostcode from 'react-daum-postcode';
import { validateUserId, validateUserPassword } from "../../../hooks/validate/EmployeeRegister";
import { useLocation } from "react-router-dom";
import {
  UserIcon,
  KeyIcon,
  IdentificationIcon,
  GlobeAsiaAustraliaIcon,
  HeartIcon,
  AcademicCapIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { validateUserName } from "../../../hooks/validate/Login";

const UserEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const detailedUserData = location.state; // navigate에서 넘긴 데이터가 여기 들어옴

  console.log(detailedUserData);
  const [checkIdState, setCheckIdState] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [user_id_error, user_id_setError] = useState(null);
  const [user_password_error, user_password_setError] = useState(null);
  const [user_name_error, user_name_setError] = useState(null);

  const [formData, setFormData] = useState({
    user_id: "",
    user_password: "",
    user_password_check: "",
    user_name: "",
    user_nickname: "",
    user_position: "",
    user_hire_date: "",
    user_birth_date: "",
    user_annual_leave: "",
    user_country: "",
    user_department: "",
    user_blood_type: "",
    user_education: "",
    user_phone: "",
    user_postcode: "",
    user_address_basic: "",
    user_address_detail: "",
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
      type: USER_REGISTER_REQUEST,
      data: data
    });
  }
  const [showPostcode, setShowPostcode] = useState(false);

  const [phoneData, setPhoneData] = useState({
    phone_1: "010",
    phone_2: "",
    phone_3: "",
  })
  const phoneDataChange = (e) => {
    const { name, value } = e.target;
    setPhoneData({
      ...phoneData,
      [name]: value
    });
  };

  const checkId = () => {

    if (user_id_error) {
      return;
    }

    const data = {
      user_id: formData.user_id
    }
    dispatch({
      type: USER_CHECK_ID_REQUEST,
      data: data
    });
  }

  const { userCheckId } = useSelector((state) => state.user);
  useEffect(() => {
    if (userCheckId === 0) {
      setIsAvailable(true);
      setCheckIdState(true)
    } else if (userCheckId === 1) {
      setIsAvailable(false);
      setCheckIdState(true)
    }
  }, [userCheckId])

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

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="p-5 flex flex-1 flex-col gap-4 h-full">
        <form id="employee-form" onSubmit={userRegister} className="flex gap-4 flex-1 h-full">
          <div className="bg-white p-6 w-1/4 h-full flex flex-col border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <KeyIcon className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">로그인 정보</h3>
              </div>
              <p className="text-xs text-gray-500">시스템 접근을 위한 계정 정보</p>
            </div>
            <div className="space-y-6 flex-1">
              <div className="bg-gray-50 p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  사용자 아이디
                </label>
                <div className="flex gap-2">
                  <input
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    onBlur={() => {
                      const errorMessage = validateUserId(formData.user_id);
                      user_id_setError(errorMessage);
                    }}
                    readOnly={isAvailable}
                    className="flex-1 border-2 border-gray-300 px-3 py-2.5 text-sm "
                    placeholder="영문, 숫자 조합"
                  />
                  <button
                    type="button"
                    onClick={checkId}
                    disabled={isAvailable}
                    className={`px-4 py-3 text-xs font-semibold transition-all duration-300 flex items-center-md ${isAvailable
                      ? "bg-white border border-gray-300 text-gray-400"
                      : "border border-gray-300 bg-white"
                      }`}
                  >
                    {isAvailable ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        확인완료
                      </>
                    ) : (
                      "중복확인"
                    )}
                  </button>
                </div>
                {user_id_error && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <XCircleIcon className="w-4 h-4 mr-1" />
                    {user_id_error}
                  </div>
                )}
                {checkIdState && (
                  <div className={`flex items-center text-sm mt-2 ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                    {isAvailable ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        사용 가능한 아이디입니다
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="w-4 h-4 mr-1" />
                        이미 사용중인 아이디입니다
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  비밀번호
                </label>
                <input
                  type="password"
                  name="user_password"
                  value={formData.user_password}
                  onChange={handleChange}
                  onBlur={() => {
                    const errorMessage = validateUserPassword(formData.user_password);
                    user_password_setError(errorMessage);
                  }}
                  className="w-full border-2 border-gray-300 px-3 py-2.5 text-sm transition-all duration-200"
                  placeholder="8자 이상의 안전한 비밀번호"
                />
                {user_password_error && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <XCircleIcon className="w-4 h-4 mr-1" />
                    {user_password_error}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white  p-6 w-1/4 h-full flex flex-col border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <UserIcon className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">기본 정보</h3>
              </div>
              <p className="text-xs text-gray-500">직원의 개인 기본 정보</p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <UserIcon className="w-4 h-4 mr-2 text-green-600" />
                  이름
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  onBlur={() => {
                    const errorMessage = validateUserName(formData.user_name);
                    user_name_setError(errorMessage);
                  }}
                  className="w-full border-2 border-gray-300 px-3 py-2.5 text-sm transition-all duration-200"
                  placeholder="실명을 입력해주세요"
                />
                {user_name_error && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <XCircleIcon className="w-4 h-4 mr-1" />
                    {user_name_error}
                  </div>
                )}
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <IdentificationIcon className="w-4 h-4 mr-2 text-blue-600" />
                  닉네임
                </label>
                <input
                  name="user_nickname"
                  value={formData.user_nickname}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 px-3 py-2.5 text-sm transition-all duration-200"
                  placeholder="사용할 닉네임을 입력하세요"
                />
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <CalendarDaysIcon className="w-4 h-4 mr-2 text-yellow-600" />
                  생년월일
                </label>
                <input
                  type="date"
                  name="user_birth_date"
                  value={formData.user_birth_date}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-yellow-500 focus:ring-yellow-200 focus:ring-2  px-3 py-2.5 text-sm transition-all duration-200"
                />
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <GlobeAsiaAustraliaIcon className="w-4 h-4 mr-2 text-purple-600" />
                  국적
                </label>
                <select
                  name="user_country"
                  value={formData.user_country}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-200 focus:ring-2  px-3 py-2.5 text-sm transition-all duration-200"
                >
                  {Countries.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white  p-6 w-1/4 h-full flex flex-col border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">개인 정보</h3>
              </div>
              <p className="text-xs text-gray-500">건강 및 연락처 정보</p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <HeartIcon className="w-4 h-4 mr-2 text-red-500" />
                  혈액형
                </label>
                <select
                  name="user_blood_type"
                  value={formData.user_blood_type}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-red-500 focus:ring-red-200 focus:ring-2  px-3 py-2.5 text-sm transition-all duration-200"
                >
                  {BloodTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <AcademicCapIcon className="w-4 h-4 mr-2 text-indigo-600" />
                  최종학력
                </label>
                <select
                  name="user_education"
                  value={formData.user_education}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 focus:ring-2  px-3 py-2.5 text-sm transition-all duration-200"
                >
                  {EducationLevels.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-2 text-blue-600" />
                  연락처
                </label>
                <div className="flex gap-1 items-center">
                  <input
                    type="text"
                    name="phone_1"
                    maxLength={3}
                    value={phoneData.phone_1}
                    onChange={phoneDataChange}
                    className="w-1/3 px-2 py-2 text-sm border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2  text-center transition-all duration-200"
                    placeholder="010"
                  />
                  <span className="text-blue-600 font-medium">-</span>
                  <input
                    type="text"
                    name="phone_2"
                    maxLength={4}
                    value={phoneData.phone_2}
                    onChange={phoneDataChange}
                    className="w-1/3 px-2 py-2 text-sm border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2  text-center transition-all duration-200"
                    placeholder="1234"
                  />
                  <span className="text-blue-600 font-medium">-</span>
                  <input
                    type="text"
                    name="phone_3"
                    maxLength={4}
                    value={phoneData.phone_3}
                    onChange={phoneDataChange}
                    className="w-1/3 px-2 py-2 text-sm border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2  text-center transition-all duration-200"
                    placeholder="5678"
                  />
                </div>
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2 text-green-600" />
                  주소
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.user_postcode}
                      readOnly
                      onClick={() => setShowPostcode(true)}
                      placeholder="우편번호 클릭"
                      className="flex-1 border-2 border-gray-300 focus:border-green-500  px-3 py-2 text-sm cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPostcode(true)}
                      className="px-4 py-2 font-semibold bg-green-600 hover:bg-green-700 text-white text-xs  transition-all duration-200 hover:shadow-md flex items-center"
                    >
                      <MapPinIcon className="w-3 h-3 mr-1" />
                      검색
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.user_address_basic}
                    readOnly
                    placeholder="기본주소 (자동입력)"
                    className="w-full border-2 border-gray-300  px-3 py-2 text-sm bg-gray-50"
                  />
                  <input
                    type="text"
                    name="user_address_detail"
                    value={formData.user_address_detail}
                    onChange={handleChange}
                    placeholder="상세주소를 입력하세요"
                    className="w-full border-2 border-gray-300 focus:border-green-500 focus:ring-green-200 focus:ring-2  px-3 py-2 text-sm transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white  p-6 w-1/4 h-full flex flex-col border border-gray-200">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <BriefcaseIcon className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">근무 정보</h3>
              </div>
              <p className="text-xs text-gray-500">회사 내 업무 관련 정보</p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-2 text-orange-600" />
                  직책
                </label>
                <input
                  type="text"
                  name="user_position"
                  value={formData.user_position}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-200 focus:ring-2  px-3 py-2.5 text-sm transition-all duration-200"
                  placeholder="예: 과장, 대리, 사원"
                />
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-600" />
                  입사일
                </label>
                <input
                  type="date"
                  name="user_hire_date"
                  value={formData.user_hire_date}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 px-3 py-2.5 text-sm transition-all duration-200"
                />
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <BuildingOfficeIcon className="w-4 h-4 mr-2 text-purple-600" />
                  부서
                </label>
                <select
                  name="user_department"
                  value={formData.user_department}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-200 focus:ring-2  px-3 py-2.5 text-sm transition-all duration-200"
                >
                  {Departments.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50  p-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 text-green-600" />
                  연차수
                </label>
                <input
                  type="number"
                  name="user_annual_leave"
                  value={formData.user_annual_leave}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 focus:border-green-500 focus:ring-green-200 focus:ring-2  px-3 py-2.5 text-sm transition-all duration-200"
                  placeholder="15일 (예시)"
                  min="0"
                  max="30"
                />
              </div>
            </div>

            <button
              form="employee-form"
              type="submit"
              className="mt-6 w-full border border-gray-300 font-bold py-4 px-6  transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              직원 등록하기
            </button>
          </div>
        </form>

        {showPostcode && (
          <div
            className="fixed inset-0 bg-gray-200 bg-opacity-50 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6-2xl relative w-[600px] h-[500px]"
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

export default UserEdit;
