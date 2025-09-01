import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from "@react-google-maps/api";
import { GlobeAltIcon, MapIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { WORK_PLACE_GET_REQUEST, WORK_PLACE_REGISTER_REQUEST } from "../../../../reducers/workplace";
import { useDispatch, useSelector } from "react-redux";
import Detail from "./Detai";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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

        {workPlaceData ?
          (
            <Detail workPlaceData={workPlaceData} location={location} />
          )
          :
          (
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
                    onClick={handleRegister}
                    className="inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-medium"
                  >
                    <MapPinIcon className="w-6 h-6" />
                    <span>위치 설정하기</span>
                  </button>
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