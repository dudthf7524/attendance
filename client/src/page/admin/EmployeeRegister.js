import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_CHECK_ID_REQUEST, USER_REGISTER_REQUEST } from "../../reducers/user";
import { Countries } from "../../constant/Countries";
import { Departments } from "../../constant/Departments";
import { BloodTypes } from "../../constant/BloodTypes";
import { EducationLevels } from "../../constant/EducationLevels";
import DaumPostcode from 'react-daum-postcode';

const EmployeeRegister = () => {
  const dispatch = useDispatch();

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

  const userRegister = (e) => {
    e.preventDefault();

    const phone = phoneData.phone_1+"-"+phoneData.phone_2+"-"+phoneData.phone_3;
    formData.user_phone = phone;

    const data = formData;


    console.log(data)

    // dispatch({
    //   type: USER_REGISTER_REQUEST,
    //   data: data
    // });
  }

  const [checkIdState, setCheckIdState] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);


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

  const [postalCode, setPostalCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);

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
    <div className="h-full w-full flex flex-col px-4 py-8">
      {/* 헤더 */}
      <div className="bg-white border border-blue-200  shadow-sm px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-blue-600">직원 등록</h1>
        <p className="text-sm text-gray-500 mt-1">신규 직원을 등록합니다.</p>
      </div>

      {/* 폼 영역 */}
      <form
        onSubmit={userRegister}
        className="flex-1 bg-white border border-blue-300  shadow-md p-8 w-full "
      >
        <div className="space-y-5 text-sm w-full mx-auto ">

          {/* 아이디 + 중복확인 */}
          <div className="w-full">
            <label className="block font-medium mb-1">아이디</label>
            <div className="flex w-full gap-2">
              <input
                type="text"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
                required
                placeholder="아이디를 입력해주세요"
              />
              <button
                type="button"
                onClick={checkId}
                className="w-1/2 px-4 py-2 bg-white border-2 border-blue-400 text-blue-400 font-semibold rounded-md 
               hover:bg-blue-50 active:scale-95
               active:ring-2 active:ring-blue-400 active:ring-offset-2
               transition duration-150"
              >
                중복확인
              </button>
            </div>
          </div>
          {checkIdState ? (
            <p className={`mt-2 text-sm ${isAvailable ? "text-green-500" : "text-red-500"}`}>
              {isAvailable ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다."}
            </p>
          ) : (<></>)
          }

          <div className="w-full">
            <label className="block font-medium mb-1">비밀번호</label>
            <input
              type="password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              placeholder="비밀번호를 입력해주세요"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mb-1">비밀번호 확인</label>
            <input
              type="password"
              name="user_password_check"
              value={formData.user_password_check}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              placeholder="비밀번호 확인을 입력해주세요"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mb-1">이름</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="이름을 입력해주세요"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mb-1">닉네임</label>
            <input
              type="text"
              name="user_nickname"
              value={formData.user_nickname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="닉네임을 입력해주세요"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mb-1">직책</label>
            <input
              type="text"
              name="user_position"
              value={formData.user_position}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="직책을 입력해주세요"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mb-1">입사일</label>
            <input
              type="date"
              name="user_hire_date"
              value={formData.user_hire_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mb-1">생년월일</label>
            <input
              type="date"
              name="user_birth_date"
              value={formData.user_birth_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="w-full">
            <label className="block font-medium mb-1">연차수</label>
            <input
              type="text"
              name="user_annual_leave"
              value={formData.user_annual_leave}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="연차수를 입력해주세요"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">국가</label>
            <select
              name="user_country"
              value={formData.user_country}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              {Countries.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">부서</label>
            <select
              name="user_department"
              value={formData.user_department}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              {Departments.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">혈액형</label>
            <select
              name="user_blood_type"
              value={formData.user_blood_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              {BloodTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">최종학력</label>
            <select
              name="user_education"
              value={formData.user_education}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white"
            >
              {EducationLevels.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              연락처
            </label>
            <div className="flex gap-2 w-full items-center justify-between">
              <input
                type="text"
                name="phone_1"
                maxLength={3}
                value={phoneData.phone_1}
                onChange={phoneDataChange}
                className="w-1/3 px-3 py-2 border rounded-md text-center"
                placeholder="010"
              />
              <span className="text-gray-500">-</span>
              <input
                type="text"
                name="phone_2"
                maxLength={4}
                value={phoneData.phone_2}
                onChange={phoneDataChange}
                className="w-1/3 px-3 py-2 border rounded-md text-center"
                placeholder="1234"
              />
              <span className="text-gray-500">-</span>
              <input
                type="text"
                name="phone_3"
                maxLength={4}
                value={phoneData.phone_3}
                onChange={phoneDataChange}
                className="w-1/3 px-3 py-2 border rounded-md text-center"
                placeholder="5678"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">우편번호</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.user_postcode}
                  readOnly
                  onClick={() => setShowPostcode(true)}
                  placeholder="우편번호 찾기 클릭"
                  className="w-1/2 border border-gray-300 rounded-md px-3 py-2 cursor-pointer bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPostcode(true)}
                  className="w-1/2 px-4 py-2 bg-white border-2 border-blue-400 text-blue-400 font-semibold rounded-md 
               hover:bg-blue-50 active:scale-95
               active:ring-2 active:ring-blue-400 active:ring-offset-2
               transition duration-150"
                >
                  주소 검색
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">기본주소</label>
              <input
                type="text"
                value={formData.user_address_basic}
                readOnly
                onClick={() => setShowPostcode(true)}
                placeholder="주소 찾기 클릭"
                className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">상세주소</label>
              <input
                type="text"
                name="user_address_detail"
                value={formData.user_address_detail}
                onChange={handleChange}
                placeholder="상세주소 입력 (예: 101호)"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {showPostcode && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                onClick={closeModal}
              >
                <div
                  className="bg-white p-3 rounded shadow-lg relative w-[600px] h-[500px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={closeModal}
                  >
                  </button>
                  <DaumPostcode onComplete={handleComplete} style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            )}
          </div>

        </div>




        <div className="w-full mt-10 text-right mx-auto">
          <button
            type="submit"
            className="w-full bg-white border-2 border-blue-400 text-blue-400 font-semibold 
               hover:bg-blue-50 active:scale-95
               active:ring-2 active:ring-blue-400 active:ring-offset-2
               transition duration-150 px-8 py-2 rounded-md transition"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegister;
