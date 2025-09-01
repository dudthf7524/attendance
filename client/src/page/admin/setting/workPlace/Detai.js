import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Edit from "./Edit";
import { useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Detail = ({ workPlaceData }) => {
    const [location, setLocation] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (workPlaceData) {
            setLocation({
                lat: workPlaceData.location_latitude,
                lng: workPlaceData.location_hardness,
            })
        }
    }, [workPlaceData])

    // if (showEdit) {
    //     return <Edit workPlaceData={workPlaceData} onCancel={() => setShowEdit(false)} />;
    // }
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate('/admin/setting/workplace/edit', {
            state: { workPlaceData }
        });
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">설정된 근무지</h2>
                        <p className="text-sm text-gray-600">현재 설정된 근무지 위치입니다</p>
                    </div>
                    <button
                        onClick={() => handleEdit()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        위치 수정하기
                    </button>
                </div>
            </div>

                <div className="p-8">
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">근무지 정보</h3>
                            <div className="space-y-3">
                                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                                    <MapPinIcon className="w-5 h-5 mr-3 text-gray-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900">주소</p>
                                        <p className="text-sm text-gray-600">{workPlaceData.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                                    <GlobeAltIcon className="w-5 h-5 mr-3 text-gray-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900">출근 허용 반경</p>
                                        <p className="text-sm text-gray-600">{workPlaceData.radius}m</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">근무지 위치</h3>
                            <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: "400px" }}>
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                    center={location}
                                    zoom={16}
                                    options={{
                                        styles: [
                                            {
                                                featureType: "poi",
                                                elementType: "labels",
                                                stylers: [{ visibility: "off" }]
                                            }
                                        ]
                                    }}
                                >
                                    <Marker position={location} />
                                    <Circle
                                        center={location}
                                        radius={workPlaceData.radius}
                                        options={{
                                            fillColor: "#6495ED55",
                                            strokeColor: "#6495ED",
                                            strokeWeight: 1,
                                        }}
                                    />
                                </GoogleMap>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
                                    <span>근무지 중심점</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-black rounded-full bg-black bg-opacity-20 mr-2"></div>
                                    <span>출근 허용 범위 ({workPlaceData.radius}m)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )

}

export default Detail;