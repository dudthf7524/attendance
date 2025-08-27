import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from "@react-google-maps/api";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { WORK_PLACE_REGISTER_REQUEST } from "../../reducers/workplace";
import { useDispatch } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "330px",
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const CompanyAddress = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({ lat: 35.9733646723136, lng: 128.939298096262 });
  const [radius, setRadius] = useState(300);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log("사용자 위치를 성공적으로 가져왔습니다.");
        },
        (error) => {
          console.log("GPS 위치 접근이 거부되었습니다. 기본 위치를 사용합니다:", error.message);
          // 위치 접근 거부시 기본 위치 유지 (useState 초기값)
          // 필요시 사용자에게 알림
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      console.log("이 브라우저는 위치 서비스를 지원하지 않습니다.");
    }
  }, []);

  console.log("location", location)

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



    dispatch({
      type: WORK_PLACE_REGISTER_REQUEST,
      data: data,
    });
  };

  console.log(location)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none"></div>

      <div className="relative mx-auto z-10">
        <div className="mb-8">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              🌍 위치 설정 시스템
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            GPS 근무지 설정
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            정확한 근무 위치와 출근 허용 범위를 설정하여 GPS 기반 출결 관리를 시작하세요
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">근무지 위치 설정</h2>
            <p className="text-gray-600">
              지도에서 근무지를 검색하고 출근 허용 반경을 조정해주세요
            </p>
          </div>

          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
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
                    className="w-full px-8 py-4 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    위치 설정 저장
                  </button>
                </div>

                {/* 지도 섹션 */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">근무지 위치 미리보기</h3>
                    <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: "500px" }}>
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
                        <Marker
                          position={location}
                        />
                        <Circle
                          center={location}
                          radius={radius}
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
                        <span>출근 허용 범위 ({radius}m)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default CompanyAddress;