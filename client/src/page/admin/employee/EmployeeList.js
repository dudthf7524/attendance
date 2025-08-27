import { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { USER_DELETE_REQUEST, USER_LIST_REQUEST } from "../../../reducers/user";
import EmployeeEditModal from "../../modal/EmployeeEditModal";
import { useNavigate } from "react-router-dom";
import EmployeeDetailModal from "../../modal/EmployeeDetailModal";

const EmployeeList = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDetailUser, setSelectedDetailUser] = useState(null);
  const [userName, setUserNmae] = useState(null)

  const { userList } = useSelector((state) => state.user);
  useEffect(() => {
    userListDB();
  }, []);

  const userListDB = async () => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
  };

  console.log(userList)

  // const userList = [
  //   {
  //     auth: {
  //       auth_code: "A1",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A1",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A1",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A1",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A1",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A1",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A1",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A3",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A1",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  //   {
  //     auth: {
  //       auth_code: "A2",
  //       auth_name: "마스터"
  //     },
  //     company_code: 1,
  //     user_code: 1,
  //     user_info: {
  //       user_name: "a",
  //       user_nickname: "boss",
  //       user_position: "대표",
  //       user_hire_date: "2025-07-28"
  //     }
  //   },
  // ];


  const getStatusColor = (auth_code) => {
    switch (auth_code) {
      case "A1":
        return "text-green-600 bg-green-100";
      case "A2":
        return "text-yellow-600 bg-yellow-100";
      case "A3":
        return "text-red-600 bg-red-100";
      default:
        return "";
    }
  };


  const handleEdit = (user) => {
    console.log(user)
    setSelectedUser(user)
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`${user.user_name}님을 삭제하시겠습니까?`)) {

      const data = {
        user_code: user.user_code
      }
      dispatch({
        type: USER_DELETE_REQUEST,
        data: data
      });
    }
  }


  function EmployDetail(user_code, user_name) {
    console.log(user_code, user_name)
    setIsModalOpen(true)
    setSelectedDetailUser(user_code);
    setUserNmae(user_name)
  }

  return (
    <div className="w-full min-w-[700px] overflow-x-auto">

      <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-4">
        <div className="mb-3">
          <div className="inline-block mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              👤 직원 관리 시스템
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
            직원 목록
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            직원 리스트를 확인할 수 있습니다.
          </p>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full text-sm flex flex-col border-b">
            <div className="grid grid-cols-6 border-b text-left font-medium border-t">
              <div className="px-4 py-4">직원명</div>
              <div className="px-4 py-4">닉네임</div>
              <div className="px-4 py-4">입사일</div>
              <div className="px-4 py-4">직책</div>
              <div className="px-4 py-4">권한</div>
              <div className="px-4 py-4 text-blue-700">상세보기</div>
            </div>

            {/* 테이블 바디 */}
            {userList?.map((user, i) => (
              <div
                key={i}
                className="grid grid-cols-6 items-center hover:bg-gray-50 transition"
              >
                <div className="px-4 py-4">
                  {user.user_info.user_name}
                </div>
                <div className="px-4 py-4">
                  {user.user_info.user_nickname}
                </div>
                <div className="px-4 py-4">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {user.user_info.user_hire_date}
                  </span>
                </div>
                <div className="px-4 py-4">
                  {user.user_info.user_position}
                </div>
                <div className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(user.auth.auth_code)}`}>
                    {user.auth.auth_name}
                  </span>
                </div>
                <div className="px-4 py-4">
                  <button
                    onClick={() => EmployDetail(user.user_code, user.user_info.user_name)}
                    className="text-blue-500 hover:text-blue-700"
                    title="상세보기"
                  >
                    <EyeIcon className="w-5 h-5 inline-block" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4">
          <nav className="flex space-x-2 text-sm">
            <button className="px-2 py-1 text-gray-400">&lt;</button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`px-3 py-1 rounded ${n === 1 ? "bg-black text-white" : "text-gray-500 hover:bg-gray-200"}`}
              >
                {n}
              </button>
            ))}
            <button className="px-2 py-1 text-gray-400">&gt;</button>
          </nav>
        </div>
      </div>

      {/* <div className="bg-white flex-1 overflow-y-auto">
          {userList?.map((user, i) => (
            <div
              key={i}
              className="grid grid-cols-7 items-center px-6 py-4 text-sm text-gray-700 border-t border-blue-100 hover:bg-blue-50 transition"
            >
              <span>{i+1}</span>
              <span className="text-gray-800 font-medium">{user.user_info.user_name}</span>
              <span>{user.user_info.user_nickname}</span>
              <span>{user.user_info.user_position}</span>
              <span>{user.user_info.user_hire_date}</span>
              <span>{user.auth.auth_name}</span>
              <span className="text-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-purple-600 hover:text-purple-800"
                  title="수정하기"
                >
                  <PencilSquareIcon className="w-5 h-5 inline-block" />
                </button>
              </span>
              <span className="text-center">
                <button
                  onClick={() => handleDelete(user)}
                  className="text-red-500 hover:text-red-700"
                  title="삭제하기"
                >
                  <TrashIcon className="w-5 h-5 inline-block" />
                </button>
              </span>
              <span className="text-center">
                <button
                  onClick={() => EmployDetail(user.user_code)}
                  className="text-blue-500 hover:text-blue-700"
                  title="상세보기"
                >
                  <EyeIcon className="w-5 h-5 inline-block" />
                </button>
              </span>
            </div>
          ))}
        </div> */}
      {/* 수정 모달 */}
      {/* {isModalOpen && (
        <EmployeeEditModal
          isOpen={isModalOpen}
          userData={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )} */}

      {
        isModalOpen &&
        (
          <EmployeeDetailModal
            user_code={selectedDetailUser}
            user_name={userName}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedDetailUser(null);
            }} />
        )
      }
    </div>
  );
};

export default EmployeeList;
