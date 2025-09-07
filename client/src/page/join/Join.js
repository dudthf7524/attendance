import { useState, useEffect } from "react";
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
    const [user_password_check, setPasswordCheck] = useState("a");
    const [checkPassword, setCheckPassword] = useState(false);
    const [openVerify, setOpenVerify] = useState(false);
    const [verifyNum, setVerifyNum] = useState("");
    const [emailVerifyNum, setEmailVerifyNum] = useState("");
    const [isVerify, setIsVerify] = useState(false);
    const [isBizVerified, setIsBizVerified] = useState(false);
    const [isVerifyingBiz, setIsVerifyingBiz] = useState(false);
    const [timer, setTimer] = useState(180);
    const [timerActive, setTimerActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

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
    });

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
            setTimer(180);
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

    const nextStep = () => {
        if (currentStep === 1) {
            if (phoneData.phone_1 && phoneData.phone_2 && phoneData.phone_3) {
                formData.company_ceo_phone = phoneData.phone_1 + "-" + phoneData.phone_2 + "-" + phoneData.phone_3;
            }

            if (!formData.company_number) {
                setContent("사업자등록번호를 입력해주세요");
                setModalOpen(true);
                return;
            }
            if (!isBizVerified) {
                setContent("사업자등록번호 인증을 완료해주세요");
                setModalOpen(true);
                return;
            }
            if (!formData.company_name) {
                setContent("회사명을 입력해주세요");
                setModalOpen(true);
                return;
            }
            if (!formData.company_type) {
                setContent("업종을 선택해주세요");
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
            setCurrentStep(2);
        }
    };

    const prevStep = () => {
        setCurrentStep(1);
    };

    const onSubmit = async () => {
        if (!formData.user_id) {
            setContent("아이디(이메일)를(을) 입력해주세요");
            setModalOpen(true);
            return;
        }
        if (!isVerify) {
            setContent("이메일 인증을 완료해주세요");
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-black flex flex-col items-center justify-center p-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xl max-w-2xl w-full space-y-6 backdrop-blur-sm">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        TicTec 회원가입
                    </h1>
                    <p className="text-gray-600">미래형 출결관리 솔루션에 가입하여 시작하세요</p>
                    
                    {/* 진행 단계 표시 */}
                    <div className="flex items-center justify-center mt-6 space-x-4">
                        <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                                currentStep >= 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-400'
                            }`}>
                                1
                            </div>
                            <span className="ml-2 text-sm font-medium">회사정보</span>
                        </div>
                        <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                        <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                                currentStep >= 2 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-400'
                            }`}>
                                2
                            </div>
                            <span className="ml-2 text-sm font-medium">계정정보</span>
                        </div>
                    </div>
                </div>

                {/* 1단계: 회사 정보 */}
                {currentStep === 1 && (
                    <div className="space-y-5">
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                사업자등록번호 <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    name="company_number"
                                    value={formData.company_number}
                                    onChange={formDataChange}
                                    type="text"
                                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 ${isBizVerified ? 'bg-green-50 border-green-300 text-green-800' : 'border-gray-200'}`}
                                    placeholder="숫자로 이루어진 10자리 값만 가능"
                                    readOnly={isBizVerified}
                                />
                                {isBizVerified && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={verifyBusinessNumber}
                                disabled={isBizVerified}
                                className={`w-full mt-3 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${isBizVerified ? 'bg-green-500 text-white cursor-not-allowed shadow-lg' : isVerifyingBiz ? 'bg-blue-400 text-white cursor-wait' : 'border border-gray-300 shadow-lg hover:shadow-xl'}`}
                            >
                                {isBizVerified ? "✓ 사업자 등록번호 인증 완료" : isVerifyingBiz ? "⏳ 인증 중..." : "🔍 사업자 등록번호 인증"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    회사명 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={formDataChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    placeholder="(주) TICTEC"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    업종 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="company_type"
                                    value={formData.company_type}
                                    onChange={formDataChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                >
                                    {BIZ_TYPES.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    사용 예상 인원 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="company_count"
                                    value={formData.company_count}
                                    onChange={formDataChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    placeholder="10"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    대표이름 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="company_ceo_name"
                                    value={formData.company_ceo_name}
                                    onChange={formDataChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    placeholder="김틱택"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                연락처 <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-3 w-full items-center justify-between">
                                <input
                                    type="text"
                                    name="phone_1"
                                    maxLength={3}
                                    value={phoneData.phone_1}
                                    onChange={phoneDataChange}
                                    className="w-1/3 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 text-center focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    placeholder="010"
                                />
                                <span className="text-gray-400 font-medium">-</span>
                                <input
                                    type="text"
                                    name="phone_2"
                                    maxLength={4}
                                    value={phoneData.phone_2}
                                    onChange={phoneDataChange}
                                    className="w-1/3 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 text-center focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    placeholder="1234"
                                />
                                <span className="text-gray-400 font-medium">-</span>
                                <input
                                    type="text"
                                    name="phone_3"
                                    maxLength={4}
                                    value={phoneData.phone_3}
                                    onChange={phoneDataChange}
                                    className="w-1/3 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 text-center focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    placeholder="5678"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                onClick={nextStep}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            >
                                다음 단계 →
                            </button>
                        </div>
                    </div>
                )}

                {/* 2단계: 계정 정보 */}
                {currentStep === 2 && (
                    <div className="space-y-5">
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                아이디(이메일) <span className="text-red-500">*</span>
                            </label>
                            <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        name="user_id"
                                        value={formData.user_id}
                                        onChange={formDataChange}
                                        placeholder="아이디"
                                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 ${isVerify ? 'bg-green-50 border-green-300 text-green-800' : 'border-gray-200'}`}
                                        readOnly={isVerify}
                                    />
                                    {isVerify && (
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center sm:w-auto w-full gap-2">
                                    <span className="text-gray-600 font-medium">@</span>
                                    <select
                                        name="emailDomain"
                                        value={emailDomain}
                                        onChange={(e) => setEmailDomain(e.target.value)}
                                        className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
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
                                        className="w-full sm:w-auto px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200 mt-1 sm:mt-0"
                                        disabled={isVerify}
                                    />
                                )}
                            </div>
                            <button
                                onClick={sendEmail}
                                className={`w-full mt-3 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${isVerify ? 'bg-green-500 text-white cursor-not-allowed shadow-lg' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl'}`}
                                disabled={isVerify}
                            >
                                {isVerify ? "✓ 이메일 인증 완료" : "📧 이메일 인증"}
                            </button>
                            {openVerify && !isVerify && (
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                                        <input
                                            value={verifyNum}
                                            onChange={(e) => setVerifyNum(e.target.value)}
                                            className="flex-1 px-4 py-3 bg-white border-2 border-blue-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200"
                                            placeholder="인증번호 입력"
                                        />
                                        <button
                                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap shadow-lg"
                                            onClick={onVerify}
                                        >
                                            ✓ 인증
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center bg-white rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            <p className="text-gray-700 text-sm font-medium">인증번호가 발송되었습니다.</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-orange-600 text-sm font-bold">{formatTime(timer)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    비밀번호 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="user_password"
                                    value={formData.user_password}
                                    onChange={formDataChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    placeholder="비밀번호를 입력하세요"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    비밀번호 확인 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={user_password_check}
                                    onChange={(e) => {
                                        setPasswordCheck(e.target.value);
                                        setCheckPassword(e.target.value !== formData.user_password);
                                    }}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                                    placeholder="비밀번호를 다시 입력하세요"
                                />
                            </div>
                        </div>
                        
                        {checkPassword && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-red-600 font-medium">비밀번호가 일치하지 않습니다.</p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button 
                                onClick={prevStep}
                                className="flex-1 py-4 bg-gray-500 hover:bg-gray-600 text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            >
                                ← 이전
                            </button>
                            <button 
                                onClick={onSubmit} 
                                className="flex-1 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            >
                                🎉 가입하기
                            </button>
                        </div>
                    </div>
                )}
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