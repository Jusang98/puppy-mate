'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiDogHouse } from 'react-icons/gi';
import { LuDog } from 'react-icons/lu';
import { ImUpload } from 'react-icons/im';
import { IoPawSharp } from 'react-icons/io5';
import { TbHomeFilled } from 'react-icons/tb';
import { BiSolidHomeHeart } from 'react-icons/bi';

export default function RootFooter() {
  const pathname = usePathname();
  // 로그인, 회원가입 페이지는 푸터 숨김
  const hiddenPaths = ['/login', '/signup', '/admin'];
  if (hiddenPaths.includes(pathname)) return null;

  const navItems = [
    {
      href: '/mypage/likeposts',
      icon: <IoPawSharp size={24} />,
      label: '발자국남기기',
    },
    { href: '/', icon: <BiSolidHomeHeart size={24} />, label: '홈' },
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
