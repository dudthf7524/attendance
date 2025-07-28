import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/logout';

export default function Navbar({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { auth } = useSelector((state) => state.auth);
    const menuItems = auth?.auth_code === 'A3'
        ? ['로그아웃']
        : ['관리자', '근로자', '로그아웃'];
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogout = () => {
        dispatch({
            type: LOGOUT_REQUEST,
        });
    };

    console.log("auth", auth)
    const handleMenuClick = (item) => {
        if (item === '로그아웃') {
            handleLogout();
        } else {
            // 예시: 메뉴 항목에 따라 다른 페이지 이동
            if (item === '관리자') navigate('/admin/attendance');
            if (item === '근로자') navigate('/attendance');
        }

        setIsDropdownOpen(false);
    };

    function login() {
        navigate('/login');
    }

    function join() {
        navigate('/join');
    }

    return (
        <nav className=" shadow-sm border-b border-gray-200">
            <div className="max-w-[100%] px-4 sm:px-6 lg:px-8">
                <div className="flex py-4 justify-between items-center">
                    <Link to="/" className="font-bold text-2xl text-blue-600">
                        tictec
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-6">
                        {/* <button className="relative rounded-full p-1 text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button> */}
                        {
                            auth ? (
                                <p>
                                    {auth.user_info.user_name}님 환영합니다.
                                </p>
                            ) : (
                                <>
                                    <Link to="/join" className="relative rounded-full p-1 text-gray-400 hover:text-gray-500">
                                        회원가입
                                    </Link>

                                    <Link to="/login" className="relative rounded-full p-1 text-gray-400 hover:text-gray-500">
                                        로그인
                                    </Link>
                                </>

                            )
                        }



                        {/* User Icon with border on click */}
                        <div className="relative">
                            {
                                auth ? (
                                    <button
                                        onClick={toggleDropdown}
                                        className={`flex items-center rounded-full p-1 transition duration-150 ease-in-out ${isDropdownOpen ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                                            }`}
                                    >
                                        {user?.avatar ? (
                                            <img className="h-8 w-8 rounded-full" src={user.avatar} alt="User" />
                                        ) : (
                                            <UserCircleIcon className="h-8 w-8 text-gray-400" />
                                        )}
                                    </button>

                                ) : (
                                    <></>
                                )
                            }


                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-200 z-50">
                                    {menuItems.map((item) => (
                                        <button
                                            key={item}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleMenuClick(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile button */}
                    <div className="sm:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-100"
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isMobileMenuOpen && (
                <div className="sm:hidden px-4 pt-2 pb-3 space-y-1">
                    {
                        auth ? (
                            <>
                                {menuItems.map((item) => (
                                    <button
                                        key={item}
                                        className="block w-full text-left text-gray-700 py-2 hover:bg-gray-100"
                                        onClick={() => handleMenuClick(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={login}
                                    className="block w-full text-left text-gray-400 hover:text-gray-500 py-2"
                                >
                                    로그인

                                </button>
                                <button
                                    onClick={join}
                                    className="block w-full text-left text-gray-400 hover:text-gray-500 py-2"
                                >
                                    회원가입

                                </button>
                            </>
                        )
                    }

                </div>
            )}
        </nav>
    );
}
