import { useState, useEffect } from "react";
// import AlertModal from "../components/alertModal";
// import ConfirmModal from "../components/confirmModal";
// import { validateSignin } from "./validation";
// import type { SigninFields, SigninRefs } from "./validation";
import AlertModal from "../modal/AlertModal";
import { COMPANY_NUMBER_REQUEST } from "../../reducers/company";
import { useDispatch, useSelector } from "react-redux";
import { EMAIL_CHECK_REQUEST } from "../../reducers/email";
import { JOIN_REQUEST } from "../../reducers/join";

const Join = () => {
    const dispatch = useDispatch();

    const emailDomains = [
        "naver.com",
        "hanmail.net",
        "gmail.com",
        "daum.net",
        "hotmail.com",
        "custom",
    ];

    const [content, setContent] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [emailDomain, setEmailDomain] = useState("naver.com");
    const [customDomain, setCustomDomain] = useState("");
    const [user_password_check, setPasswordCheck] = useState("");
    const [checkPassword, setCheckPassword] = useState(false);
    const [openVerify, setOpenVerify] = useState(false);
    const [verifyNum, setVerifyNum] = useState("");
    const [emailVerifyNum, setEmailVerifyNum] = useState("");
    const [isVerify, setIsVerify] = useState(false);
    const [isBizVerified, setIsBizVerified] = useState(false);
    const [isVerifyingBiz, setIsVerifyingBiz] = useState(false);
    const [timer, setTimer] = useState(180); // 3분 = 180초
    const [timerActive, setTimerActive] = useState(false);

    const [formData, setFormData] = useState({
        company_number: "",
        company_name: "",
        company_type: "",
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

    const phoneDataChange = (e) => {
        const { name, value } = e.target;
        setPhoneData({
            ...phoneData,
            [name]: value
        });
    };

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
    console.log(customDomain)
    const sendEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        var user_id;

        user_id = formData.user_id + "@" + emailDomain;

        if(emailDomain === "custom"){
            user_id = formData.user_id + "@" + customDomain;
        }
        
        formData.user_id = user_id;



        if (!formData.user_id) {
            setContent("이메일을 입력해주세요.");
            setModalOpen(true);
            setOpenVerify(false);
            return;
        } else if (!emailRegex.test(formData.user_id)) {
            setContent("올바른 이메일 형식이 아닙니다.");
            setModalOpen(true);
            setOpenVerify(false);
            return;
        } else {
            setOpenVerify(true);
            setTimer(180); // 3분
            setTimerActive(true);

            const randomNum = Math.floor(100000 + Math.random() * 900000).toString();
            setEmailVerifyNum(randomNum);
            console.log("Email verification number:", randomNum);

            const user_id = formData.user_id;

            const data = {
                user_id,
                randomNum
            }

            dispatch({
                type: EMAIL_CHECK_REQUEST,
                data: data,
            });
        }

    };

    const onVerify = () => {
        console.log(verifyNum);
        console.log(emailVerifyNum);
        if (verifyNum === emailVerifyNum) {
            setIsVerify(true);
            setContent("이메일 인증에 성공하였습니다.");
            setModalOpen(true);
            setTimerActive(false);
            setOpenVerify(false);
            setEmailVerifyNum("");
            setVerifyNum("");
        } else {
            setContent("인증번호가 틀렸습니다.");
            setModalOpen(true);
        }
    };



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
        } catch (e) {
            console.error(e);

        }
    };


    useEffect(() => {
        let interval;
        if (timerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0 && !isVerify) {
            // 시간 초과 시 처리
            setTimerActive(false);
            setEmailVerifyNum("");
            setVerifyNum("");
            setOpenVerify(false);
            setContent("이메일 인증 시간이 만료되었습니다. 다시 시도해주세요.");
            setModalOpen(true);
        }
        return () => clearInterval(interval);
    }, [timerActive, timer, isVerify]);

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    const onSubmit = async () => {
        if (phoneData.phone_1 && phoneData.phone_2 && phoneData.phone_3) {
            formData.company_ceo_phone = phoneData.phone_1 + "-" + phoneData.phone_2 + "-" + phoneData.phone_3;
        }

        if (!formData.company_number) {
            setContent("사업자등록번호를 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!formData.company_name) {
            setContent("회사명을 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!formData.company_type) {
            setContent("업종을 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!formData.company_count) {
            setContent("사용 예상 인원을 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!formData.company_ceo_name) {
            setContent("대표이름을 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!formData.company_ceo_phone) {
            setContent("연락처를 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!formData.user_id) {
            setContent("아이디(이메일)를(을) 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!formData.user_password) {
            setContent("비밀번호를 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!user_password_check) {
            setContent("비밀번호 확인을 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!(formData.user_password === user_password_check)) {
            setContent("비밀번호가 일치하지 않습니다.");
            setModalOpen(true);
            return;
        }
        dispatch({
            type: JOIN_REQUEST,
            data: formData,
        });
    };

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

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-white">
            <div className="w-full max-w-7xl p-6 bg-white space-y-4">
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
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="(주) TICTEC"
                    />
                </div>

                {/* 업종 */}
                <div>
                    <label className="block text-sm font-medium mb-1">업종 <span className="text-red-500">*</span></label>
                    <select
                        name="company_type"
                        value={formData.company_type}
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
                    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                        {/* 아이디 입력 */}
                        <input
                            type="text"
                            name="user_id"
                            value={formData.user_id}
                            onChange={formDataChange}
                            placeholder="아이디"
                            className="flex-1 px-3 py-2 border rounded-md"
                            readOnly={isVerify}
                        />

                        {/* @ 선택 영역 */}
                        <div className="flex items-center sm:w-auto w-full">
                            <span className="mx-1 text-gray-500">@</span>
                            <select
                                name="emailDomain"
                                value={emailDomain}
                                onChange={(e) => setEmailDomain(e.target.value)}
                                className="flex-1 px-3 py-2 border rounded-md bg-white"
                                disabled={isVerify}
                            >
                                {emailDomains.map((domain) => (
                                    <option key={domain} value={domain}>
                                        {domain === "custom" ? "직접 입력" : domain}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {emailDomain === "custom" && (
                            <input
                                type="text"
                                value={customDomain}
                                onChange={(e) => setCustomDomain(e.target.value)}
                                placeholder="예: mydomain.com"
                                className="w-full sm:w-auto px-3 py-2 border rounded-md mt-1 sm:mt-0"
                                disabled={isVerify}
                            />
                        )}
                    </div>
                    <button
                        onClick={sendEmail}
                        className={`w-full mt-2 py-2 rounded-md text-white ${isVerify ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={isVerify}
                    >
                        {isVerify ? "이메일 인증 완료" : "이메일 인증"}
                    </button>
                    {openVerify && !isVerify && (
                        <>
                            <div className="flex flex-col sm:flex-row mt-2 gap-2 w-full">
                                <input
                                    value={verifyNum}
                                    onChange={(e) => setVerifyNum(e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded-md"
                                    placeholder="인증번호 입력"
                                />
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md whitespace-nowrap"
                                    onClick={onVerify}
                                >
                                    인증
                                </button>
                            </div>

                            <div className="flex mt-2 justify-between items-center">
                                <p className="text-green-600">인증번호가 발송되었습니다.</p>
                                <p className="text-green-600 whitespace-nowrap">{formatTime(timer)}</p>
                            </div>
                        </>
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
