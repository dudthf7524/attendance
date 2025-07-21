import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// 임시 데이터 (보통 상단에 정의하거나 외부 파일로 관리)
const mockUserList = [
  {
    user_code: "1",
    user_info: {
      user_name: "홍길동",
      user_nickname: "길동이",
      user_position: "매니저",
      user_hire_date: "2023-03-15",
    },
    auth: {
      auth_name: "관리자",
    },
    department: {
      code_name: "개발팀",
    },
    university: {
      code_name: "서울대학교",
    },
    country: {
      code_name: "대한민국",
    },
  },
  {
    user_code: "2",
    user_info: {
      user_name: "김영희",
      user_nickname: "영희",
      user_position: "디자이너",
      user_hire_date: "2022-11-01",
    },
    auth: {
      auth_name: "일반직원",
    },
    department: {
      code_name: "디자인팀",
    },
    university: {
      code_name: "이화여대",
    },
    country: {
      code_name: "대한민국",
    },
  },
];

export default function EmployeeDetail () {
  const { user_code } = useParams();
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const user = mockUserList.find((u) => u.user_code === user_code);
    setUserDetail(user);
  }, [user_code]);

  if (!userDetail) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        직원 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const { user_info, auth, department, university, country } = userDetail;

  return (
    <div className="h-[90vh] w-full  px-4 py-8 min-w-[700px] overflow-x-auto">
      <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          직원 상세 정보
        </h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
          <div>
            <strong className="block text-gray-500">직원명</strong>
            {user_info.user_name}
          </div>
          <div>
            <strong className="block text-gray-500">닉네임</strong>
            {user_info.user_nickname}
          </div>
          <div>
            <strong className="block text-gray-500">직책</strong>
            {user_info.user_position}
          </div>
          <div>
            <strong className="block text-gray-500">입사일</strong>
            {user_info.user_hire_date}
          </div>
          <div>
            <strong className="block text-gray-500">권한</strong>
            {auth.auth_name}
          </div>
          <div>
            <strong className="block text-gray-500">부서</strong>
            {department.code_name}
          </div>
          <div>
            <strong className="block text-gray-500">대학교</strong>
            {university.code_name}
          </div>
          <div>
            <strong className="block text-gray-500">국가</strong>
            {country.code_name}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};


