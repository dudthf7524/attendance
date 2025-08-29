import { ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const fmt = (t) => (t ? t.split(":").slice(0, 2).join(":") : "--:--");

function Detail({ timeDetail, user_name, user_code }) {
    const navigate = useNavigate();

    if (!timeDetail) {
        return <div className="text-sm text-gray-500">근무시간을 불러오는 중…</div>;
    }

    return (
        <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between nitems-center mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        {user_name ? `${user_name}님 ` : ''}근무시간
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">출근, 퇴근, 휴게시간을 설정해주세요</p>
                </div>

                <button
                    onClick={() => navigate('/admin/time/edit', {
                        state: {
                            user_code: user_code,
                            user_name: user_name
                        }
                    })}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all duration-200"
                >
                    <span>수정하기</span>
                    <ArrowRightIcon className="w-5 h-5" />
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-2">
                        <ClockIcon className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="text-base font-semibold text-gray-900">출근시간</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{fmt(timeDetail.start_time)}</div>
                    <p className="text-sm text-gray-500 mt-1">설정완료</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-2">
                        <ClockIcon className="w-5 h-5 text-red-600 mr-2" />
                        <h4 className="text-base font-semibold text-gray-900">퇴근시간</h4>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{fmt(timeDetail.end_time)}</div>
                    <p className="text-sm text-gray-500 mt-1">설정완료</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-2">
                        <ClockIcon className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="text-base font-semibold text-gray-900">휴게 시작</h4>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{fmt(timeDetail.rest_start_time)}</div>
                    <p className="text-sm text-gray-500 mt-1">설정완료</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center mb-2">
                        <ClockIcon className="w-5 h-5 text-purple-600 mr-2" />
                        <h4 className="text-base font-semibold text-gray-900">휴게 종료</h4>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{fmt(timeDetail.rest_end_time)}</div>
                    <p className="text-sm text-gray-500 mt-1">설정완료</p>
                </div>
            </div>
        </div>
    );
}

export default Detail;
