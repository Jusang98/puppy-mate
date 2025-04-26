'use client';

export const PostDetailSkeleton = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      {/* Header Skeleton */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded-md w-3/4 animate-pulse" />
          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="h-4 bg-gray-200 rounded-md w-1/3 mt-2 animate-pulse" />
      </div>

      {/* Map Stats Skeleton */}
      <div className="flex flex-col items-start mx-auto" style={{ width: 300 }}>
        <div className="flex w-full p-2 gap-4 bg-gray-100 rounded-t-lg">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse" />
          </div>
        </div>

        {/* Map Skeleton */}
        <div className="w-full h-[300px] bg-gray-200 animate-pulse" />
      </div>

      {/* Image Carousel Skeleton */}
      <div className="relative">
        <div className="flex gap-1 overflow-hidden">
          {[1, 2, 3].map((_, index) =>
            <div key={index} className="flex-1">
              <div className="relative p-1">
                <div className="aspect-square bg-gray-200 rounded-lg border-2 border-gray-100 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-100">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md w-2/3 animate-pulse" />
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="h-10 bg-gray-200 rounded-md w-28 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded-md w-20 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-md w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
