import { Link } from "react-router-dom";
import Footer from "../../component/Footer";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-start px-6 py-12 space-y-24">
            {/* Hero Section */}
            <header className="text-center max-w-7xl">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    미래형 출결관리 솔루션,
                    <span className="text-blue-500"> TicTec</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                    GPS기반 출결, 자동 출퇴근 기록까지 산업 현장을 위한 올인원 출결관리 SaaS 플랫폼
                </p>

                <Link
                    to="/join"
                    className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-full text-lg font-semibold"
                >
                    지금 시작하기
                </Link>
            </header>

            {/* Features Section */}
            <section className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    title="GPS 기반 출결"
                    desc="현장 근처에서만 기록 가능한 스마트 출퇴근. 위치 기반 정확한 출결 체크."
                />
                <FeatureCard
                    title="간편한 사용"
                    desc="설치 없이 웹으로 즉시 사용 가능. 누구나 쉽게 접근 가능한 UI."
                />
                <FeatureCard
                    title="관리자 대시보드"
                    desc="출결 정보, 통계, 사용자 관리까지 실시간으로 한눈에."
                />
            </section>

            {/* 기술 신뢰 요소 */}
            <section className="max-w-7xl w-full text-center space-y-6">
                <h2 className="text-2xl font-semibold">기술로 신뢰를 만듭니다</h2>
                <p className="text-gray-400">출결 자동화, 위·변조 방지, 관리자 로그 확인 등 보안 강화</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <FeatureCard title="출결 자동화" desc="지정 시간 자동 체크인/아웃, 휴게시간도 자동 기록" />
                    <FeatureCard title="위치 인증 기술" desc="정확한 위치 기반 API 활용, 반경 제한 가능" />
                    <FeatureCard title="로그 모니터링" desc="관리자 접속 및 변경 이력까지 안전하게 기록" />
                </div>
            </section>

            {/* 고객 사용처 시나리오 */}
            <section className="max-w-7xl w-full text-center space-y-6">
                <h2 className="text-2xl font-semibold">누가 사용하나요?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-left">
                    <UseCase
                        title="제조업/공장"
                        desc="다수의 교대조를 가진 현장에서도 실시간 출퇴근 체크"
                    />
                    <UseCase
                        title="물류/배송"
                        desc="이동이 잦은 직원도 GPS 기반으로 출결 자동 기록"
                    />
                    <UseCase
                        title="외국인 근로자 고용 기업"
                        desc="언어 장벽 없이 단순하고 직관적인 UI 제공"
                    />
                </div>
            </section>

            {/* 통계 / 신뢰 수치 */}
            <section className="max-w-7xl w-full text-center space-y-8">
                <h2 className="text-2xl font-semibold">고객이 말합니다</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Stat label="출결 정확도" value="99.9%" />
                    <Stat label="사용 기업 수" value="240+" />
                    <Stat label="출퇴근 자동 기록율" value="98%" />
                </div>
            </section>

            {/* FAQ 간단 */}
            <section className="max-w-7xl w-full text-center space-y-6">
                <h2 className="text-2xl font-semibold text-center">자주 묻는 질문</h2>
                <FAQ q="앱 설치가 필요한가요?" a="아니요, 웹 기반 서비스로 모든 브라우저에서 동작합니다." />
                <FAQ q="GPS 기록은 안전한가요?" a="사용자 동의 후에만 기록되며, 보안처리되어 저장됩니다." />
                <FAQ q="출근 반경은 설정 가능한가요?" a="관리자가 거리(m 단위)를 설정할 수 있습니다." />
            </section>

            {/* Call to Action */}
            <section className="text-center max-w-7xl w-full space-y-4">
                <h2 className="text-2xl font-semibold">더 스마트하게, 더 간편하게</h2>
                <p className="text-gray-400">지금 가입하고 30일 무료 체험을 시작하세요</p>
                <Link
                    to="/join"
                    className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-medium"
                >
                    무료 체험 시작하기
                </Link>
            </section>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ title, desc }) => (
    <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-300">{desc}</p>
    </div>
);

const UseCase = ({ title, desc }) => (
    <div className="bg-gray-800 bg-opacity-40 p-4 rounded-lg border border-gray-700">
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-sm text-gray-300">{desc}</p>
    </div>
);

const Stat = ({ label, value }) => (
    <div className="text-center">
        <p className="text-3xl font-bold text-blue-400">{value}</p>
        <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
);

const FAQ = ({ q, a }) => (
    <div>
        <p className="font-semibold text-white mb-2">{q}</p>
        <p className="text-sm text-gray-400">{a}</p>
    </div>
);

export default Home;
