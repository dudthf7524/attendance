import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_CHECK_ID_REQUEST, USER_REGISTER_REQUEST } from "../../reducers/user";
import { Countries } from "../../constant/Countries";
import { Departments } from "../../constant/Departments";
import { BloodTypes } from "../../constant/BloodTypes";
import { EducationLevels } from "../../constant/EducationLevels";
import DaumPostcode from 'react-daum-postcode';
import { validateUserId, validateUserPassword } from "../../hooks/validate/EmployeeRegister";

const EmployeeRegister = () => {
  const dispatch = useDispatch();
  const [checkIdState, setCheckIdState] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [user_id_error, user_id_setError] = useState(null);
  const [user_password_error, user_password_setError] = useState(null);

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
    <div className="w-full h-full bg-gray-100 flex flex-col">
      <div className="p-5 flex flex-1 gap-4">
        {/* 직원 관리 시스템 정보 박스 */}
        <div className="bg-white shadow p-5 w-1/5 flex flex-col">
          <div className="inline-block mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
              👤 직원 관리 시스템
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
            직원 등록
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            새로운 직원의 상세 정보를 입력하여 시스템에 등록할 수 있습니다
          </p>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-4/5 flex flex-col gap-4">
          {/* 직원 정보 입력 헤더 박스 */}
          <div className="bg-white shadow px-6 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">직원 정보 입력</h2>
                <p className="text-sm text-gray-600 mt-1">
                  모든 필수 항목을 입력해주세요
                </p>
              </div>
              <button
                form="employee-form"
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                직원 등록
              </button>
            </div>
          </div>

          <form id="employee-form" onSubmit={userRegister} className="flex gap-4 flex-1">
            {/* 왼쪽 박스: 로그인 정보 + 개인 정보 */}
            <div className="bg-white shadow p-4 flex-1 space-y-4">
              <div className="p-1">
                <h3 className="text-base font-semibold text-gray-900 mb-2">로그인 정보</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">아이디</label>
                    <div className="flex gap-3">
                      <input
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        onBlur={() => {
                          const errorMessage = validateUserId(formData.user_id);
                          user_id_setError(errorMessage);
                        }}
                        readOnly={isAvailable}
                        className="flex-1 border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="아이디를 입력하세요"
                      />
                      <button
                        type="button"
                        onClick={checkId}
                        disabled={isAvailable}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${isAvailable
                          ? "bg-green-500 hover:bg-green-600 text-white cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                      >
                        {isAvailable ? "확인완료" : "중복확인"}
                      </button>
                    </div>
                    {user_id_error && <p className="text-red-500 text-sm mt-2">{user_id_error}</p>}
                    {checkIdState && (
                      <p className={`text-sm mt-2 ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                        {isAvailable ? "사용 가능한 아이디입니다" : "이미 사용중인 아이디입니다"}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">비밀번호</label>
                    <input
                      type="password"
                      name="user_password"
                      value={formData.user_password}
                      onChange={handleChange}
                      onBlur={() => {
                        const errorMessage = validateUserPassword(formData.user_password);
                        user_password_setError(errorMessage);
                      }}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="비밀번호를 입력하세요"
                    />
                    {user_password_error && <p className="text-red-500 text-sm mt-2">{user_password_error}</p>}
                  </div>
                </div>
              </div>

              <div className="p-1">
                <h3 className="text-base font-semibold text-gray-900 mb-2">개인 정보</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">혈액형</label>
                    <select
                      name="user_blood_type"
                      value={formData.user_blood_type}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      {BloodTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">최종학력</label>
                    <select
                      name="user_education"
                      value={formData.user_education}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      {EducationLevels.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">연락처</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        name="phone_1"
                        maxLength={3}
                        value={phoneData.phone_1}
                        onChange={phoneDataChange}
                        className="w-1/3 px-2 py-2 text-sm border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="010"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="text"
                        name="phone_2"
                        maxLength={4}
                        value={phoneData.phone_2}
                        onChange={phoneDataChange}
                        className="w-1/3 px-2 py-2 text-sm border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="1234"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="text"
                        name="phone_3"
                        maxLength={4}
                        value={phoneData.phone_3}
                        onChange={phoneDataChange}
                        className="w-1/3 px-2 py-2 text-sm border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="5678"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">주소</label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.user_postcode}
                          readOnly
                          onClick={() => setShowPostcode(true)}
                          placeholder="우편번호"
                          className="w-2/3 border border-gray-300 rounded-lg px-2 py-2 text-sm cursor-pointer focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPostcode(true)}
                          className="flex-1 p-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors duration-200 hover:shadow-md"
                        >
                          주소 검색
                        </button>
                      </div>
                      <input
                        type="text"
                        value={formData.user_address_basic}
                        readOnly
                        placeholder="기본주소"
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm"
                      />
                      <input
                        type="text"
                        name="user_address_detail"
                        value={formData.user_address_detail}
                        onChange={handleChange}
                        placeholder="상세주소"
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 박스: 기본 정보 + 근무 정보 */}
            <div className="bg-white shadow p-4 flex-1 space-y-4">
              <div className="p-1">
                <h3 className="text-base font-semibold text-gray-900 mb-2">기본 정보</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">이름</label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="이름을 입력해주세요"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">닉네임</label>
                    <input
                      name="user_nickname"
                      value={formData.user_nickname}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="닉네임을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">생년월일</label>
                    <input
                      type="date"
                      name="user_birth_date"
                      value={formData.user_birth_date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">국가</label>
                    <select
                      name="user_country"
                      value={formData.user_country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      {Countries.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-1">
                <h3 className="text-base font-semibold text-gray-900 mb-2">근무 정보</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">직책</label>
                    <input
                      type="text"
                      name="user_position"
                      value={formData.user_position}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="직책을 입력해주세요"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">입사일</label>
                    <input
                      type="date"
                      name="user_hire_date"
                      value={formData.user_hire_date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">부서</label>
                    <select
                      name="user_department"
                      value={formData.user_department}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      {Departments.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">연차수</label>
                    <input
                      type="number"
                      name="user_annual_leave"
                      value={formData.user_annual_leave}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="연차수를 입력해주세요"
                    />
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default EmployeeRegister;
