'use client';
import { Switch } from '@/components/ui/switch';
import useMapStore from '@/store/useRecordingMapStore';

export function WalkStateToggle({ onToggle }: { onToggle: () => void }) {
  const { isSavingCourse } = useMapStore();

  return (
    <div
      className={`inline-flex h-[40px] items-center gap-2 ${isSavingCourse
        ? 'bg-orange-100/90 border-orange-300 hover:bg-orange-200/90'
        : 'bg-white/90 border-gray-100 hover:bg-gray-50'} px-4 py-2 rounded-full shadow-md border transition-all duration-300`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={'none'}
        stroke={isSavingCourse ? '#f97316' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span
        className={`font-medium text-sm ${isSavingCourse
          ? 'text-orange-700'
          : 'text-gray-700'} transition-colors duration-300`}
      >
        {isSavingCourse ? '기록 중...' : '기록하기'}
      </span>
      <Switch
        className={`data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-600 scale-90`}
        checked={isSavingCourse}
        onCheckedChange={onToggle}
      />
    </div>
  );
}
