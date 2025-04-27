'use client';
import Image from 'next/image';
import { CiLocationArrow1 } from 'react-icons/ci';

function BottomGPSButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className=' bg-white/80 rounded-full p-2 shadow-md cursor-pointer'
      onClick={onClick}
    >
      <CiLocationArrow1 className='rotate-[heading] transition-transform text-2xl ' />
    </button>
  );
}

function CurrentLocationIcon({ heading }: { heading: number | null }) {
  return (
    <div className='bg-white/70 backdrop-blur-md rounded-full w-15 h-15 shadow-lg border-4 border-orange-400 flex items-center justify-center animate-bounce'>
      <Image
        src='/dog.gif'
        alt='걷는 강아지'
        width={0.5}
        height={0.5}
        className='w-10 h-10 object-contain'
      />
    </div>
  );
}

export { BottomGPSButton, CurrentLocationIcon };
