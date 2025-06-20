import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-6 py-12">
            {/* Hero Section */}
            <header className="text-center max-w-2xl">
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
            <section className="mt-20 max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">GPS 기반 출결</h3>
                    <p className="text-sm text-gray-300">
                        현장 근처에서만 기록 가능한 스마트 출퇴근. 위치 기반 정확한 출결 체크.
                    </p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">간편한 사용</h3>
                    <p className="text-sm text-gray-300">
                        직관적인 UI.
                    </p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">관리자 대시보드</h3>
                    <p className="text-sm text-gray-300">
                        모든 출결 정보를 한눈에 확인. 관리자 권한 설정 및 실시간 데이터 확인 가능.
                    </p>
                </div>
            </section>

            {/* Call to Action */}
            <footer className="mt-24 text-center">
                <h2 className="text-2xl font-semibold mb-4">더 스마트하게, 더 간편하게</h2>
                <p className="text-gray-400 mb-6">지금 가입하고 30일 무료 체험을 시작하세요</p>
                <Link
                    to="/join"
                    className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-medium"
                >
                    무료 체험 시작하기
                </Link>
            </footer>
        </div>
    );
};

export default Home;
