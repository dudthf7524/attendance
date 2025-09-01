import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../component/SideBar';
import Navbar from '../component/Navbar';
import AdminSubNavbar from '../component/AdminSubNavbar';

const navigationItems = [
  {
    name: '근태관리',
    path: '/admin/attendance',
    subItems: [
      { name: '출근/퇴근', path: '/admin/attendance' },
    ],
  },
  {
    name: '직원관리',
    path: '/admin/employee',
    subItems: [
      { name: '직원등록', path: '/admin/employee/register' },
      { name: '직원목록', path: '/admin/employee/list' },
    ],
  },
  // {
  //   name: '시간관리',
  //   path: '/admin/time',
  //   subItems: [
  //     { name: '시간등록', path: '/admin/time/register' },
  //     { name: '시간목록', path: '/admin/time/list' },
  //   ],
  // },
  {
    name: '설정',
    path: '/admin/setting',
    subItems: [
      { name: 'GPS 근무지 설정', path: '/admin/setting/workplace' },
    ],
  },
  {
    name: '휴가관리',
    path: '/admin/vacation',
    subItems: [
      { name: '휴가승인', path: '/admin/vacation' },
    ],
  },
];

export default function AdminLayout() {
  const location = useLocation();
  const [currentNavItem, setCurrentNavItem] = useState(null);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(null);

  useEffect(() => {
    // 현재 경로를 기반으로 활성화된 네비게이션 아이템 찾기
    const activeItem = navigationItems.find(item =>
      location.pathname.startsWith(item.path)
    );
    setCurrentNavItem(activeItem);
    setSelectedSidebarItem(activeItem);
  }, [location.pathname]);

  // 사이드바에서 메뉴 클릭 핸들러
  const handleSidebarItemClick = (item) => {
    setSelectedSidebarItem(item);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar onMenuClick={handleSidebarItemClick} />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* 서브 네비게이션 바 - 사이드바에서 선택된 아이템의 서브메뉴 표시 */}
          {selectedSidebarItem && selectedSidebarItem.subItems && selectedSidebarItem.subItems.length > 0 && (
            <AdminSubNavbar
              subItems={selectedSidebarItem.subItems}
              mainTitle={selectedSidebarItem.name}
            />
          )}

          {/* 메인 컨텐츠 */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
