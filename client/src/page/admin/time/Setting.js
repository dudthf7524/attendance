import { useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { TIME_DETAIL_REQUEST } from "../../../reducers/time";
import { useLocation, useNavigate } from "react-router-dom";
import Detail from "./Detail";
import Register from "./Register";

const Setting = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    console.log("location", location)
    const { user_code: user_code, user_name: user_name } = location.state || {};

    useEffect(() => {
        timeDetailDB();
    }, []);
    const timeDetailDB = async () => {
        const data = { user_code: user_code };

        dispatch({
            type: TIME_DETAIL_REQUEST,
            data: data,
        });
    };

    const { timeDetail } = useSelector((state) => state.time);
    console.log("timeDetail", timeDetail)

    return (
        <div className="w-full min-w-[700px] overflow-x-auto">

            <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-4">
                <div className="mb-3">
                    <div className="inline-block mb-3">
                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            ⏱️ 근무시간 설정 시스템
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
                                시간 설정
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                각 직원의 출근, 퇴근, 휴게시간을 개별적으로 설정하고 관리할 수 있습니다
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/employee/list')}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                            <span>직원 목록으로</span>
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{timeDetail ? '근무시간 정보' : '근무시간 등록'}</h2>
                        <p className="text-gray-600">

                            {timeDetail ? '출근, 퇴근, 휴게시간을 수정시 수정하기 버튼을 눌러주세요' : '출근, 퇴근, 휴게시간을 설정해주세요'}
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* 시간 설정 섹션 */}
                            <div>
                                {timeDetail ?
                                    (
                                        <Detail timeDetail={timeDetail} user_code={user_code} user_name={user_name} />
                                    )
                                    :
                                    (
                                        < Register user_code={user_code} user_name={user_name} />
                                    )
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
