const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-700 pt-6 mt-16 text-sm text-gray-400 mb-6">
            <div className="max-w-2xl mx-auto px-4 grid grid-cols-1 md:grid-cols-1 gap-y-2 gap-x-8">
                <div>
                    <p className="font-semibold">상호명</p>
                    <p>크림오프(주)</p>
                </div>
                <div>
                    <p className="font-semibold">대표자</p>
                    <p>권도혁</p>
                </div>
                <div>
                    <p className="font-semibold">주소</p>
                    <p>경북 경산시 삼풍로 27, 경북테크노파크 글로벌벤처동 309호</p>
                </div>
                <div>
                    <p className="font-semibold">사업자번호</p>
                    <p>514-87-03021</p>
                </div>
                <div>
                    <p className="font-semibold">이메일</p>
                    <p>creamoff2021@naver.com</p>
                </div>
                <div className="md:col-span-2 mt-2">
                    <p className="text-center md:text-left">
                        © 2025 CREAMOFF Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
