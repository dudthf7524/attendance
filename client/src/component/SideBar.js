// Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

const navigationItems = [
  {
    name: '근태관리',
    path: '/admin/attendance',
    icon: ClipboardDocumentCheckIcon,
    subItems: [
      { name: '출근/퇴근', path: '/admin/attendance' },
    ],
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
  // {
  //   name: '시간관리',
  //   path: '/admin/time/',
  //   icon: ClockIcon,
  //   subItems: [
  //     { name: '시간등록', path: '/admin/time/register' },
  //     { name: '시간목록', path: '/admin/time/list' },
  //   ],
  // },
  {
    name: '설정',
    path: '/admin/setting',
    icon: WrenchScrewdriverIcon,
    subItems: [
      { name: 'GPS 근무지 설정', path: '/admin/setting/workplace' },
    ],
  },
  {
    name: '휴가관리',
    path: '/admin/vacation',
    icon: CalendarDaysIcon,
    subItems: [
      { name: '휴가승인', path: '/admin/vacation' },
    ],
  },
];

export default function Sidebar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const toggleSubMenu = (name) => {
    // 해당 아이템을 찾아서 부모 컴포넌트에 전달

    const clickedItem = navigationItems.find(item => item.name === name);
    if (onMenuClick && clickedItem) {
      onMenuClick(clickedItem);
    }

    // 페이지 이동 - 서브아이템이 있으면 첫 번째 서브아이템으로, 없으면 메인 경로로
    if (clickedItem) {
      if (clickedItem.subItems && clickedItem.subItems.length > 0) {
        navigate(clickedItem.subItems[0].path);
      } else {
        navigate(clickedItem.path);
      }
    }

    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div
      className={`bg-neutral-700 border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white">(주) creamoff</h1>
        )}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-full text-white"
        >
          <ChevronRightIcon
            className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'
              }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <div key={item.name}>
              <button
                onClick={() => toggleSubMenu(item.name)}
                className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md ${isActive
                  ? 'text-white bg-neutral-800'
                  : 'text-white hover:bg-neutral-800 hover:text-white'
                  }`}
              >
                <div className="flex items-center px-2 py-2">
                  <item.icon
                    className={`h-6 w-6 flex-shrink-0 ${isActive
                      ? 'text-white'
                      : 'text-white'
                      } ${!isCollapsed ? 'mr-3' : ''}`}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                </div>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 bg-neutral-800 border-t text-white text-sm">
        {!isCollapsed && 'admin v1.0.0'}
      </div>
    </div>
  );
}
