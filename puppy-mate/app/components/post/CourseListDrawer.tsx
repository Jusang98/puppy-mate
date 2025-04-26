'use client';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerPortal
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import CoursePostList from '@/app/components/post/CoursePostList';
import useCoursesMapStore from '@/store/useCoursesMapStore';
import { useCourseIdPostQuery } from '@/queries/CourseIdPost';
import { useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface CourseListDrawerProps {
  snapPoints: number[];
  snapPoint: number | string | null;
  onSnapPointChange: (snapPoint: number | string | null) => void;
}

function CourseListDrawer({
  snapPoints,
  snapPoint,
  onSnapPointChange
}: CourseListDrawerProps) {
  const {
    courseIds,
    courseCoordinates,
    clearCourseCoordinates
  } = useCoursesMapStore();
  const { posts, isLoading, isError, errors } = useCourseIdPostQuery(courseIds);

  // 바텀 시트 바깥 클릭시 스냅 포인트 변경
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onSnapPointChange(snapPoints[0]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Drawer
      open={true}
      modal={false}
      direction="bottom"
      snapPoints={snapPoints}
      activeSnapPoint={snapPoint}
      setActiveSnapPoint={onSnapPointChange}
    >
      <DrawerPortal>
        <DrawerContent ref={drawerRef} className="h-full -translate-y-15">
          {courseCoordinates.length > 0 &&
            <div className="absolute -top-11 left-1/2 transform -translate-x-1/2 z-10">
              <Badge
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 bg-orange-100/90 border-orange-300 hover:bg-orange-200/90 shadow-md rounded-full"
              >
                <span className="text-orange-700 font-medium">따라가는 중...</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full bg-orange-50 hover:bg-orange-200 p-0"
                  onClick={() => {
                    clearCourseCoordinates();
                    onSnapPointChange(0.7);
                  }}
                >
                  <X className="h-3 w-3 text-orange-700" />
                </Button>
              </Badge>
            </div>}
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-md font-medium">
              {posts.length > 0
                ? `산책로 ${posts.length}개`
                : <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3em'
                    }}
                  >
                    <Image
                      src="/marker.png"
                      alt="발바닥"
                      width={50}
                      height={50}
                      className="-mr-[9px]"
                      style={{
                        width: '2.5em',
                        height: '2.5em',
                        objectFit: 'contain'
                      }}
                    />
                    를 클릭해서 탐색해보세요!
                  </span>}
            </DrawerTitle>
          </DrawerHeader>
          <CoursePostList
            posts={posts}
            isLoading={isLoading}
            isError={isError}
            errors={errors}
          />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

export default CourseListDrawer;
