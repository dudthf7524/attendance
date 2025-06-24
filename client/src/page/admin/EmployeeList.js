import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_LIST_REQUEST } from "../../reducers/user";

const employees = [
  {
    id: 1,
    name: "홍길동",
    department: "개발팀",
    position: "프론트엔드 개발자",
    email: "hong@example.com",
    phone: "010-1234-5678",
  },
  {
    id: 2,
    name: "김민지",
    department: "디자인팀",
    position: "UI/UX 디자이너",
    email: "kim@example.com",
    phone: "010-2345-6789",
  },
  {
    id: 3,
    name: "이철수",
    department: "운영팀",
    position: "운영 매니저",
    email: "lee@example.com",
    phone: "010-3456-7890",
  },
];

const EmployeeList = () => {

  const dispatch = useDispatch();
  const [selected, setSelected] = useState();

  const { userList } = useSelector((state) => state.user);
  useEffect(() => {
    userListDB();
  }, []);

  const userListDB = async () => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
  };

  return (
    <div className="h-[90vh] w-full bg-[#f9fafb] px-4 py-8">
      <div className="mx-auto bg-white border border-blue-200 shadow-sm px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-blue-600">직원 목록</h1>
        <p className="text-sm text-gray-500 mt-1">
          직원 목록과 상세 정보를 확인할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100%-100px)] transition-all duration-500">
        {/* 직원 리스트 */}
        <div className="w-full lg:w-1/3 bg-white border border-blue-300  shadow-sm overflow-hidden flex flex-col">
          {/* <div className="bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 border-b border-blue-200">
            직원 목록
          </div> */}
          <div className="flex-1 overflow-y-auto">
            {userList?.map((user) => (
              <button
                key={user.user_code}
                onClick={() => setSelected(user)}
                className={`w-full text-left px-5 py-4 border-b border-blue-100 hover:bg-blue-50 transition ${selected?.user_code === user.user_code
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-700"
                  }`}
              >
                {user.user_name}
                <div className="text-xs text-gray-400">{user.user_position}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 직원 상세 정보 */}
        <div
          className="w-full lg:w-2/3 bg-white border border-blue-300 shadow-sm p-6 transition-all duration-300 flex flex-col "
        >
          {
            selected ?
              (
                <>
                  <h2 className="text-lg font-bold text-blue-600 border-b border-blue-100 pb-2 mb-4">
                    {selected.user_name} 님의 정보
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm flex-1 overflow-y-auto">
                    <div>
                      <p className="text-blue-400">닉네임</p>
                      <p className="text-gray-800 font-medium">{selected.user_nickname}</p>
                    </div>
                    <div>
                      <p className="text-blue-400">직책</p>
                      <p className="text-gray-800 font-medium">{selected.user_position}</p>
                    </div>
                    <div>
                      <p className="text-blue-400">입사일</p>
                      <p className="text-gray-800 font-medium">{selected.user_hire_date}</p>
                    </div>
                    <div>
                      <p className="text-blue-400">권한</p>
                      <p className="text-gray-800 font-medium">{selected.auth.auth_name}</p>
                    </div>
                  </div>
                </>
              )
              :
              (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-3xl">
                  직원을 선택해주세요.
                </div>
              )
          }

        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
