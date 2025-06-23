import React, { useState } from "react";

const members = [
  { id: 1, name: "홍길동" },
  { id: 2, name: "김민지" },
  { id: 3, name: "이철수" },
];

const generateOptions = (range: number) =>
  Array.from({ length: range }, (_, i) => String(i).padStart(2, "0"));

const TimeManagementPage = () => {
  const [selected, setSelected] = useState(members[0]);

  const [times, setTimes] = useState({
    startHour: "09",
    startMin: "00",
    endHour: "18",
    endMin: "00",
    breakStartHour: "12",
    breakStartMin: "00",
    breakEndHour: "13",
    breakEndMin: "00",
  });

  const handleTimeChange = (field: string, value: string) => {
    setTimes((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen w-full bg-[#f9fafb] px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600">시간 관리</h1>
        <p className="text-sm text-gray-500 mt-1">
          직원의 출퇴근 및 휴게 시작·종료 시간을 설정할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100%-100px)] transition-all duration-500">
        {/* 회원 목록 */}
        <div className="w-full lg:w-1/3 bg-white border border-blue-300 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 border-b border-blue-200">
            회원 목록
          </div>
          <div className="flex-1 overflow-y-auto">
            {members.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelected(member)}
                className={`w-full text-left px-5 py-4 border-b border-blue-100 hover:bg-blue-50 transition ${
                  selected.id === member.id
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {member.name}
              </button>
            ))}
          </div>
        </div>

        {/* 시간 설정 */}
        <div className="w-full lg:w-2/3 bg-white border border-blue-300 rounded-xl shadow-md p-6 flex flex-col gap-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-blue-100 pb-2">
            {selected.name} 님의 시간 설정
          </h2>

          {/* 출근 시간 */}
          <div>
            <p className="text-sm text-gray-600 font-medium mb-2">출근 시간</p>
            <div className="flex gap-2">
              <select
                value={times.startHour}
                onChange={(e) => handleTimeChange("startHour", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {generateOptions(24).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} 시
                  </option>
                ))}
              </select>
              <select
                value={times.startMin}
                onChange={(e) => handleTimeChange("startMin", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {generateOptions(60).map((min) => (
                  <option key={min} value={min}>
                    {min} 분
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 퇴근 시간 */}
          <div>
            <p className="text-sm text-gray-600 font-medium mb-2">퇴근 시간</p>
            <div className="flex gap-2">
              <select
                value={times.endHour}
                onChange={(e) => handleTimeChange("endHour", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {generateOptions(24).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} 시
                  </option>
                ))}
              </select>
              <select
                value={times.endMin}
                onChange={(e) => handleTimeChange("endMin", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {generateOptions(60).map((min) => (
                  <option key={min} value={min}>
                    {min} 분
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 휴게 시간 */}
          <div>
            <p className="text-sm text-gray-600 font-medium mb-2">휴게 시간</p>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <select
                  value={times.breakStartHour}
                  onChange={(e) => handleTimeChange("breakStartHour", e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {generateOptions(24).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} 시
                    </option>
                  ))}
                </select>
                <select
                  value={times.breakStartMin}
                  onChange={(e) => handleTimeChange("breakStartMin", e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {generateOptions(60).map((min) => (
                    <option key={min} value={min}>
                      {min} 분
                    </option>
                  ))}
                </select>
              </div>
              <span className="self-center text-gray-500">~</span>
              <div className="flex gap-2">
                <select
                  value={times.breakEndHour}
                  onChange={(e) => handleTimeChange("breakEndHour", e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {generateOptions(24).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} 시
                    </option>
                  ))}
                </select>
                <select
                  value={times.breakEndMin}
                  onChange={(e) => handleTimeChange("breakEndMin", e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {generateOptions(60).map((min) => (
                    <option key={min} value={min}>
                      {min} 분
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeManagementPage;
