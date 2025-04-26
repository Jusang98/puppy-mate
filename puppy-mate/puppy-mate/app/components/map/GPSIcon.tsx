'use client';
import { CiLocationArrow1 } from 'react-icons/ci';

function BottomGPSButton({ onClick }: { onClick: () => void }) {
  return (
    <button className=" bg-white/80 rounded-full p-2 shadow-md cursor-pointer" onClick={onClick}>
      <CiLocationArrow1 className="rotate-[heading] transition-transform text-2xl " />
    </button>
  );
}

function CurrentLocationIcon({ heading }: { heading: number | null }) {
  return (
    <div className="z-20 bg-orange-300/80 rounded-full p-2 shadow-md">
      <CiLocationArrow1 className={`rotate-${heading || 0} transition-transform text-2xl`} />
    </div>
  );
}

export { BottomGPSButton, CurrentLocationIcon };
