import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ChevronRightIcon,
    ChevronDownIcon,
    ClipboardDocumentCheckIcon,
    UsersIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const navigationItems = [
    {
        name: '근태관리',
        path: '/admin/attendance',
        icon: ClipboardDocumentCheckIcon,
        subItems: []
    },
    {
        name: '직원관리',
        path: '/admin/employee',
        icon: UsersIcon,
        subItems: [
            { name: '직원등록', path: '/admin/employee/register' },
            { name: '직원목록', path: '/admin/employee/list' },
        ]
    },
    {
        name: '시간관리',
        path: '/admin/time',
        icon: ClockIcon,
        subItems: []
    },
];

export default function Sidebar({ isCollapsed, toggleCollapse }) {
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});

    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
    const toggleSubMenu = (name) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div
                className={`hidden sm:flex bg-gray-50 border-r border-gray-200 flex-col h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
            >
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 px-4 flex items-center">
                        {!isCollapsed && (
                            <div className="h-8 w-auto font-bold text-xl text-blue-600">
                                관리자 페이지
                            </div>
                        )}
                        <button
                            onClick={toggleCollapse}
                            className="p-1 rounded-full text-gray-400 ml-auto hover:bg-gray-100"
                        >
                            <ChevronRightIcon
                                className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
                            />
                        </button>
                    </div>
                    <nav className="mt-8 flex-1 px-2 space-y-1">
                        {navigationItems.map((item) => {
                            const isActive = location.pathname.startsWith(item.path);
                            const isExpanded = expandedMenus[item.name];
                            const hasSubItems = item.subItems.length > 0;

                            return (
                                <div key={item.name}>
                                    {hasSubItems ? (
                                        <button
                                            onClick={() => toggleSubMenu(item.name)}
                                            className={`group w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <item.icon
                                                    className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                                        }`}
                                                    aria-hidden="true"
                                                />
                                                {!isCollapsed && <span>{item.name}</span>}
                                            </div>
                                            {!isCollapsed && (
                                                isExpanded ? (
                                                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                                                ) : (
                                                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                                                )
                                            )}
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`}
                                        >
                                            <item.icon
                                                className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                                    }`}
                                                aria-hidden="true"
                                            />
                                            {!isCollapsed && <span>{item.name}</span>}
                                        </Link>
                                    )}

                                    {/* 하위 메뉴 표시 */}
                                    {!isCollapsed && hasSubItems && isExpanded && (
                                        <div className="ml-8 mt-1 space-y-1">
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    className={`block px-3 py-1 text-sm rounded-md ${location.pathname === subItem.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex-shrink-0 p-4 border-t border-gray-200">
                    {!isCollapsed && (
                        <div className="text-sm text-gray-500">master v1.0.0</div>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="sm:hidden">
                <button
                    onClick={toggleMobile}
                    className="fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow"
                >
                    <ChevronRightIcon
                        className={`h-6 w-6 transition-transform ${isMobileOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>

                <div
                    className={`fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 shadow-md z-40 transition-transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="p-4 text-xl font-bold text-blue-600 border-b">
                        Master
                    </div>
                    <nav className="px-4 pt-4 space-y-2">
                        {navigationItems.map((item) => {
                            const isActive = location.pathname.startsWith(item.path);
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                                >
                                    <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    );
}
