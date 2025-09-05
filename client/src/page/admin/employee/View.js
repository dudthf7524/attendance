import { useNavigate } from "react-router-dom";
import { UserIcon, PhoneIcon, MapPinIcon, CalendarDaysIcon, BuildingOfficeIcon, AcademicCapIcon, HeartIcon, GlobeAsiaAustraliaIcon, BriefcaseIcon, ClockIcon } from "@heroicons/react/24/outline";

const View = ({ selectedUser, detailedUserData, isLoading }) => {
  const navigate = useNavigate();

  if (!selectedUser) {
    return null;
  }
  console.log(detailedUserData)


  function handleEdit() {
    navigate("/admin/employee/edit", {
      state: detailedUserData, // <- 여기에 객체를 담아서 보냄
    });
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center py-12 bg-white w-full lg:w-3/4 flex-shrink-0">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">상세 정보를 불러오는 중...</p>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-6 flex-shrink-0">
          <div className="bg-white  p-7 w-full lg:w-1/3 flex flex-col min-w-0 border border-gray-200">
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-blue-500" />
                    기본정보
                  </h3>
                  <div className="p-7">
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">닉네임</p>
                      <p className="text-gray-800 font-medium">
                        {detailedUserData?.user_nickname}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">생년월일</p>
                      <p className="text-gray-800 font-medium">
                        {detailedUserData?.education_level?.education_level_name}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">국적</p>
                      <p className="text-gray-800 font-medium">
                        {detailedUserData?.country?.country_name}
                      </p>
                    </div>

                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <BriefcaseIcon className="w-5 h-5 mr-2 text-green-600" />
                    근무정보
                  </h3>
                  <div className="p-7">

                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">직책</p>
                      <p className="text-gray-800 font-medium">
                        {detailedUserData?.user_position}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">닉네임</p>
                      <p className="text-gray-800 font-medium">
                        {detailedUserData?.user_nickname}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">연차수</p>
                      <p className="text-gray-800 font-medium">
                        {detailedUserData?.user_annual_leave}일
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white  p-7 w-full lg:w-1/3 flex flex-col min-w-0 border border-gray-200">
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                {/* 개인 정보 섹션 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <HeartIcon className="w-5 h-5 mr-2 text-red-500" />
                    개인정보
                  </h3>
                  <div className="p-7">
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">혈액형</p>
                      <p className="text-gray-800 font-medium">{detailedUserData?.user_blood_type}형</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">학력</p>
                      <p className="text-gray-800 font-medium">{detailedUserData?.education_level?.education_level_name}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">전화번호</p>
                      <p className="text-gray-800 font-medium">
                        {detailedUserData?.user_phone}
                      </p>
                    </div>
                  </div>
                </div>
                {/* 주소 정보 섹션 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-orange-500" />
                    주소
                  </h3>
                  <div className="p-7">
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">우편번호</p>
                      <p className="text-gray-800 font-medium">{detailedUserData?.user_postcode || '미등록'}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">기본 주소</p>
                      <p className="text-gray-800 font-medium">{detailedUserData?.user_address_basic || '미등록'}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-gray-600 text-xs mb-2">상세 주소</p>
                      <p className="text-gray-800 font-medium">{detailedUserData?.user_address_detail || '미등록'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 transition-all duration-200 shadow-md hover: transform hover:-translate-y-0.5"
              onClick={() => handleEdit()}
            >
              <div className="flex items-center justify-center">
                <UserIcon className="w-5 h-5 mr-2" />
                직원 수정
              </div>
            </button>
          </div>
          {/* 시간표 카드 */}
          <div className="bg-white  p-7 w-full lg:w-1/3 flex flex-col min-w-0 border border-gray-200">
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                {/* 시간표 헤더 */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <ClockIcon className="w-6 h-6 mr-2 text-indigo-600" />
                    근무 시간표
                  </h3>
                </div>

                {/* 시간표 정보 (현재는 임시 데이터) */}
                <div className="space-y-4">
                  <div className="p-4 ">
                    <h4 className="font-semibold text-gray-800 mb-3">표준 근무시간</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">출근 시간</span>
                        <span className="text-indigo-500 px-3 py-1 text-sm font-medium">
                          09:00
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">퇴근 시간</span>
                        <span className="text-indigo-500 px-3 py-1 text-sm font-medium">
                          18:00
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">휴게 시간</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">점심시간</span>
                        <span className="text-indigo-500 px-3 py-1 text-sm font-medium">
                          12:00 - 13:00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 transition-all duration-200 shadow-md hover: transform hover:-translate-y-0.5"
              onClick={() => handleEdit()}
            >
              <div className="flex items-center justify-center">
                <ClockIcon className="w-5 h-5 mr-2" />
                시간 수정
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default View;