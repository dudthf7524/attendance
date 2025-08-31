import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from "@react-google-maps/api";
import { GlobeAltIcon, MapIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { WORK_PLACE_REGISTER_REQUEST } from "../../../reducers/workplace";
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
  const [showLocationSetting, setShowLocationSetting] = useState(false);
  
  // 임시 데이터 - 실제로는 데이터베이스에서 가져올 데이터
  const [workPlaceData, setWorkPlaceData] = useState(null);
  // const [workPlaceData, setWorkPlaceData] = useState({
  //   address: "서울특별시 중구 세종대로 110",
  //   location_latitude: 37.5663,
  //   location_hardness: 126.9779,
  //   radius: 200
  // });

  useEffect(() => {
    // 근무지 데이터가 있으면 해당 위치로 설정
    if (workPlaceData) {
      setLocation({
        lat: workPlaceData.location_latitude,
        lng: workPlaceData.location_hardness,
      });
      setAddress(workPlaceData.address);
      setRadius(workPlaceData.radius);
    } else if ("geolocation" in navigator) {
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
  }, [workPlaceData]);

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

    // 실제로는 dispatch로 서버에 저장
    dispatch({
      type: WORK_PLACE_REGISTER_REQUEST,
      data: data,
    });

    // 임시로 로컬 상태 업데이트
    setWorkPlaceData(data);
    setShowLocationSetting(false);
    alert('근무지 설정이 완료되었습니다');
  };

  console.log(location)

  const handleLocationSettingClick = () => {
    setShowLocationSetting(true);
  };

  return (
    <div className="w-full min-w-[700px] overflow-x-auto">
      <div className="bg-white rounded-xl shadow p-5 flex flex-col">
        <div className="mb-3">
          <div className="inline-block mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              🌍 위치 설정 시스템
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
            GPS 근무지 설정
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {workPlaceData 
              ? "설정된 근무지 정보를 확인하고 수정할 수 있습니다" 
              : "정확한 근무 위치와 출근 허용 범위를 설정하여 GPS 기반 출결 관리를 시작하세요"
            }
          </p>
        </div>

        {workPlaceData && !showLocationSetting ? (
          // 근무지 데이터가 있을 때 - 지도 표시
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">설정된 근무지</h2>
                  <p className="text-sm text-gray-600">현재 설정된 근무지 위치입니다</p>
                </div>
                <button
                  onClick={handleLocationSettingClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  위치 수정하기
                </button>
              </div>
            </div>
            
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
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
            </LoadScript>
          </div>
        ) : !workPlaceData && !showLocationSetting ? (
          // 근무지 데이터가 없을 때 - '위치 설정하기' 버튼 표시
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">근무지 설정 필요</h2>
              <p className="text-sm text-gray-600">
                GPS 기반 출결 관리를 위해 근무지를 설정해주세요
              </p>
            </div>
            
            <div className="p-8 text-center">
              <div className="max-w-md mx-auto">
                <MapIcon className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  아직 근무지가 설정되지 않았습니다
                </h3>
                <p className="text-gray-600 mb-8">
                  정확한 출결 관리를 위해 근무지 위치와 허용 반경을 설정해주세요. 
                  직원들은 설정된 범위 내에서만 출퇴근 체크를 할 수 있습니다.
                </p>
                <button
                  onClick={handleLocationSettingClick}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  <MapPinIcon className="w-6 h-6" />
                  <span>위치 설정하기</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 위치 설정 모드
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">근무지 위치 설정</h2>
                  <p className="text-sm text-gray-600">
                    지도에서 근무지를 검색하고 출근 허용 반경을 조정해주세요
                  </p>
                </div>
                <button
                  onClick={() => setShowLocationSetting(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
              </div>
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
                    className="flex items-center justify-center border border-gray-200 bg-gray-50 w-full space-x-2 px-8 py-4 hover:bg-white rounded-lg"
                  >
                    <MapPinIcon className="w-5 h-5" />
                    <span>위치 설정 저장</span>
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
        )}
      </div>
    </div>
  );
};

export default CompanyAddress;