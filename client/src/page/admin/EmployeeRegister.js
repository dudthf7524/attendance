import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_CHECK_ID_REQUEST, USER_REGISTER_REQUEST } from "../../reducers/user";

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const userRegister = () => {

    const data = formData;

    dispatch({
      type: USER_REGISTER_REQUEST,
      data: data
    });
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

  return (
    <div className="h-screen w-full bg-[#f9fafb] flex flex-col px-4 py-8">
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
            <label className="text-blue-400 mb-1 block">아이디</label>
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
            <label className="text-blue-400 mb-1 block">비밀번호</label>
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
            <label className="text-blue-400 mb-1 block">비밀번호 확인</label>
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
            <label className="text-blue-400 mb-1 block">이름</label>
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
            <label className="text-blue-400 mb-1 block">닉네임</label>
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
            <label className="text-blue-400 mb-1 block">직책</label>
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
            <label className="text-blue-400 mb-1 block">입사일</label>
            <input
              type="date"
              name="user_hire_date"
              value={formData.user_hire_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
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
