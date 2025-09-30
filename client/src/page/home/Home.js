import { Link } from "react-router-dom";
import Footer from "../../component/Footer";

const Home = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-y-auto">
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-bounce delay-1000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>
                
                <div className="relative text-center max-w-6xl mx-auto px-4 sm:px-6 z-10">
                    <div className="inline-block mb-4 sm:mb-6 animate-bounce">
                        <span className="text-sm sm:text-base font-medium text-indigo-700 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg backdrop-blur-sm border border-indigo-200">
                            ✨ 새로운 출결 관리의 시작
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight mb-6 sm:mb-8 tracking-tight animate-fade-in-up">
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">스마트한</span>
                        <br />
                        <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent italic">TicTec</span>
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> 출결관리</span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200 px-2">
                        GPS 기반 정밀 위치 추적부터 자동화된 근태 관리까지,<br className="hidden sm:block" />
                        <span className="sm:hidden"> </span><strong className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">현장을 위한 완전한 출결 솔루션</strong>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up delay-400">
                        <Link
                            to="/join"
                            className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 relative group overflow-hidden"
                        >
                            <span className="relative z-10">30일 무료 체험 시작</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-4 border-2 border-indigo-300 text-indigo-700 text-lg font-medium rounded-full hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-1"
                        >
                            로그인
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 text-center animate-fade-in-up delay-600 px-2">
                        <div className="p-4 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">99.9%</div>
                            <div className="text-gray-700 font-medium text-base sm:text-lg">출결 정확도</div>
                        </div>
                        <div className="p-4 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">240+</div>
                            <div className="text-gray-700 font-medium text-base sm:text-lg">도입 기업</div>
                        </div>
                        <div className="p-4 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">24/7</div>
                            <div className="text-gray-700 font-medium text-base sm:text-lg">실시간 모니터링</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">핵심 기능</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            현장에서 필요한 모든 기능을 직관적이고 간편하게
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="📍"
                            title="GPS 기반 출결"
                            desc="정밀한 위성 감지로 지정된 장소에서만 출근 가능. 위치 찍기로 부정행위를 원천 차단합니다."
                        />
                        <FeatureCard
                            icon="⚡"
                            title="즉시 사용"
                            desc="앱 설치 불필요, 웹 브라우저만 있으면 OK. 간단한 가입 후 바로 사용 가능합니다."
                        />
                        <FeatureCard
                            icon="📊"
                            title="실시간 대시보드"
                            desc="모든 직원의 출근 상황, 근무 시간, 통계를 한 번에 확인. 데이터 기반 결정을 내리세요."
                        />
                    </div>
                </div>
            </section>

            {/* Technology Trust Section */}
            <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent mb-4">기술로 신뢰를 만듭니다</h2>
                        <p className="text-xl text-gray-700">출결 자동화, 위·변조 방지, 관리자 로그 확인 등 보안 강화</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <TechCard
                            icon="🤖"
                            title="완전 자동화"
                            desc="지정된 시간에 자동 체크인/아웃. 휴게시간, 연장근무까지 자동 인식하여 정확한 근무 기록을 생성합니다."
                        />
                        <TechCard
                            icon="🔒"
                            title="고도 보안 시스템"
                            desc="다중 보안 기술로 데이터 담조 방지. 모든 접속과 수정 내역을 실시간 로깅하여 투명한 관리를 지원합니다."
                        />
                        <TechCard
                            icon="🌐"
                            title="글로벌 인프라"
                            desc="AWS 기반 전 세계 서비스. 99.9% 가동률과 24/7 모니터링으로 언제나 안정적인 서비스를 제공합니다."
                        />
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 bg-clip-text text-transparent mb-4">다양한 산업군에서 활용</h2>
                        <p className="text-xl text-gray-700">업종별 특성에 맞춤 출결 관리 솔루션을 제공합니다</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <UseCase
                            icon="🏭"
                            title="제조업 · 공장"
                            desc="24시간 교대 근무와 복잡한 작업 스케줄도 자동화된 출결 시스템으로 간편하게 관리하세요."
                        />
                        <UseCase
                            icon="🚚"
                            title="물류 · 배송"
                            desc="이동이 잦은 외근 직원도 GPS 기반 위치 추적으로 정확한 근무 시간과 장소를 자동 기록합니다."
                        />
                        <UseCase
                            icon="🌍"
                            title="외국인 근로자 고용 기업"
                            desc="언어 장벽을 최소화한 직관적 인터페이스와 다국어 지원으로 쉽게 사용할 수 있습니다."
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">신뢰할 수 있는 수치</h2>
                        <p className="text-xl text-blue-100">전국 240+ 기업이 선택한 TicTec의 뛰어난 성능</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCard label="출결 정확도" value="99.9%" />
                        <StatCard label="도입 기업 수" value="240+" />
                        <StatCard label="자동 기록률" value="98%" />
                        <StatCard label="서비스 가동률" value="99.9%" />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
                        <p className="text-xl text-gray-600">TicTec에 대해 궁금한 내용을 즐거운 방식으로 알아보세요</p>
                    </div>
                    <div className="space-y-6">
                        <FAQ
                            q="앱 설치가 필요한가요?"
                            a="전혀 필요없습니다! 웹 브라우저만 있으면 언제 어디서나 사용 가능하며, 모바일과 PC 모두에서 원활하게 동작합니다."
                        />
                        <FAQ
                            q="기존 출결 시스템과 연동이 가능한가요?"
                            a="네, API를 통해 대부분의 기존 출결 시스템 및 ERP와 연동 가능합니다. 전담 개발자가 연동 지원을 도와드립니다."
                        />
                        <FAQ
                            q="GPS 정보 보안은 어떻게 처리되나요?"
                            a="모든 위치 데이터는 암호화되어 저장되며, 사전 동의 없이는 절대 수집하지 않습니다. 국제 보안 인증(ISO 27001) 기준을 준수합니다."
                        />
                        <FAQ
                            q="비용은 어떻게 체계를 가지고 있나요?"
                            a="사용자 수에 따른 유연한 요금제로 소규모부터 대기업까지 모두 부담 없이 사용할 수 있습니다. 30일 무료 체험도 제공합니다."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-bounce delay-1000"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">지금 시작하세요</h2>
                    <p className="text-2xl text-blue-100 mb-12">
                        단 5분만에 설정 완료, 30일 무료로 모든 기능을 체험해보세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            to="/join"
                            className="px-12 py-5 bg-gradient-to-r from-white to-blue-50 text-indigo-900 text-xl font-bold rounded-full hover:from-blue-50 hover:to-indigo-50 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 relative group overflow-hidden"
                        >
                            <span className="relative z-10">무료로 시작하기 →</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>
                        <div className="text-blue-200 text-sm backdrop-blur-sm bg-white/10 px-6 py-3 rounded-full border border-white/20">
                            ✓ 신용카드 불필요 　 ✓ 설치 불필요 　 ✓ 30일 무료
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="group bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100/50 hover:border-indigo-200 transform hover:-translate-y-3 hover:scale-105 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{icon}</div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4 group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300">{title}</h3>
            <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{desc}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
    </div>
);

const UseCase = ({ icon, title, desc }) => (
    <div className="group bg-gradient-to-br from-white to-purple-50/40 p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 border border-purple-100/60 hover:border-purple-200 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-pink-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        <div className="relative z-10">
            <div className="text-4xl mb-5 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent mb-3 group-hover:from-pink-700 group-hover:to-orange-700 transition-all duration-300">{title}</h4>
            <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{desc}</p>
        </div>
    </div>
);

const TechCard = ({ icon, title, desc }) => (
    <div className="group bg-gradient-to-br from-white to-indigo-50/40 p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 border border-indigo-100/60 hover:border-indigo-200 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        <div className="relative z-10">
            <div className="text-4xl mb-5 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent mb-3 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300">{title}</h4>
            <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{desc}</p>
        </div>
    </div>
);

const StatCard = ({ label, value }) => (
    <div className="text-center group p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 transform hover:scale-105">
        <div className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">{value}</div>
        <div className="text-blue-200 text-sm md:text-base font-medium group-hover:text-white transition-colors duration-300">{label}</div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
);

const FAQ = ({ q, a }) => (
    <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors">{q}</h4>
        <p className="text-gray-600 leading-relaxed">{a}</p>
    </div>
);

export default Home;