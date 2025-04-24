'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUpload, FaUser } from 'react-icons/fa';
import { GiDogHouse } from 'react-icons/gi';
import { LuDog } from 'react-icons/lu';
import { ImUpload } from 'react-icons/im';
export default function RootFooter() {
  const pathname = usePathname();
  // 로그인, 회원가입 페이지는 푸터 숨김
  const hiddenPaths = ['/login', '/signup', '/admin'];
  if (hiddenPaths.includes(pathname)) return null;

  const navItems = [
    { href: '/', icon: <GiDogHouse size={24} />, label: '홈' },
    { href: '/upload', icon: <ImUpload size={24} />, label: '업로드' },
    { href: '/mypage', icon: <LuDog size={24} />, label: '내정보' },
  ];

  return (
    <footer className='fixed bottom-0 left-0 w-full bg-white border-t z-[9999]'>
      <nav className='flex justify-around items-center h-16'>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center transition-colors duration-200 ${
                isActive ? 'text-orange-500' : 'text-gray-700'
              }`}
            >
              {item.icon}
              <span className={`text-xs mt-1 ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
