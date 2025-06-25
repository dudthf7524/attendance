import { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { USER_DELETE_REQUEST, USER_LIST_REQUEST } from "../../reducers/user";
import EmployeeEditModal from "../modal/EmployeeEditModal";

const TimeList = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { userList } = useSelector((state) => state.user);
  useEffect(() => {
    userListDB();
  }, []);

  const userListDB = async () => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
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
  return (
    <div className="h-[90vh] w-full bg-[#f9fafb] px-4 py-8 min-w-[700px] overflow-x-auto">
      {/* 상단 헤더 */}
      <div className="bg-white border border-blue-200 shadow-sm px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-blue-600">직원 목록</h1>
        <p className="text-sm text-gray-500 mt-1">
          직원별로 등록된 출퇴근 및 휴게 시간 정보를 확인할 수 있습니다.
        </p>
      </div>

      {/* 시간 기록 카드 */}
      <div className="bg-white border border-blue-300 overflow-hidden shadow-sm w-full h-[calc(100%-100px)] flex flex-col">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-7 bg-blue-50 text-blue-600 text-xs font-semibold px-6 py-3 tracking-wide border-b border-blue-100">
          {/* <span>NO</span> */}
          <span>직원명</span>
          <span>닉네임</span>
          <span>직책</span>
          <span>입사일</span>
          <span>권한</span>
          <span className="text-center text-purple-600">수정</span>
          <span className="text-center text-red-600">삭제</span>
        </div>

        {/* 목록 */}
        <div className="flex-1 overflow-y-auto">
          {userList?.map((user, i) => (
            <div
              key={i}
              className="grid grid-cols-7 items-center px-6 py-4 text-sm text-gray-700 border-t border-blue-100 hover:bg-blue-50 transition"
            >
              {/* <span>{i+1}</span> */}
              <span className="text-gray-800 font-medium">{user.user_name}</span>
              <span>{user.user_nickname}</span>
              <span>{user.user_position}</span>
              <span>{user.user_hire_date}</span>
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
            </div>
          ))}
        </div>
      </div>

      {/* 수정 모달 */}
      {isModalOpen && (
        <EmployeeEditModal
          isOpen={isModalOpen}
          userData={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TimeList;
