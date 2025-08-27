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
    <div className="w-full min-w-[700px] overflow-x-auto">
      <div className="bg-white rounded-xl shadow p-5 flex flex-col">
        <div className="mb-3">
          <div className="inline-block mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-900">직원 정보 입력</h2>
              <p className="text-sm text-gray-600 mt-1">
                모든 필수 항목을 입력해주세요
              </p>
            </div>
            <button
              form="employee-form"
              type="submit"
              className="px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              직원 등록
            </button>
          </div>
          <form id="employee-form" onSubmit={userRegister} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">로그인 정보</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">아이디</label>
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
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="아이디를 입력하세요"
                        />
                        <button
                          type="button"
                          onClick={checkId}
                          disabled={isAvailable}
                          className={`px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 ${isAvailable
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                      <input
                        type="password"
                        name="user_password"
                        value={formData.user_password}
                        onChange={handleChange}
                        onBlur={() => {
                          const errorMessage = validateUserPassword(formData.user_password);
                          user_password_setError(errorMessage);
                        }}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="비밀번호를 입력하세요"
                      />
                      {user_password_error && <p className="text-red-500 text-sm mt-2">{user_password_error}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="이름을 입력해주세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
                      <input
                        name="user_nickname"
                        value={formData.user_nickname}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="닉네임을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                      <input
                        type="date"
                        name="user_birth_date"
                        value={formData.user_birth_date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">국가</label>
                      <select
                        name="user_country"
                        value={formData.user_country}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        {Countries.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">근무 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">직책</label>
                      <input
                        type="text"
                        name="user_position"
                        value={formData.user_position}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="직책을 입력해주세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">입사일</label>
                      <input
                        type="date"
                        name="user_hire_date"
                        value={formData.user_hire_date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">부서</label>
                      <select
                        name="user_department"
                        value={formData.user_department}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        {Departments.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">연차수</label>
                      <input
                        type="number"
                        name="user_annual_leave"
                        value={formData.user_annual_leave}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="연차수를 입력해주세요"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">개인 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">혈액형</label>
                      <select
                        name="user_blood_type"
                        value={formData.user_blood_type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        {BloodTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">최종학력</label>
                      <select
                        name="user_education"
                        value={formData.user_education}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        {EducationLevels.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        name="phone_1"
                        maxLength={3}
                        value={phoneData.phone_1}
                        onChange={phoneDataChange}
                        className="w-1/3 px-3 py-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="010"
                      />
                      <span className="text-gray-500 text-lg">-</span>
                      <input
                        type="text"
                        name="phone_2"
                        maxLength={4}
                        value={phoneData.phone_2}
                        onChange={phoneDataChange}
                        className="w-1/3 px-3 py-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="1234"
                      />
                      <span className="text-gray-500 text-lg">-</span>
                      <input
                        type="text"
                        name="phone_3"
                        maxLength={4}
                        value={phoneData.phone_3}
                        onChange={phoneDataChange}
                        className="w-1/3 px-3 py-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="5678"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={formData.user_postcode}
                          readOnly
                          onClick={() => setShowPostcode(true)}
                          placeholder="우편번호 찾기 클릭"
                          className="w-1/3 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer bg-gray-50 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPostcode(true)}
                          className="flex-1 px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          주소 검색
                        </button>
                      </div>
                      <input
                        type="text"
                        value={formData.user_address_basic}
                        readOnly
                        placeholder="기본주소"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                      />
                      <input
                        type="text"
                        name="user_address_detail"
                        value={formData.user_address_detail}
                        onChange={handleChange}
                        placeholder="상세주소 입력 (예: 101호)"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showPostcode && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                onClick={closeModal}
              >
                <div
                  className="bg-white p-6 rounded-2xl shadow-2xl relative w-[600px] h-[500px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">주소 검색</h3>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all duration-200"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;
