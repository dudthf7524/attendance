import { Link, useLocation } from 'react-router-dom';
import {
    ClockIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';

export default function BottomBar() {
    const location = useLocation();

    const navigation = [


        {
            name: "출퇴근 기록",
            icon: ClockIcon,
            path: '/attendance',
        },
        {
            name: "내정보",
            icon: UserCircleIcon,
            path: '/mypage',
        },

    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-evenly bg-white py-[10px] border-t border-[#aaaaaa]">
            {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex-1 flex flex-col items-center justify-center ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <item.icon
                            className={`h-6 w-6 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                            aria-hidden="true"
                        />
                        <span className="mt-1 text-xs">{item.name}</span>
                    </Link>
                );
            })}
        </div>

    );
}
