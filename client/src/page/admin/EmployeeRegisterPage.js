import React, { useState } from "react";

const EmployeeRegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    joinDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("직원 등록 정보:", form);
    alert("직원 정보가 등록되었습니다.");
    // API 호출이나 저장 로직을 이곳에 추가하세요
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-lg p-8 shadow">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">직원 등록</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "이름", name: "name", type: "text" },
            { label: "이메일", name: "email", type: "email" },
            { label: "전화번호", name: "phone", type: "text" },
            { label: "부서", name: "department", type: "text" },
            { label: "직책", name: "position", type: "text" },
            { label: "입사일", name: "joinDate", type: "date" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
          >
            직원 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegisterPage;
