'use client';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerPortal } from '@/components/ui/drawer';
import CoursePostList from '@/app/components/post/CoursePostList';
import useCoursesMapStore from '@/store/useCoursesMapStore';
import { useCourseIdPostQuery } from '@/queries/CourseIdPost';
interface CourseListDrawerProps {
  snapPoints: number[];
  snapPoint: number | string | null;
  onSnapPointChange: (snapPoint: number | string | null) => void;
}

function CourseListDrawer({ snapPoints, snapPoint, onSnapPointChange }: CourseListDrawerProps) {
  const { courseIds } = useCoursesMapStore();
  const { posts } = useCourseIdPostQuery(courseIds);

  return (
    <Drawer
      open={true}
      modal={false}
      direction="bottom"
      snapPoints={snapPoints}
      activeSnapPoint={snapPoint}
      setActiveSnapPoint={onSnapPointChange}>
      <DrawerPortal>
        <DrawerContent className="h-full">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-md font-medium">코스 {(posts || []).length}개</DrawerTitle>
          </DrawerHeader>
          <CoursePostList posts={posts} />
          {/* <div className="px-4 flex-1 overflow-y-auto">
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <span className="block font-medium">코스 1</span>
                <span className="text-sm text-gray-600">2.5km · 30분</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="block font-medium">코스 2</span>
                <span className="text-sm text-gray-600">1.8km · 20분</span>
              </div>
              <div className="rounded-lg border p-3">
                <span className="block font-medium">코스 3</span>
                <span className="text-sm text-gray-600">3.2km · 45분</span>
              </div>
            </div>
          </div> */}
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}

export default CourseListDrawer;
