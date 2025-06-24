import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

export default function Navbar({ user, onLogout }) {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuItems, setMenuItems] = useState(['Profile', 'Settings', 'Logout']);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const { auth } = useSelector((state) => state.auth);

    const handleLogout = () => {
        if (onLogout) onLogout();
        navigate('/login');
    };

    const handleMenuClick = (item) => {
        setMenuItems((prev) => prev.filter((i) => i !== item));
        if (item === 'Logout') handleLogout();
        setIsDropdownOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
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
                                    {auth.user_name}님 환영합니다.
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
                                    {menuItems.length === 0 && (
                                        <div className="px-4 py-2 text-sm text-gray-400">모든 항목 제거됨</div>
                                    )}
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
                    {menuItems.map((item) => (
                        <button
                            key={item}
                            className="block w-full text-left text-gray-700 py-2 hover:bg-gray-100"
                            onClick={() => handleMenuClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}
