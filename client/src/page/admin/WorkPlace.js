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
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다:", error);
        }
      );
    }
  }, []);

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

  return (
    <div className="w-full min-w-[1000px] overflow-x-auto">
      <main className="flex-1">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">GPS 근무지 설정</h2>
              <p className="text-sm text-gray-400 mt-1">지도에서 위치를 선택하고 근무 반경을 설정하세요.</p>
            </div>
          </div>

          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
            <div className="flex flex-col space-y-4">
              {/* 검색창 */}
              <div>
                <label className="text-sm font-semibold text-blue-500 mb-1 block">근무지 검색</label>
                <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceSelect}>
                  <input
                    type="text"
                    placeholder="예: 서울시 중구 세종대로"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200"
                  />
                </Autocomplete>
              </div>

              {/* 지도 */}
              <div className="w-full">
                <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
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
                </GoogleMap>
              </div>

              {/* 주소 및 반경 */}
              <div className="space-y-4">
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  현재 주소: <span className="ml-1">{address || "주소를 검색해주세요"}</span>
                </div>

                <div>
                  <label className="text-sm font-semibold text-blue-500 mb-1 block">근무 반경 (미터)</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="100"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-right text-xs text-gray-500 mt-1">반경: {radius}m</p>
                </div>
              </div>

              {/* 저장 버튼 */}
              <div className="pt-2">
                <button
                  onClick={handleSave}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition"
                >
                  위치 설정 저장
                </button>
              </div>
            </div>
          </LoadScript>
        </div>
      </main>
    </div>
  );
};

export default CompanyAddress;