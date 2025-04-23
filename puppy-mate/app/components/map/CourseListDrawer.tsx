'use client';

import { useState } from 'react';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerPortal } from '@/components/ui/drawer';
import CoursePostList from '@/app/components/post/CoursePostList';
import useCoursePostStore from '@/store/useCoursePostStore';

function CourseListDrawer() {
  // Set snap points to 40% and 90% of screen height, with a minimum height option
  const snapPoints = [0.3, 0.7, 1];
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  // Control the open state of the drawer
  const [isOpen, setIsOpen] = useState(true);

  // Handle open state changes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // When trying to close, instead snap to the first point
      setSnap(snapPoints[0]);
    } else {
      setIsOpen(open);
    }
  };

  const { posts } = useCoursePostStore();

  return (
    <Drawer
      open={isOpen}
      onOpenChange={handleOpenChange}
      modal={false}
      direction="bottom"
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}>
      <DrawerPortal>
        <DrawerContent className="h-full">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-md font-medium">코스 {(posts || []).length}개</DrawerTitle>
          </DrawerHeader>
          <CoursePostList />
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
