'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import useMapStore from '@/store/useMapStore';
import { getCenterAndLevel } from '@/app/(map)/utils/getCenterAndLevel';

interface SaveCourseModalProps {
  open: boolean;
  onSave: (name: string) => void;
  onOpenChange: (open: boolean) => void;
}

export function SaveCourseModal({ open, onSave, onOpenChange }: SaveCourseModalProps) {
  const [courseName, setCourseName] = useState('');
  const { clearCourse, stopRecordingCourse, coordinates } = useMapStore();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const staticKakaoMapRef = useRef<kakao.maps.StaticMap | null>(null);
  const [capturedImg, setCapturedImg] = useState<string | null>(null);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseName(value);
  };

  useEffect(() => {
    if (open && mapContainerRef.current && coordinates.length > 0 && window.kakao?.maps) {
      // Get center and level for the map
      const { center, level } = getCenterAndLevel(coordinates);

      // Convert to Kakao LatLng objects
      const courseCoords = coordinates.map((coord) => new window.kakao.maps.LatLng(coord.lat, coord.lng));

      const staticMapOption = {
        center,
        level,
        marker: false,
        path: [
          {
            points: courseCoords,
            strokeWeight: 4,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
          },
        ],
      };

      // Clear any existing map
      if (staticKakaoMapRef.current) {
        // No direct way to destroy StaticMap, so we clear the element content
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
        }
      }

      // Create new map instance
      staticKakaoMapRef.current = new window.kakao.maps.StaticMap(mapContainerRef.current, staticMapOption);
    }
  }, [coordinates, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>경로 저장</DialogTitle>
          <DialogDescription>경로 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input name="name" placeholder="코스 이름" onChange={handleNameInputChange} />
        </div>
        <div className="w-full h-[300px] bg-gray-100 rounded" ref={mapContainerRef}></div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                clearCourse();
                onOpenChange(false);
              }}
              variant="secondary">
              경로 초기화
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              stopRecordingCourse();
              onSave(courseName);
              onOpenChange(false);
            }}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
