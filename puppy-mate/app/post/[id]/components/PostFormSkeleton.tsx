import { Skeleton } from '@/components/ui/skeleton';

// 게시물 등록, 수정 스켈레톤
export function PostFormSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <div className="text-center mb-6">
        {/* Title skeleton */}
        <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>

      <div className="space-y-4">
        {/* Title input skeleton */}
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Map skeleton */}
      <div className="rounded-xl overflow-hidden shadow-md border-2 border-gray-100">
        <Skeleton className="w-full h-64" />
        <Skeleton className="h-6 w-full" />
      </div>

      {/* Images section skeleton */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center">
          <Skeleton className="h-12 w-12 rounded-full mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Textarea skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="w-full h-36 rounded-lg" />
      </div>

      {/* Buttons skeleton */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
