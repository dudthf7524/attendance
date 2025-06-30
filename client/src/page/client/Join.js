import { useState, useRef, useEffect } from "react";
// import AlertModal from "../components/alertModal";
// import ConfirmModal from "../components/confirmModal";
// import { validateSignin } from "./validation";
// import type { SigninFields, SigninRefs } from "./validation";
import axios from "axios";
import AlertModal from "../modal/AlertModal";
import { COMPANY_NUMBER_REQUEST } from "../../reducers/company";
import { useDispatch, useSelector } from "react-redux";

const Join = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        company_number: "",
        company_name: "",
        business_type: "",
        company_count: "",
        company_ceo_name: "",
        company_ceo_phone: "",
        user_id: "",
        user_password: "",
    });
    const [phoneData, setPhoneData] = useState({
        phone_1: "010",
        phone_2: "",
        phone_3: "",
    })
    
    const formDataChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    console.log(formData)

    const phoneDataChange = (e) => {
        const { name, value } = e.target;
        setPhoneData({
            ...phoneData,
            [name]: value
        });
    };
    const [user_password_check, setPasswordCheck] = useState("");
    const [checkPassword, setCheckPassword] = useState(false);
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

    const [content, setContent] = useState("");

    const BIZ_TYPES = [
        { value: "", label: "업종을 선택하세요" },
        { value: "C", label: "제조업" },
        { value: "G", label: "도소매업" },
        { value: "S", label: "서비스업" },
        { value: "F", label: "건설업" },
        { value: "K", label: "금융업" },
        { value: "A", label: "농업/임업/어업" },
        { value: "J", label: "정보통신업" },
        { value: "R", label: "문화·예술·오락업" },
        { value: "P", label: "학문·교육업" },
        { value: "M", label: "전문·과학·기술 서비스업" },
        { value: "Q", label: "보건업" },
        { value: "Q2", label: "사회복지 서비스업" },
        { value: "H", label: "운송업" },
        { value: "I", label: "숙박업" },
        { value: "I2", label: "음식·음료업" },
    ];
    const [modalOpen, setModalOpen] = useState(false);
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
    const { companyNumber } = useSelector((state) => state.company);

    useEffect(() => {
        if (companyNumber && companyNumber === "01") {
            setIsBizVerified(true);
            setContent("사업자등록번호 인증에 성공했습니다.");
            setModalOpen(true);
        } else if (companyNumber) {
            setContent("유효하지 않은 사업자등록번호입니다.");
            setModalOpen(true);
        }

        setIsVerifyingBiz(false);
    }, [companyNumber]);

    const verifyBusinessNumber = async () => {
        if (!formData.company_number) {
            setContent("사업자등록번호를 입력해주세요.");
            setModalOpen(true);
            return;
        }
        try {
            setIsVerifyingBiz(true);

            const data = {
                b_no: [formData.company_number],
            };

            dispatch({
                type: COMPANY_NUMBER_REQUEST,
                data: data,
            });



            // const serviceKey = process.env.REACT_APP_BUSINESS_REGISTER_CONFIRM_KEY;
            // console.log(serviceKey)
            // const result = await axios.post(
            //     "http://localhost:3070/api/verify-biz",
            //     { b_no: [company_number] },
            //     { headers: { "Content-Type": "application/json" } }
            // );

            // console.log(result)
            // console.log(companyNumber)

            // var status = "";

            // console.log(companyNumber);
            // console.log(status);

            // if (companyNumber) {
            //     status = companyNumber
            // }


        } catch (e) {
            console.error(e);
            // setAlertModalContent("사업자등록번호 인증 중 오류가 발생했습니다.");
        }
        // setOpenAlertModal(true);
        setIsVerifyingBiz(false);
    };

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
        console.log(formData)
        // try {
        //     const data = {
        //         company: {
        //             company_name,
        //             company_number,
        //             company_type: bizType,
        //             company_count,
        //             company_ceo_name,
        //             company_ceo_phone,
        //         },
        //         user: {
        //             user_email,
        //             user_name: company_ceo_name,
        //             user_password,
        //             user_password_check,
        //         },
        //     };

        //     console.log(data, data)
        //     const res = await axios.post("http://localhost:3070/auth/join", data);
        //     // alert(res.data.message);
        //     // if (res.data.success) window.location.href = "/";
        // } catch (e) {
        //     console.error(e);
        // }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-100">
            {/* <img src="./image/logo.jpg" alt="logo" className="" /> */}

            <div className="w-full max-w-md p-6 bg-white shadow-md space-y-4">
                {/* 사업자등록번호 */}
                <div>
                    <p className="text-2xl font-bold mb-6 text-blue-700 text-center">회원가입</p>
                    <label className="block text-sm font-medium mb-1">
                        사업자등록번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="company_number"
                        value={formData.company_number}
                        onChange={formDataChange}
                        type="text"
                        className={`w-full px-3 py-2 border rounded-md ${isBizVerified ? 'bg-gray-100' : ''}`}
                        placeholder="숫자로 이루어진 10자리 값만 가능"
                        readOnly={isBizVerified}
                    />
                    <button
                        onClick={verifyBusinessNumber}
                        disabled={isBizVerified}
                        className={`w-full mt-2 py-2 rounded-md text-white ${isBizVerified ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {isBizVerified ? "사업자 등록번호 인증 완료" : isVerifyingBiz ? "인증 중..." : "사업자 등록번호 인증"}
                    </button>
                </div>

                {/* 회사명 */}
                <div>
                    <label className="block text-sm font-medium mb-1">회사명 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={formDataChange}
                        ref={nameRef}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="(주) TICTEC"
                    />
                </div>

                {/* 업종 */}
                <div>
                    <label className="block text-sm font-medium mb-1">업종 <span className="text-red-500">*</span></label>
                    <select
                        name="business_type"
                        value={formData.business_type}
                        onChange={formDataChange}
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
                        name="company_count"
                        value={formData.company_count}
                        onChange={formDataChange}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="10"
                    />
                </div>

                {/* 대표 이름 */}
                <div>
                    <label className="block text-sm font-medium mb-1">대표이름 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="company_ceo_name"
                        value={formData.company_ceo_name}
                        onChange={formDataChange}
                        ref={ceoNameRef}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="김틱택"
                    />
                </div>

                {/* 연락처 */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        연락처 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 w-full items-center justify-between">
                        <input
                            type="text"
                            name="phone_1"
                            maxLength={3}
                            value={phoneData.phone_1}
                            onChange={phoneDataChange}
                            className="w-1/3 px-3 py-2 border rounded-md text-center"
                            placeholder="010"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="text"
                            name="phone_2"
                            maxLength={4}
                            value={phoneData.phone_2}
                            onChange={phoneDataChange}
                            className="w-1/3 px-3 py-2 border rounded-md text-center"
                            placeholder="1234"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="text"
                            name="phone_3"
                            maxLength={4}
                            value={phoneData.phone_3}
                            onChange={phoneDataChange}
                            className="w-1/3 px-3 py-2 border rounded-md text-center"
                            placeholder="5678"
                        />
                    </div>
                </div>
                {/* 이메일 */}
                <div>
                    <label className="block text-sm font-medium mb-1">아이디(이메일) <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        name="user_id"
                        value={formData.user_id}
                        onChange={formDataChange}
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
                        name="user_password"
                        value={formData.user_password}
                        onChange={formDataChange}
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
                            setCheckPassword(e.target.value !== formData.user_password);
                        }}
                        ref={passwordCheckRef}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {checkPassword && (
                        <p className="text-sm text-red-500 mt-1">비밀번호가 일치하지 않습니다.</p>
                    )}
                </div>

                <button onClick={onSubmit} className="w-full mt-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md">
                    가입하기
                </button>
            </div>
            <AlertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                message={content}
            />
        </div>
    );
};

export default Join;
