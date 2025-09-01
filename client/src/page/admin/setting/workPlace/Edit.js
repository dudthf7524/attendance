import { MapPinIcon } from "@heroicons/react/24/outline";
import { Autocomplete, Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { WORK_PLACE_EDIT_REQUEST, WORK_PLACE_REGISTER_REQUEST } from "../../../../reducers/workplace";
import { useLocation, useNavigate } from "react-router-dom";



const Edit = ({ onCancel }) => {
    const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const dispatch = useDispatch();
    const locations = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!locations.state) {
            navigate("/admin/setting/workplace", { replace: true });
        }
    }, [locations.state, navigate]);

    const workPlaceData = locations.state?.workPlaceData;



    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState(null);
    const [radius, setRadius] = useState(300);

    useEffect(() => {
        if (workPlaceData) {
            setAddress(workPlaceData.address);
            setLocation({
                lat: workPlaceData.location_latitude,
                lng: workPlaceData.location_hardness,
            });
            setRadius(workPlaceData.radius);
        }
    }, [workPlaceData]);

    const handlePlaceSelect = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                setLocation({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
                setAddress(place.formatted_address || "주소 정보를 가져올 수 없습니다.");
            }
        }
    };

    if (!workPlaceData) {
        return null;
    }

    const handleSave = () => {
        if (!address) {
            alert("근무지를 검색해주세요");
            return;
        }

        const data = {
            work_place_id: workPlaceData.work_place_id,
            address: address,
            location_latitude: location.lat,
            location_hardness: location.lng,
            radius: radius,
        };

        dispatch({
            type: WORK_PLACE_EDIT_REQUEST,
            data: data,
        });

        navigate("/admin/setting/workplace", { replace: true });

    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">근무지 위치 수정</h2>
                        <p className="text-sm text-gray-600">
                            지도에서 근무지를 검색하고 출근 허용 반경을 조정해주세요
                        </p>
                    </div>
                    {/* <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        취소
                    </button> */}
                </div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 검색 및 설정 섹션 */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">근무지 검색</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">주소 검색</label>
                                    <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceSelect}>
                                        <input
                                            type="text"
                                            placeholder="예: 서울시 중구 세종대로"
                                            defaultValue={address}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </Autocomplete>
                                </div>

                                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                                    <MapPinIcon className="w-5 h-5 mr-3 text-gray-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900">현재 설정된 주소</p>
                                        <p className="text-sm text-gray-600 truncate">
                                            {address || "주소를 검색해주세요"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">근무 반경 설정</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-sm font-medium text-gray-700">허용 반경</label>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black text-white">
                                            {radius}m
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100"
                                        max="500"
                                        step="100"
                                        value={radius}
                                        onChange={(e) => setRadius(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>100m</span>
                                        <span>500m</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-800">
                                        <strong>권장 설정:</strong> 일반 사무실은 100-200m, 대형 건물은 300-500m가 적당합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="flex items-center justify-center border border-gray-200 bg-blue-600 w-full space-x-2 px-8 py-4 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            <MapPinIcon className="w-5 h-5" />
                            <span>수정 사항 저장</span>
                        </button>
                    </div>

                    {/* 지도 섹션 */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">근무지 위치 미리보기</h3>
                            <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: "500px" }}>
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                    center={location || { lat: 37.5665, lng: 126.9780 }}
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
                                    {location && (
                                        <>
                                            <Marker position={location} />
                                            <Circle
                                                center={location}
                                                radius={radius}
                                                options={{
                                                    fillColor: "#6495ED55",
                                                    strokeColor: "#6495ED",
                                                    strokeWeight: 1,
                                                }}
                                            />
                                        </>
                                    )}
                                </GoogleMap>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
                                    <span>근무지 중심점</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-black rounded-full bg-black bg-opacity-20 mr-2"></div>
                                    <span>출근 허용 범위 ({radius}m)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;