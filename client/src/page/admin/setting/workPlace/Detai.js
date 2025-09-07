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
        <div className="flex gap-4 flex-1 h-full">
            <div className="bg-white p-6 w-1/4 h-full flex flex-col border border-gray-200">
                <div className="mb-6">
                    <div className="flex items-center mb-4">
                        <MapPinIcon className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-bold text-gray-900">근무지 정보</h3>
                    </div>
                    <p className="text-xs text-gray-500">현재 설정된 근무지 위치</p>
                </div>
                
                <div className="space-y-6 flex-1">
                    <div className="bg-gray-50 p-4">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">주소</label>
                        <div className="p-3 bg-white border border-gray-300">
                            <p className="text-sm text-gray-800">{workPlaceData.address}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">허용 반경</label>
                        <div className="p-3 bg-white border border-gray-300">
                            <p className="text-sm text-gray-800">{workPlaceData.radius}m</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 w-3/4 h-full flex flex-col border border-gray-200">
                <div className="mb-6">
                    <div className="flex items-center mb-4">
                        <GlobeAltIcon className="w-5 h-5 text-green-600 mr-2" />
                        <h3 className="text-lg font-bold text-gray-900">근무지 위치</h3>
                    </div>
                    <p className="text-xs text-gray-500">설정된 근무지와 허용 범위</p>
                </div>
                
                <div className="flex-1 bg-gray-50 p-4">
                    <div className="border border-gray-300 h-full" style={{ minHeight: "400px" }}>
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
                            <div className="w-3 h-3 bg-gray-800 mr-2"></div>
                            <span>근무지 중심점</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 border border-gray-800 bg-gray-300 mr-2"></div>
                            <span>허용 범위 ({workPlaceData.radius}m)</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => handleEdit()}
                    className="mt-6 w-full border border-gray-300 font-semibold py-3 px-6 transition-all duration-200"
                >
                    <div className="flex items-center justify-center">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        위치 수정하기
                    </div>
                </button>
            </div>
        </div>
    )

}

export default Detail;