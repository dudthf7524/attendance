import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { MapPinIcon } from "@heroicons/react/24/outline";

const containerStyle = {
  width: "100%",
  height: "330px",
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MyLocation = ({ setIsWithinRadius, closeModal }) => {
  const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 });
  const [radius, setRadius] = useState(300);

  // 가짜 회사 주소 정보 (실제 redux에서 가져오게 될 부분)
  const companyAddress = {
    address: "서울시 중구 세종대로",
    location_latitude: "35.8268",
    location_hardness: "128.756",
    radius: 200,
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const checkRadius = () => {
    const companyLat = parseFloat(companyAddress.location_latitude);
    const companyLng = parseFloat(companyAddress.location_hardness);
    const companyRadius = parseInt(companyAddress.radius);

    const distance = getDistance(location.lat, location.lng, companyLat, companyLng);
    if (distance <= companyRadius) {
      setIsWithinRadius(true);
      alert("근무지 GPS설정이 완료되었습니다.");
      closeModal();
    } else {
      setIsWithinRadius(false);
      alert("근무지 반경 외부입니다. 출근/퇴근을 할 수 없습니다.");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다:", error);
        }
      );
    }
  }, []);

  return (
    <div className="h-90% w-full bg-[#f9fafb] px-4 py-6 overflow-auto">
      <div className="bg-white border border-blue-200 shadow-sm px-6 py-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-600">내 위치 확인</h1>
        <p className="text-sm text-gray-500 mt-1">현재 위치와 근무지를 비교해보세요.</p>
      </div>

      <div className="bg-white border border-blue-300 shadow-md p-6 w-full">
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          {/* 지도 표시 */}
          <div className="w-full mb-4">
            <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
              {/* 내 위치 */}
              <Marker position={location} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
              <Circle
                center={location}
                radius={radius}
                options={{
                  fillColor: "#6495ED55",
                  strokeColor: "#6495ED",
                  strokeWeight: 1,
                }}
              />
              {/* 근무지 위치 */}
              <Marker
                position={{
                  lat: parseFloat(companyAddress.location_latitude),
                  lng: parseFloat(companyAddress.location_hardness),
                }}
              />
              <Circle
                center={{
                  lat: parseFloat(companyAddress.location_latitude),
                  lng: parseFloat(companyAddress.location_hardness),
                }}
                radius={parseInt(companyAddress.radius)}
                options={{
                  fillColor: "#FF6347AA",
                  strokeColor: "#FF4500",
                  strokeWeight: 1,
                }}
              />
            </GoogleMap>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-blue-500 text-lg font-medium">
              <MapPinIcon className="w-7 h-7 mr-2" />
              현재 나의 위치
            </div>
            <div className="flex items-center text-lg font-medium text-red-500">
              <MapPinIcon className="w-7 h-7 mr-2 text-red-500" />
              근무지
            </div>

            <div>
              <label className="text-blue-400 font-semibold block mb-1">비교 반경 설정 (m)</label>
              <input
                type="range"
                min="100"
                max="500"
                step="100"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-600 mt-1 text-right">반경: {radius}m</p>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-4">
            <button
              onClick={checkRadius}
              className="
                w-full py-3 
                border-2 border-blue-400 text-blue-400 font-semibold rounded-md 
                hover:bg-blue-50 active:scale-95
                active:ring-2 active:ring-blue-400 active:ring-offset-2
                transition duration-150
              "
            >
              위치 확인
            </button>
            <button
              onClick={closeModal}
              className="
                w-full py-3 
                border-2 border-gray-300 text-gray-500 font-semibold rounded-md 
                hover:bg-gray-100 active:scale-95
                transition duration-150
              "
            >
              닫기
            </button>
          </div>
        </LoadScript>
      </div>
    </div>
  );
};

export default MyLocation;
