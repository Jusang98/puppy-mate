import { useRouter } from 'next/navigation';
import { IoChevronBackOutline } from 'react-icons/io5';

interface MypageheaderProps {
  title?: string;
}

export default function Mypageheader({ title }: MypageheaderProps) {
  const router = useRouter();

  const handleBackBtnClick = () => {
    router.back();
  };

  return (
    <div className="h-[60px] relative p-4 bg-white flex items-center justify-center border-b">
      <button
        onClick={handleBackBtnClick}
        className="absolute left-4 p-1"
        aria-label="뒤로가기"
      >
        <IoChevronBackOutline size={24} />
      </button>
      {title &&
        <h1 className="text-lg font-semibold">
          {title}
        </h1>}
    </div>
  );
}
