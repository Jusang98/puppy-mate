'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoPawSharp } from 'react-icons/io5';
import { BiSolidHomeHeart } from 'react-icons/bi';
import { LuDog } from 'react-icons/lu';

export default function RootFooter() {
  const pathname = usePathname();
  const hiddenPaths = ['/login', '/signup', '/admin'];
  if (hiddenPaths.includes(pathname)) return null;

  // 토큰 상태를 useState로 관리
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const t = localStorage.getItem('authToken');
      setToken(t);
    }
  }, []);

  // 토큰에 따라 navItems 분기
  const navItems = [
    token
      ? {
          href: '/mypage/courses',
          icon: <IoPawSharp size={24} />,
          label: '발자국남기기',
        }
      : {
          href: '/login',
          icon: <IoPawSharp size={24} />,
          label: '발자국남기기',
        },
    { href: '/', icon: <BiSolidHomeHeart size={24} />, label: '홈' },
    token
      ? { href: '/mypage', icon: <LuDog size={24} />, label: '내정보' }
      : { href: '/login', icon: <LuDog size={24} />, label: '로그인' },
  ];

  return (
    <footer className='fixed bottom-0 left-0 w-full bg-white border-t z-[9999]'>
      <nav className='flex justify-around items-center h-16'>
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={`${item.href}-${item.label}-${idx}`}
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
