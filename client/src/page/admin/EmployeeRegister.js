import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_CHECK_ID_REQUEST, USER_REGISTER_REQUEST } from "../../reducers/user";
import { Countries } from "../../constant/Countries";
import { Departments } from "../../constant/Departments";
import { BloodTypes } from "../../constant/BloodTypes";
import { EducationLevels } from "../../constant/EducationLevels";
import DaumPostcode from 'react-daum-postcode';
import { validateUserId } from "../../hooks/validate/EmployeeRegister";

const EmployeeRegister = () => {
  const dispatch = useDispatch();
  const [checkIdState, setCheckIdState] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState(null);

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

    // dispatch({
    //   type: USER_REGISTER_REQUEST,
    //   data: data
    // });
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
  // const validateUserId = (userId) => {
  //   const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  //   return regex.test(userId);
  // };

  // 예시 사용
  // if (!validateUserId(formData.user_id)) {
  //   alert("아이디는 8~15자의 영문자와 숫자를 조합해야 합니다.");
  //   return;
  // }
  const closeModal = () => setShowPostcode(false);

  return (
    <div className="w-full min-w-[1000px] overflow-x-auto">
      <main className="flex-1">
        <div className="bg-white rounded-xl s hadow p-5 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">직원등록</h2>
              <p className="text-sm text-gray-400 mt-1">
                직원 리스트를 확인할 수 있습니다.
              </p>
            </div>
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font bold rounded ">등록</button>
            </div>
          </div>
          <form onSubmit={userRegister} className="w-full text-sm">
            <table className="w-full table-fixed border-t border-gray-300">
              <tbody>
                <tr>
                  <th className="border-b border-r w-40 bg-gray-50 text-center">아이디</th>
                  <th className="border-b px-4 py-2">
                    <div className="flex gap-2">
                      <input
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        readOnly={isAvailable}
                        className="w-2/3 border px-3 py-2 rounded"
                        placeholder="아이디를 입력하세요"
                      />
                      <button
                        type="button"
                        onClick={checkId}
                        disabled={isAvailable}
                        className={`w-1/3 px-4 py-2 text-white bg-blue-600 font-bold hover:bg-blue-500 rounded ${isAvailable ? "bg-gray-400" : ""}`}
                      >
                        중복 확인
                      </button>
                    </div>
                  </th>
                  <th className="border-b border-l w-40 bg-gray-50 text-center">생년월일</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <input
                        type="date"
                        name="user_birth_date"
                        value={formData.user_birth_date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-3"
                      />
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r w-40 bg-gray-50 text-center">비밀번호</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <input
                        name="user_password"
                        value={formData.user_password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="비밀번호를 입력하세요"
                      />
                    </div>
                  </th>
                  <th className="border-b border-l w-40 bg-gray-50 text-center">입사일</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <input
                        type="date"
                        name="user_hire_date"
                        value={formData.user_hire_date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-3"
                      />
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r w-40 bg-gray-50 text-center">이름</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-3"
                        placeholder="이름을 입력해주세요"
                      />
                    </div>
                  </th>
                  <th className="border-b border-l w-40 bg-gray-50 text-center">국가</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <select
                        name="user_country"
                        value={formData.user_country}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border rounded-md bg-white"
                      >
                        {Countries.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r w-40 bg-gray-50 text-center">닉네임</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <input
                        name="user_password"
                        value={formData.user_password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="비밀번호를 입력하세요"
                      />
                    </div>
                  </th>
                  <th className="border-b border-l w-40 bg-gray-50 text-center">부서</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <select
                        name="user_department"
                        value={formData.user_department}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border rounded-md bg-white"
                      >
                        {Departments.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r w-40 bg-gray-50 text-center">직책</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <input
                        type="text"
                        name="user_position"
                        value={formData.user_position}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-3"
                        placeholder="직책을 입력해주세요"
                      />
                    </div>
                  </th>
                  <th className="border-b border-l w-40 bg-gray-50 text-center">혈액형</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <select
                        name="user_blood_type"
                        value={formData.user_blood_type}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border rounded-md bg-white"
                      >
                        {BloodTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r w-40 bg-gray-50 text-center">연차수</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <input
                        type="number"
                        name="user_annual_leave"
                        value={formData.user_annual_leave}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-3"
                        placeholder="연차수를 입력해주세요"
                      />
                    </div>
                  </th>
                  <th className="border-b border-l w-40 bg-gray-50 text-center">최종학력</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <select
                        name="user_education"
                        value={formData.user_education}
                        onChange={handleChange}
                        className="w-full px-3 py-3 border rounded-md bg-white"
                      >
                        {EducationLevels.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-r w-40 bg-gray-50 text-center">연락처</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">

                      <div className="flex gap-2 w-full items-center justify-between">
                        <input
                          type="text"
                          name="phone_1"
                          maxLength={3}
                          value={phoneData.phone_1}
                          onChange={phoneDataChange}
                          className="w-1/3 px-3 py-3 border rounded-md text-center"
                          placeholder="010"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="text"
                          name="phone_2"
                          maxLength={4}
                          value={phoneData.phone_2}
                          onChange={phoneDataChange}
                          className="w-1/3 px-3 py-3 border rounded-md text-center"
                          placeholder="1234"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="text"
                          name="phone_3"
                          maxLength={4}
                          value={phoneData.phone_3}
                          onChange={phoneDataChange}
                          className="w-1/3 px-3 py-3 border rounded-md text-center"
                          placeholder="5678"
                        />
                      </div>
                    </div>
                  </th>
                  <th className="border-b border-l w-40 bg-gray-50 text-center">우편번호</th>
                  <th className="border-b">
                    <div className="flex-1 px-4 py-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.user_postcode}
                          readOnly
                          onClick={() => setShowPostcode(true)}
                          placeholder="우편번호 찾기 클릭"
                          className="w-2/3 border border-gray-300 rounded-md px-3 py-3 cursor-pointer bg-gray-50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPostcode(true)}
                          className={"w-1/3 px-4 py-2 bg-blue-600 font-bold text-white hover:bg-blue-500 rounded"}

                        >
                          주소 검색
                        </button>
                      </div>
                      <div className="flex mt-2 mb-2">
                        <input
                          type="text"
                          value={formData.user_address_basic}
                          readOnly
                          placeholder="기본주소"
                          className="w-full border border-gray-300 rounded-md px-3 py-3"
                        />
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          name="user_address_detail"
                          value={formData.user_address_detail}
                          onChange={handleChange}
                          placeholder="상세주소 입력 (예: 101호)"
                          className="w-full border border-gray-300 rounded-md px-3 py-3"
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-col border-t border-b border-gray-200 rounded overflow-hidden">
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

            {/* 버튼 */}

          </form>
        </div>
      </main >
    </div>
  );
};

export default EmployeeRegister;
