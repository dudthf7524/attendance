import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_VIEW_REQUEST } from "../../reducers/user";
import EmployeeEditModal from "./EmployeeEditModal";

export default function EmployeeDetailModal({ user_code, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const handleEdit = (user) => {
        console.log(user)
        setSelectedUser(user)
        setIsModalOpen(true);
    };

    const { userView } = useSelector((state) => state.user);
    console.log(userView)
    const dispatch = useDispatch();
    useEffect(() => {
        userViewDB();
    }, [user_code]);

    const userViewDB = async () => {
        const data = user_code;
        dispatch({
            type: USER_VIEW_REQUEST,
            data: data
        });
    };

    if (!user_code) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-[600px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-black"
                >
                    <XMarkIcon className="w-5 h-5 w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                    직원 상세 정보
                </h2>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
                    <div>
                        <strong className="text-gray-500">국적</strong>
                        <div>
                            {userView?.country.country_name}
                        </div>
                    </div>
                    <div>
                        <strong className="text-gray-500">부서</strong>
                        <div>
                            {userView?.department.department_name} 부서
                        </div>
                    </div>
                    <div>
                        <strong className="text-gray-500">학력</strong>
                        <div>
                            {userView?.education_level.education_level_name}
                        </div>
                    </div>
                    <div>
                        <strong className="text-gray-500">생년월일</strong>
                        <div>
                            {userView?.user_birth_date}
                        </div>
                    </div>
                    <div>
                        <strong className="text-gray-500">혈액형</strong>
                        <div>
                            {userView?.user_blood_type || '미입력'}
                        </div>
                    </div>
                    <div>
                        <strong className="text-gray-500">전화번호</strong>
                        <div>
                            {userView?.user_phone || '미입력'}
                        </div>
                    </div>
                    <div>
                        <strong className="text-gray-500">연차수</strong>
                        <div>
                            {userView?.user_annual_leave || '미입력'}
                        </div>
                    </div>
                    <div>
                        <strong className="text-gray-500">주소</strong>
                        <div>
                            {
                                userView?.user_postcode &&
                                userView?.user_address_basic &&
                                userView?.user_address_detail ?
                                    (
                                        <div>
                                            {userView?.user_postcode} {userView?.user_address_basic} {userView?.user_address_detail}
                                        </div>
                                    )
                                    :
                                    (
                                        <div>미입력</div>
                                    )
                            }
                        </div>

                    </div>

                </div>
                <div className="mt-6 flex flex-col gap-2">
                    <button
                        onClick={() => handleEdit(userView.user_code)}
                        className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-center font-semibold"
                    >
                        <PencilSquareIcon className="w-5 h-5 inline-block" />
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <EmployeeEditModal
                    isOpen={isModalOpen}
                    userData={selectedUser}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}