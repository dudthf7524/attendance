import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, UserIcon, BuildingOfficeIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Countries } from "../../../constant/Countries";
import { BloodTypes } from "../../../constant/BloodTypes";

const EditInline = ({ selectedUser, detailedUserData, isLoading, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    user_code: "",
    user_name: "",
    user_nickname: "",
    user_position: "",
    user_hire_date: "",
    user_birth_date: "",
    user_blood_type: "",
    user_phone: "",
    user_annual_leave: "",
    user_country: "",
    user_postcode: "",
    user_address_basic: "",
    user_address_detail: "",
    department_code: "",
    education_level_code: "",
  });

  useEffect(() => {
    if (detailedUserData) {
      setFormData({
        user_code: detailedUserData.user_code || selectedUser?.user_code || "",
        user_name: detailedUserData.user_name || "",
        user_nickname: detailedUserData.user_nickname || "",
        user_position: detailedUserData.user_position || "",
        user_hire_date: detailedUserData.user_hire_date || "",
        user_birth_date: detailedUserData.user_birth_date || "",
        user_blood_type: detailedUserData.user_blood_type || "",
        user_phone: detailedUserData.user_phone || "",
        user_annual_leave: detailedUserData.user_annual_leave || "",
        user_country: detailedUserData.user_country || "",
        user_postcode: detailedUserData.user_postcode || "",
        user_address_basic: detailedUserData.user_address_basic || "",
        user_address_detail: detailedUserData.user_address_detail || "",
        department_code: detailedUserData.department?.department_code || "",
        education_level_code: detailedUserData.education_level?.education_level_code || "",
      });
    }
  }, [detailedUserData, selectedUser]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">직원 정보 수정</h2>
          <p className="text-sm text-gray-600 mt-1">
            직원의 정보를 수정할 수 있습니다 (아이디, 비밀번호 제외)
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">데이터를 불러오는 중...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="flex gap-4 flex-1 overflow-y-auto">
          {/* 왼쪽 박스: 개인 정보 */}
          <div className="bg-white shadow p-4 flex-1 space-y-4">
            <div className="p-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">기본 정보</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">이름 *</label>
                  <input
                    type="text"
                    value={formData.user_name}
                    onChange={(e) => handleInputChange('user_name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="이름을 입력해주세요"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">닉네임 *</label>
                  <input
                    type="text"
                    value={formData.user_nickname}
                    onChange={(e) => handleInputChange('user_nickname', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="닉네임을 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">생년월일</label>
                  <input
                    type="date"
                    value={formData.user_birth_date}
                    onChange={(e) => handleInputChange('user_birth_date', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">국가</label>
                  <select
                    value={formData.user_country}
                    onChange={(e) => handleInputChange('user_country', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {Countries.map((country) => (
                      <option key={country.value} value={country.value}>{country.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">개인 정보</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">혈액형</label>
                  <select
                    value={formData.user_blood_type}
                    onChange={(e) => handleInputChange('user_blood_type', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {BloodTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    value={formData.user_phone}
                    onChange={(e) => handleInputChange('user_phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">주소</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.user_postcode}
                      onChange={(e) => handleInputChange('user_postcode', e.target.value)}
                      placeholder="우편번호"
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={formData.user_address_basic}
                      onChange={(e) => handleInputChange('user_address_basic', e.target.value)}
                      placeholder="기본주소"
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={formData.user_address_detail}
                      onChange={(e) => handleInputChange('user_address_detail', e.target.value)}
                      placeholder="상세주소"
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 박스: 근무 정보 */}
          <div className="bg-white shadow p-4 flex-1 space-y-4">
            <div className="p-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">근무 정보</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">사원번호</label>
                  <input
                    type="text"
                    value={formData.user_code}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">직책 *</label>
                  <input
                    type="text"
                    value={formData.user_position}
                    onChange={(e) => handleInputChange('user_position', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="직책을 입력해주세요"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">입사일 *</label>
                  <input
                    type="date"
                    value={formData.user_hire_date}
                    onChange={(e) => handleInputChange('user_hire_date', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">연차수</label>
                  <input
                    type="number"
                    value={formData.user_annual_leave}
                    onChange={(e) => handleInputChange('user_annual_leave', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="연차수를 입력해주세요"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="p-1">
              <div className="flex flex-col space-y-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <CheckIcon className="w-4 h-4" />
                  수정 완료
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EditInline;