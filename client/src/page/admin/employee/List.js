import { useState, useEffect } from "react";
import { CalendarDaysIcon, UserIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { USER_DELETE_REQUEST, USER_LIST_REQUEST, USER_EDIT_REQUEST, USER_VIEW_REQUEST } from "../../../reducers/user";
import { useNavigate } from "react-router-dom";
import View from "./View";

const EmployeeList = () => {
  const dispatch = useDispatch();

  const [selectedDetailUser, setSelectedDetailUser] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 아이템 수

  const { userList, userView, userViewLoading } = useSelector((state) => state.user);
  useEffect(() => {
    userListDB();
  }, []);

  const userListDB = async () => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
  };

  // 테스트용 더미 데이터 (실제로는 API에서 가져올 데이터)
  // const userList = Array.from({ length: 50 }, (_, index) => ({
  //   auth: {
  //     auth_code: index < 10 ? "A1" : index < 30 ? "A2" : "A3",
  //     auth_name: index < 10 ? "마스터" : index < 30 ? "관리자" : "사원"
  //   },
  //   company_code: "1",
  //   user_code: `${index + 1}`,
  //   user_info: {
  //     user_hire_date: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  //     user_name: `직원${index + 1}`,
  //     user_nickname: `employee${index + 1}`,
  //     user_position: index < 10 ? "마스터" : index < 30 ? "팀장" : "사원"
  //   },
  // }));

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userList?.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setShowDetailView(false); // 페이지 변경시 상세보기 닫기
    setSelectedDetailUser(null);
  };

  // 페이지네이션 버튼 생성
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
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
      <div className="p-5 flex flex-col lg:flex-row flex-1 gap-6">
        <div className="bg-white p-4 w-full lg:w-1/4 flex flex-col min-w-0 border border-gray-200">
          {/* 직원 목록 헤더 */}
          {/* <div className="mb-6 pb-4 border-b-2 border-gradient-to-r from-blue-200 to-indigo-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 ">
                <UserGroupIcon className="w-5 h-5 text-blue-500" />
              </div>
              직원 목록
            </h2>
            <p className="text-sm text-gray-600 mt-2 ml-11">직원을 선택하여 상세 정보 확인</p>
          </div> */}

          <div className="flex-1 overflow-y-auto">
            <div className="overflow-x-auto">
              <div className="min-w-full text-sm flex flex-col overflow-hidden border border-gray-200">
                <div className="grid grid-cols-2 font-bold text-gray-800 border-b-2 border-blue-200">
                  <div className="p-4 flex items-center">
                    <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-600" />
                    입사일
                  </div>
                  <div className="p-4 flex items-center">
                    <UserIcon className="w-4 h-4 mr-2 text-blue-600" />
                    직원명
                  </div>
                </div>
                {currentItems?.map((user, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 items-center border-b border-gray-100 transition-all duration-200 cursor-pointer ${selectedDetailUser?.user_code === user.user_code
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white transform'
                      : 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md hover:transform'
                      }`}
                    onClick={() => handleEmployeeDetail(user)}
                  >
                    <div className={`px-4 py-4 font-medium ${selectedDetailUser?.user_code === user.user_code ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                      {user.user_info.user_hire_date}
                    </div>
                    <div className={`px-4 py-4 font-semibold ${selectedDetailUser?.user_code === user.user_code ? 'text-white' : 'text-gray-800'
                      }`}>
                      {user.user_info.user_name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <nav className="flex space-x-1 text-sm items-center bg-gray-50 p-2 border border-gray-200-sm">
              {/* 이전 페이지 버튼 */}
              <button
                className={`px-3 py-2 font-medium transition-all duration-200 ${currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-white hover:shadow-md hover:text-blue-600 transform hover:-translate-y-0.5'
                  }`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </button>

              {/* 페이지 번호들 */}
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`px-3 py-2 font-medium transition-all duration-200 transform ${pageNumber === currentPage
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110 z-10"
                    : "text-gray-600 hover:bg-white hover:shadow-md hover:text-blue-600 hover:-translate-y-0.5"
                    }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              {/* 다음 페이지 버튼 */}
              <button
                className={`px-3 py-2 font-medium transition-all duration-200 ${currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-white hover:shadow-md hover:text-blue-600 transform hover:-translate-y-0.5'
                  }`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </nav>
          </div>

          {/* 페이지 정보 표시 */}
          <div className="flex justify-center mt-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 border border-blue-200">
              <span className="text-sm font-medium text-blue-800">
                {userList?.length}명 중 {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, userList?.length)}명 표시
              </span>
            </div>
          </div>
        </div>
        {/* 직원 리스트 박스 */}
        {!showDetailView ?
          (
            <div className="bg-white p-8 w-full lg:w-3/4 flex flex-col flex-shrink-0 border border-gray-200">
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="mt-8 flex items-center space-x-2 text-gray-400 mb-10">
                  <div className="w-2 h-2 bg-blue-300 animate-pulse"></div>
                  <div className="w-2 h-2 bg-indigo-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-purple-300 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-base text-center text-gray-600 leading-relaxed">
                  직원을 <span className="text-blue-600 font-semibold bg-blue-50 px-2 py-1">클릭</span>하여
                  상세 정보를 확인하세요.
                </p>
              </div>

            </div>
          )
          :
          (
            /* 상세보기 모드 */
            <View
              selectedUser={selectedDetailUser}
              detailedUserData={userView}
              isLoading={userViewLoading}
            />
          )
        }
      </div>
    </div >
  );
};

export default EmployeeList;
