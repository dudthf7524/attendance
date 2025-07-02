import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../../component/BottomBar";
import {
  PencilSquareIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { USER_DETAIL_REQUEST } from "../../reducers/user";

const MyPage = () => {
  const dispatch = useDispatch();

  const myInfo = {
    name: "홍길동",
    department: "개발팀",
    position: "프론트엔드 개발자",
    email: "hong@example.com",
    phone: "010-1234-5678",
    joinedDate: "2022-03-01",
    status: "재직 중",
    profileImage: "https://via.placeholder.com/100", // 임시 이미지
  };

  const { userDetail } = useSelector((state) => state.user);
  useEffect(() => {
    userDetailDB();
  }, [])
  const userDetailDB = () => {
    dispatch({
      type: USER_DETAIL_REQUEST
    })
  }

  if (userDetail) {
    console.log("내정보", userDetail)
  }

  return (
    <div className="h-[90vh] bg-white flex flex-col items-center justify-center">
      {/* 메인 콘텐츠 */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10">
        {/* 프로필 정보 */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-xl font-bold mt-4 mb-5">{userDetail?.user_name}</h2>
          <p className="text-sm text-gray-500">
            {userDetail?.user_position}
          </p>
        </div>

        {/* 사용자 정보 */}
        <div className="bg-white-50 border border-gray-200 rounded-lg p-6 space-y-10 shadow-sm">
          <InfoRow label="닉네임" value={userDetail?.user_nickname} />
          <InfoRow label="입사일" value={formatDate(userDetail?.user_hire_date)} />
        </div>

        {/* 기능 버튼 */}
        {/* <div className="mt-10 space-y-5">
          <ActionButton
            icon={<PencilSquareIcon className="w-5 h-5 text-blue-500" />}
            label="정보 수정"
            onClick={() => console.log("정보 수정")}
          />
          <ActionButton
            icon={<KeyIcon className="w-5 h-5 text-yellow-500" />}
            label="비밀번호 변경"
            onClick={() => console.log("비밀번호 변경")}
          />
          <ActionButton
            icon={
              <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-500" />
            }
            label="로그아웃"
            onClick={() => console.log("로그아웃")}
          />
        </div> */}
      </main>

      <BottomBar />
    </div>
  );
};

// 사용자 정보 row
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value}</p>
  </div>
);

// 액션 버튼 컴포넌트
const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
  >
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </div>
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

// 날짜 포맷
const formatDate = (dateString) => {
  if(!dateString){
    return "";
  }
  const [y, m, d] = dateString.split("-");
  return `${y}년 ${m}월 ${d}일`;
};

export default MyPage;
