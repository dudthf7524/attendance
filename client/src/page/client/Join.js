import { useState, useRef } from "react";
// import AlertModal from "../components/alertModal";
// import ConfirmModal from "../components/confirmModal";
// import { validateSignin } from "./validation";
// import type { SigninFields, SigninRefs } from "./validation";
import axios from "axios";

const Join = () => {
    const [bizType, setBizType] = useState("");
    const [company_name, setName] = useState("");
    const [company_number, setNumber] = useState("");
    const [company_count, setCount] = useState("");
    const [company_ceo_name, setCeoName] = useState("");
    const [company_ceo_phone, setCeoPhone] = useState("");
    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const [user_password_check, setPasswordCheck] = useState("");
    const [checkPassword, setCheckPassword] = useState(false);
    // const [openAlertModal, setOpenAlertModal] = useState(false);
    // const [alertModalContent, setAlertModalContent] = useState("");
    // const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openVerify, setOpenVerify] = useState(false);
    const [verifyNum, setVerifyNum] = useState("");
    const [emailVerifyNum, setEmailVerifyNum] = useState("");
    const [isVerify, setIsVerify] = useState(false);
    const [isBizVerified, setIsBizVerified] = useState(false);
    const [isVerifyingBiz, setIsVerifyingBiz] = useState(false);

    const nameRef = useRef(null);
    const ceoNameRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordCheckRef = useRef(null);

    const BIZ_TYPES = [
        { value: "", label: "업종을 선택하세요" },
        { value: "제조업", label: "제조업" },
        { value: "도소매업", label: "도소매업" },
        { value: "서비스업", label: "서비스업" },
        { value: "건설업", label: "건설업" },
        { value: "금융업", label: "금융업" },
        { value: "농업/임업/어업", label: "농업/임업/어업" },
        { value: "정보통신업", label: "정보통신업" },
        { value: "문화·예술·오락업", label: "문화·예술·오락업" },
        { value: "학문·교육업", label: "학문·교육업" },
        { value: "전문·과학·기술 서비스업", label: "전문·과학·기술 서비스업" },
        { value: "보건업", label: "보건업" },
        { value: "사회복지 서비스업", label: "사회복지 서비스업" },
        { value: "운송업", label: "운송업" },
        { value: "숙박업", label: "숙박업" },
        { value: "음식·음료업", label: "음식·음료업" },
    ];

    const sendEmail = async () => {
        setOpenVerify(true);
        const randomNum = Math.floor(100000 + Math.random() * 900000).toString();
        setEmailVerifyNum(randomNum);
        console.log("Email verification number:", randomNum);
    };

    // const onVerify = () => {
    //     if (verifyNum === emailVerifyNum) {
    //         setIsVerify(true);
    //         setOpenVerify(false);
    //         setAlertModalContent("이메일 인증에 성공하였습니다.");
    //     } else {
    //         setAlertModalContent("인증번호가 틀렸습니다.");
    //     }
    //     setOpenAlertModal(true);
    // };

    // const verifyBusinessNumber = async () => {
    //     if (!company_number) {
    //         setAlertModalContent("사업자등록번호를 입력해주세요.");
    //         setOpenAlertModal(true);
    //         return;
    //     }
    //     try {
    //         setIsVerifyingBiz(true);
    //         const data = { b_no: [company_number] };
    //         const result = await axios.post(
    //             `https://api.odcloud.kr/api/nts-businessman/v1/status`,
    //             data,
    //             { headers: { "Content-Type": "application/json" } }
    //         );
    //         const status = result.data.data[0].b_stt_cd;
    //         setIsBizVerified(status === "01");
    //         setAlertModalContent(
    //             status === "01" ? "유효한 사업자등록번호입니다." : "유효하지 않은 사업자등록번호입니다."
    //         );
    //     } catch (e) {
    //         console.error(e);
    //         setAlertModalContent("사업자등록번호 인증 중 오류가 발생했습니다.");
    //     }
    //     setOpenAlertModal(true);
    //     setIsVerifyingBiz(false);
    // };

    const onSubmit = async () => {
        // const fields: SigninFields = {
        //   company_name,
        //   company_ceo_name,
        //   company_ceo_phone,
        //   user_password,
        //   user_password_check,
        // };
        // const refs: SigninRefs = {
        //   nameRef,
        //   ceoNameRef,
        //   phoneRef,
        //   passwordRef,
        //   passwordCheckRef,
        // };
        // const result = validateSignin(fields, refs, isVerify);
        // if (!result.valid) {
        //     setAlertModalContent(result.message || "입력값을 확인해주세요.");
        //     setOpenAlertModal(true);
        //     result.focusRef?.current?.focus();
        //     return;
        // }
        try {
            const data = {
                company: {
                    company_name,
                    company_number,
                    company_type: bizType,
                    company_count,
                    company_ceo_name,
                    company_ceo_phone,
                },
                user: {
                    user_email,
                    user_name: company_ceo_name,
                    user_password,
                    user_password_check,
                },
            };

            console.log(data, data)
            const res = await axios.post("http://localhost:3070/auth/join", data);
            // alert(res.data.message);
            // if (res.data.success) window.location.href = "/";
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-100">
            {/* <img src="./image/logo.jpg" alt="logo" className="" /> */}
            <p className="text-4xl font-bold mb-6 text-blue-700">tictec</p>
            <p className="text-2xl font-bold mb-6">회원가입</p>

            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-4">
                {/* 사업자등록번호 */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        사업자등록번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={company_number}
                        onChange={(e) => setNumber(e.target.value)}
                        type="text"
                        className={`w-full px-3 py-2 border rounded-md ${isBizVerified ? 'bg-gray-100' : ''}`}
                        placeholder="숫자로 이루어진 10자리 값만 가능"
                    // readOnly={isBizVerified}
                    />
                    <button
                        // onClick={verifyBusinessNumber}
                        // disabled={isBizVerified}
                        className={`w-full mt-2 py-2 rounded-md text-white ${isBizVerified ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isBizVerified ? "사업자 등록번호 인증 완료" : isVerifyingBiz ? "인증 중..." : "사업자 등록번호 인증"}
                    </button>
                </div>

                {/* 회사명 */}
                <div>
                    <label className="block text-sm font-medium mb-1">회사명 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={company_name}
                        onChange={(e) => setName(e.target.value)}
                        ref={nameRef}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="(주) TICTEC"
                    />
                </div>

                {/* 업종 */}
                <div>
                    <label className="block text-sm font-medium mb-1">업종 <span className="text-red-500">*</span></label>
                    <select
                        value={bizType}
                        onChange={(e) => setBizType(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                        {BIZ_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                {/* 인원 */}
                <div>
                    <label className="block text-sm font-medium mb-1">사용 예상 인원 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={company_count}
                        onChange={(e) => setCount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="10"
                    />
                </div>

                {/* 대표 이름 */}
                <div>
                    <label className="block text-sm font-medium mb-1">대표이름 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={company_ceo_name}
                        onChange={(e) => setCeoName(e.target.value)}
                        ref={ceoNameRef}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="김틱택"
                    />
                </div>

                {/* 연락처 */}
                <div>
                    <label className="block text-sm font-medium mb-1">연락처 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={company_ceo_phone}
                        onChange={(e) => setCeoPhone(e.target.value)}
                        ref={phoneRef}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="010-0000-0000"
                    />
                </div>

                {/* 이메일 */}
                <div>
                    <label className="block text-sm font-medium mb-1">아이디(이메일) <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        value={user_email}
                        onChange={(e) => setEmail(e.target.value)}
                        // ref={emailRef}
                        readOnly={isVerify}
                        className={`w-full px-3 py-2 border rounded-md ${isVerify ? 'bg-gray-100' : ''}`}
                        placeholder="tictec@tictec.com"
                    />
                    <button
                        // onClick={() => {
                        //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        //     if (!user_email) {
                        //         setAlertModalContent("이메일을 입력해주세요.");
                        //         setOpenAlertModal(true);
                        //     } else if (!emailRegex.test(user_email)) {
                        //         setAlertModalContent("올바른 이메일 형식이 아닙니다.");
                        //         setOpenAlertModal(true);
                        //     } else {
                        //         setOpenConfirmModal(true);
                        //     }
                        // }}
                        className={`w-full mt-2 py-2 rounded-md text-white ${isVerify ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={isVerify}
                    >
                        {isVerify ? "이메일 인증 완료" : "이메일 인증"}
                    </button>
                    {openVerify && (
                        <div className="flex mt-2 space-x-2">
                            <input
                                value={verifyNum}
                                onChange={(e) => setVerifyNum(e.target.value)}
                                className="flex-1 px-3 py-2 border rounded-md"
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">인증</button>
                        </div>
                    )}
                </div>

                {/* 비밀번호 */}
                <div>
                    <label className="block text-sm font-medium mb-1">비밀번호 <span className="text-red-500">*</span></label>
                    <input
                        type="password"
                        value={user_password}
                        onChange={(e) => setPassword(e.target.value)}
                        ref={passwordRef}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {/* 비밀번호 확인 */}
                <div>
                    <label className="block text-sm font-medium mb-1">비밀번호 확인 <span className="text-red-500">*</span></label>
                    <input
                        type="password"
                        value={user_password_check}
                        onChange={(e) => {
                            setPasswordCheck(e.target.value);
                            setCheckPassword(e.target.value !== user_password);
                        }}
                        ref={passwordCheckRef}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {checkPassword && (
                        <p className="text-sm text-red-500 mt-1">비밀번호가 일치하지 않습니다.</p>
                    )}
                </div>

                <button onClick={onSubmit} className="w-full mt-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md">
                    Sign In
                </button>
            </div>

            {/* {openAlertModal && (
                <AlertModal
                    openModal={() => setOpenAlertModal(false)}
                    modalTitle={"알림"}
                    modalContent={alertModalContent}
                />
            )}

            {openConfirmModal && (
                <ConfirmModal
                    openModal={() => setOpenConfirmModal(false)}
                    modalTitle={"tictec"}
                    modalContent={"입력하신 이메일로 인증번호를 보내시겠습니까?"}
                    acceptText={"수락"}
                    refuseText={"취소"}
                    onAccept={sendEmail}
                />
            )} */}
        </div>
    );
};

export default Join;
