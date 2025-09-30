import { MapPinIcon } from "@heroicons/react/24/outline";
import { Autocomplete, Circle, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { WORK_PLACE_REGISTER_REQUEST } from "../../../../reducers/workplace";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState(null);
    const [radius, setRadius] = useState(300);
    const [showLocationSetting, setShowLocationSetting] = useState(false);

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

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        setLocation({ lat, lng });
        
        // 역지오코딩으로 주소 가져오기
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
                setAddress(results[0].formatted_address);
            }
        });
    };

    const handleSave = () => {
        if (!address) {
            alert("근무지를 검색해주세요");
            return;
        }

        const data = {
            address: address,
            location_latitude: location.lat,
            location_hardness: location.lng,
            radius: radius,
        };


        // 실제로는 dispatch로 서버에 저장
        dispatch({
            type: WORK_PLACE_REGISTER_REQUEST,
            data: data,
        });

        navigate("/admin/setting/workplace", { replace: true });
    };




    return (
        <div className="w-full h-full bg-gray-100">
            <div className="p-5 flex flex-1 flex-col gap-4 h-full">
                <div className="flex gap-4 flex-1 h-full">
                    <div className="bg-white p-6 w-1/4 h-full flex flex-col border border-gray-200">
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <MapPinIcon className="w-5 h-5 text-blue-600 mr-2" />
                                <h3 className="text-lg font-bold text-gray-900">근무지 검색</h3>
                            </div>
                            <p className="text-xs text-gray-500">근무지 위치를 검색하세요</p>
                        </div>
                        <div className="space-y-6 flex-1">
                            <div className="bg-gray-50 p-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                                    주소 검색
                                </label>
                                <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceSelect}>
                                    <input
                                        type="text"
                                        placeholder="예: 서울시 중구 세종대로"
                                        className="w-full border-2 border-gray-300 px-3 py-2.5 text-sm"
                                    />
                                </Autocomplete>
                            </div>

                            <div className="bg-gray-50 p-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                                    설정된 주소
                                </label>
                                <div className="flex items-center p-3 bg-white border border-gray-300">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-gray-600" />
                                    <p className="text-sm text-gray-800">
                                        {address || "주소를 검색해주세요"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 w-1/4 h-full flex flex-col border border-gray-200">
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <MapPinIcon className="w-5 h-5 text-green-600 mr-2" />
                                <h3 className="text-lg font-bold text-gray-900">반경 설정</h3>
                            </div>
                            <p className="text-xs text-gray-500">출근 허용 범위를 설정하세요</p>
                        </div>

                        <div className="space-y-4 flex-1">
                            <div className="bg-gray-50 p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-semibold text-gray-800">허용 반경</label>
                                    <span className="text-sm font-semibold bg-gray-800 text-white px-3 py-1">
                                        {radius}m
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="500"
                                    step="50"
                                    value={radius}
                                    onChange={(e) => setRadius(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-300 appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>50m</span>
                                    <span>500m</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4">
                                <p className="text-xs text-gray-600">
                                    <strong>권장 설정:</strong> 일반 사무실은 100-200m, 대형 건물은 300-500m가 적당합니다.
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 p-4 mt-4">
                                <p className="text-xs text-blue-800">
                                    <strong>팁:</strong> 지도를 클릭하여 직접 위치를 선택할 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 w-1/2 h-full flex flex-col border border-gray-200">
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <MapPinIcon className="w-5 h-5 text-purple-600 mr-2" />
                                <h3 className="text-lg font-bold text-gray-900">위치 미리보기</h3>
                            </div>
                            <p className="text-xs text-gray-500">근무지 위치와 허용 범위를 확인하세요</p>
                        </div>
                        
                        <div className="flex-1 bg-gray-50 p-4">
                            <div className="border border-gray-300 h-full" style={{ minHeight: "400px" }}>
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                    center={location || { lat: 37.5665, lng: 126.9780 }}
                                    zoom={16}
                                    onClick={handleMapClick}
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
                                                    clickable: false,
                                                }}
                                            />
                                        </>
                                    )}
                                </GoogleMap>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-gray-800 mr-2"></div>
                                    <span>근무지 중심점</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 border border-gray-800 bg-gray-300 mr-2"></div>
                                    <span>허용 범위 ({radius}m)</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="mt-6 w-full border border-gray-300 font-semibold py-3 px-6 transition-all duration-200"
                        >
                            <div className="flex items-center justify-center">
                                <MapPinIcon className="w-5 h-5 mr-2" />
                                위치 설정 저장
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;