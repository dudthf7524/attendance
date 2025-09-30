import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from "@react-google-maps/api";
import { GlobeAltIcon, MapIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { WORK_PLACE_GET_REQUEST, WORK_PLACE_REGISTER_REQUEST } from "../../../../reducers/workplace";
import { useDispatch, useSelector } from "react-redux";
import Detail from "./Detai";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const CompanyAddress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    workPlaceGet();
  }, []);

  const workPlaceGet = async () => {
    dispatch({
      type: WORK_PLACE_GET_REQUEST,
    });
  };
  const { workPlaceData } = useSelector((state) => state.workplace);

  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(300);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");
  const [showLocationSetting, setShowLocationSetting] = useState(false);

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
    // setWorkPlaceData(data);
    setShowLocationSetting(false);
    alert('근무지 설정이 완료되었습니다');
  };

  const handleLocationSettingClick = () => {
    setShowLocationSetting(true);
  };

  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/admin/setting/workplace/register");
  }

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="p-5 flex flex-1 flex-col gap-4 h-full">
        {workPlaceData ?
          (
            <Detail workPlaceData={workPlaceData} location={location} />
          )
          :
          (
            <div className="flex gap-4 flex-1 h-full">
              <div className="bg-white p-6 w-1/3 h-full flex flex-col border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <MapIcon className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900">GPS 근무지 설정</h3>
                  </div>
                  <p className="text-xs text-gray-500">GPS 기반 출결 관리 시스템</p>
                </div>
                
                <div className="space-y-6 flex-1">
                  <div className="bg-gray-50 p-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">설정 필요</h4>
                    <p className="text-xs text-gray-600 mb-4">
                      근무지가 설정되지 않았습니다. 정확한 출결 관리를 위해 근무지 위치와 허용 반경을 설정해주세요.
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleRegister}
                  className="mt-6 w-full border border-gray-300 font-semibold py-3 px-6 transition-all duration-200"
                >
                  <div className="flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    위치 설정하기
                  </div>
                </button>
              </div>

              <div className="bg-white p-6 w-2/3 h-full flex flex-col border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <MapPinIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900">근무지 미리보기</h3>
                  </div>
                  <p className="text-xs text-gray-500">근무지 설정 후 위치가 표시됩니다</p>
                </div>
                
                <div className="flex-1 bg-gray-50 p-4 flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">근무지 설정 대기중</h4>
                    <p className="text-sm text-gray-500">
                      위치를 설정하면 지도에서 근무지를 확인할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CompanyAddress;