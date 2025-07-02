// Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const navigationItems = [
  {
    name: '근태관리',
    path: '/admin/attendance',
    icon: ClipboardDocumentCheckIcon,
    subItems: [],
  },
  {
    name: '직원관리',
    path: '/admin/employee',
    icon: UsersIcon,
    subItems: [
      { name: '직원등록', path: '/admin/employee/register' },
      { name: '직원목록', path: '/admin/employee/list' },
    ],
  },
  {
    name: '시간관리',
    path: '/admin/time',
    icon: ClockIcon,
    subItems: [
      { name: '시간등록', path: '/admin/time/register' },
      { name: '시간목록', path: '/admin/time/list' },
    ],
  },
  {
    name: '설정',
    path: '/admin/setting',
    icon: WrenchScrewdriverIcon,
    subItems: [
      { name: 'GPS 근무지 설정', path: '/admin/setting/gps' },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const toggleSubMenu = (name) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-blue-600">관리자</h1>
        )}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
        >
          <ChevronRightIcon
            className={`h-5 w-5 transition-transform ${
              isCollapsed ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const isExpanded = expandedMenus[item.name];
          const hasSubItems = item.subItems.length > 0;

          return (
            <div key={item.name}>
              {hasSubItems ? (
                <button
                  onClick={() => toggleSubMenu(item.name)}
                  className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`h-6 w-6 flex-shrink-0 ${
                        isActive
                          ? 'text-blue-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      } ${!isCollapsed ? 'mr-3' : ''}`}
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
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 flex-shrink-0 ${
                      isActive
                        ? 'text-blue-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    } ${!isCollapsed ? 'mr-3' : ''}`}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )}

              {/* Sub Items */}
              {!isCollapsed && hasSubItems && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={`block px-3 py-1 text-sm rounded-md ${
                        location.pathname === subItem.path
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
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

      {/* Footer */}
      <div className="p-4 border-t text-gray-400 text-sm">
        {!isCollapsed && 'admin v1.0.0'}
      </div>
    </div>
  );
}
