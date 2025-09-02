import { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon, EyeIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { USER_DELETE_REQUEST, USER_LIST_REQUEST, USER_EDIT_REQUEST, USER_VIEW_REQUEST } from "../../../reducers/user";
import { useNavigate } from "react-router-dom";
import View from "./View";
import EditInline from "./EditInline";

const EmployeeList = () => {
  const dispatch = useDispatch();

  const [selectedDetailUser, setSelectedDetailUser] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { userList, userView, userViewLoading } = useSelector((state) => state.user);
  useEffect(() => {
    userListDB();
  }, []);

  const userListDB = async () => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
  };

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


  const handleDelete = (user) => {
    if (window.confirm(`${user.user_info.user_name}님을 삭제하시겠습니까?`)) {
      const data = {
        user_code: user.user_code
      }
      dispatch({
        type: USER_DELETE_REQUEST,
        data: data
      });
    }
  }


  const navigate = useNavigate();

  const handleTimeSettingClick = (user) => {
    navigate('/admin/time/setting', {
      state: {
        user_code: user.user_code,
        user_name: user.user_info.user_name
      }
    });
  };


  function handleEmployeeDetail(user) {
    // 개별 직원 상세 데이터 요청
    dispatch({
      type: USER_VIEW_REQUEST,
      data: user.user_code
    });
    setSelectedDetailUser(user); // 기본 정보는 리스트에서
    setShowDetailView(true);
  }

  function handleCloseDetail() {
    setSelectedDetailUser(null);
    setShowDetailView(false);
    setIsEditMode(false);
  }

  function handleEditEmployee(user) {
    // 수정할 때도 최신 데이터 요청
    dispatch({
      type: USER_VIEW_REQUEST,
      data: user.user_code
    });
    setSelectedDetailUser(user);
    setShowDetailView(true);
    setIsEditMode(true);
  }

  function handleSaveEmployee(updatedData) {
    console.log("수정된 직원 데이터:", updatedData);
    dispatch({
      type: USER_EDIT_REQUEST,
      data: updatedData
    });
    setIsEditMode(false);

    // 목록 새로고침
    dispatch({
      type: USER_LIST_REQUEST,
    });
  }

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">

      <div className="p-5 flex flex-col md:flex-row flex-1 gap-4">
        {/* 직원 관리 시스템 정보 박스 */}
        {/* <div className="bg-white shadow p-5 w-full lg:w-1/5 flex flex-col">
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
        </div> */}

        {/* 직원 리스트 박스 */}
        <div className="bg-white shadow p-5 w-full md:w-1/5 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto">
            <div className="overflow-x-auto">
              <div className="min-w-full text-sm flex flex-col border-b">
                <div className="grid grid-cols-2 border-b text-left font-medium border-t">
                  {/* <div className="px-4 py-4">NO</div> */}

                  <div className="px-4 py-4">직원명</div>
                  {/* <div className="px-4 py-4">닉네임</div> */}
                  <div className="px-4 py-4">입사일</div>
                  {/* <div className="px-4 py-4">직책</div>
                  <div className="px-4 py-4">권한</div>
                  <div className="px-4 py-4 text-purple-700">시간설정</div>
                  <div className="px-4 py-4 text-blue-700">상세보기</div> */}
                </div>

                {/* 테이블 바디 */}
                {userList?.map((user, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 items-center hover:bg-gray-50 transition cursor-pointer ${selectedDetailUser?.user_code === user.user_code ? 'bg-gray-50' : ''
                      }`}
                    onClick={() => handleEmployeeDetail(user)}
                  >

                    <div className="px-4 py-4">
                      {user.user_info.user_name}
                    </div>
                    <div className="px-4 py-4">
                      {user.user_info.user_hire_date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 페이지네이션 */}
            {/* <div className="flex justify-center mt-4">
            <nav className="flex space-x-2 text-sm">
              <button className="px-2 py-1 text-gray-400">&lt;</button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`px-3 py-1 rounded ${n === 1 ? "bg-gray-200" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  {n}
                </button>
              ))}
              <button className="px-2 py-1 text-gray-400">&gt;</button>
            </nav>
          </div> */}
          </div>
        </div>


        {/* 직원 상세 정보 박스 */}
        <div className="bg-white shadow p-5 w-full md:w-4/5 flex flex-col min-w-0">
          {!showDetailView ? (
            /* 기본 상태 - 안내 메시지 */
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <EyeIcon className="w-16 h-16 mb-4 text-gray-300" />
              <h2 className="text-xl font-medium text-gray-400 mb-2">직원 상세 정보</h2>
              <p className="text-sm text-center">
                왼쪽 목록에서 직원을 <span className="text-blue-500 font-medium">클릭</span>하여<br />
                상세 정보를 확인하세요.
              </p>
            </div>
          ) : isEditMode ? (
            /* 수정 모드 */
            <EditInline
              selectedUser={selectedDetailUser}
              detailedUserData={userView}
              isLoading={userViewLoading}
              onClose={handleCloseDetail}
              onSave={handleSaveEmployee}
            />
          ) : (
            /* 상세보기 모드 */
            <View
              selectedUser={selectedDetailUser}
              detailedUserData={userView}
              isLoading={userViewLoading}
              onClose={handleCloseDetail}
              onEdit={handleEditEmployee}
              onDelete={handleDelete}
              getStatusColor={getStatusColor}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
