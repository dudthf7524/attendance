import { PencilSquareIcon, XMarkIcon, UserIcon, BuildingOfficeIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const View = ({ selectedUser, detailedUserData, isLoading, onClose, onEdit, onDelete, getStatusColor }) => {
  if (!selectedUser) {
    return null;
  }

  return (
    <>
      {/* <div className="flex justify-end items-center mb-6">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div> */}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">상세 정보를 불러오는 중...</p>
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto">
          {/* 3개 박스 가로 정렬 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* 기본 정보 박스 */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">기본 정보</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">이름</label>
                  <div className="font-medium text-gray-900">
                    {detailedUserData?.user_name || selectedUser?.user_info?.user_name}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">닉네임</label>
                  <div className="font-medium text-gray-700">
                    {detailedUserData?.user_nickname || selectedUser?.user_info?.user_nickname}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">생년월일</label>
                  <div className="text-gray-700">
                    {detailedUserData?.user_birth_date || "등록되지 않음"}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">혈액형</label>
                  <div className="text-gray-700">
                    {detailedUserData?.user_blood_type ? `${detailedUserData.user_blood_type}형` : "등록되지 않음"}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">전화번호</label>
                  <div className="text-gray-700">
                    {detailedUserData?.user_phone || selectedUser?.user_info?.user_phone || "등록되지 않음"}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">국적</label>
                  <div className="text-gray-700">
                    {detailedUserData?.user_country || "등록되지 않음"}
                  </div>
                </div>
              </div>
            </div>

            {/* 회사 정보 박스 */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">회사 정보</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">사원번호</label>
                  <div className="font-mono text-gray-900">
                    {selectedUser?.user_code}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">직책</label>
                  <div className="font-medium text-gray-900">
                    {detailedUserData?.user_position || selectedUser?.user_info?.user_position}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">입사일</label>
                  <div className="text-gray-700">
                    {detailedUserData?.user_hire_date || selectedUser?.user_info?.user_hire_date}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">권한</label>
                  <div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(selectedUser?.auth?.auth_code)}`}>
                      {selectedUser?.auth?.auth_name}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">연차 수</label>
                  <div className="text-gray-700">
                    {detailedUserData?.user_annual_leave ? `${detailedUserData.user_annual_leave}일` : "등록되지 않음"}
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 정보 박스 */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">추가 정보</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">우편번호</label>
                  <div className="text-gray-700">
                    {detailedUserData?.user_postcode || "등록되지 않음"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => onEdit(selectedUser)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PencilSquareIcon className="w-4 h-4" />
              직원 정보 수정
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default View;