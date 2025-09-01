import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const AdminSubNavbar = ({ subItems }) => {
    const location = useLocation();
    if (!subItems || subItems.length === 0) return null;
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-full px-6 py-3">
                <div className="flex items-center space-x-1 text-sm">
                    {/* 메인 섹션 표시 */}

                    {/* 서브 네비게이션 */}
                    <div className="flex items-center space-x-4 ml-4">
                        {subItems.map((item, index) => {
                            const isActive = location.pathname.startsWith(item.path);
                            return (
                                <React.Fragment key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-blue-100 text-blue-700 font-semibold'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSubNavbar;