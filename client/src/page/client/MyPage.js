import React from "react";
import BottomBar from "../../component/BottomBar";

const MyPage = () => {
  const myInfo = {
    name: "홍길동",
    department: "개발팀",
    position: "프론트엔드 개발자",
    email: "hong@example.com",
    phone: "010-1234-5678",
    joinedDate: "2022-03-01",
    status: "재직 중",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10 space-y-10">
      {/* 타이틀 */}
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-2xl font-bold text-blue-600">내 정보</h1>
        <p className="text-sm text-gray-500 mt-1">근로자의 개인 정보를 확인할 수 있습니다.</p>
      </div>

      {/* 정보 카드 */}
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-md p-6 space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500">이름</p>
            <p className="text-base font-medium text-gray-800">{myInfo.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">부서</p>
            <p className="text-base font-medium text-gray-800">{myInfo.department}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">직책</p>
            <p className="text-base font-medium text-gray-800">{myInfo.position}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">입사일</p>
            <p className="text-base font-medium text-gray-800">{myInfo.joinedDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">이메일</p>
            <p className="text-base font-medium text-gray-800">{myInfo.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">전화번호</p>
            <p className="text-base font-medium text-gray-800">{myInfo.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">재직 상태</p>
            <p className="text-base font-medium text-green-600">{myInfo.status}</p>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default MyPage;
