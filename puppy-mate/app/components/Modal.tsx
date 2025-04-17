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
import { Map, Polyline } from 'react-kakao-maps-sdk';

interface SaveCourseModalProps {
  open: boolean;
  onSave: (name: string) => void;
  onOpenChange: (open: boolean) => void;
}

export function SaveCourseModal({ open, onSave, onOpenChange }: SaveCourseModalProps) {
  const [courseName, setCourseName] = useState('');
  const { clearCourse, stopRecordingCourse, coordinates } = useMapStore();
  const [isStaticMapLoaded, setIsStaticMapLoaded] = useState(false);

  // 리액트 카카오맵용 상태
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapLevel, setMapLevel] = useState<number | null>(null);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseName(value);
  };

  useEffect(() => {
    if (!open) return;

    if (coordinates.length > 0) {
      try {
        // 센터와 줌 레벨 계산
        const { center, level } = getCenterAndLevel(coordinates);

        // 리액트 카카오맵에서 사용할 형식으로 변환
        setMapCenter({ lat: center.getLat(), lng: center.getLng() });
        setMapLevel(level);

        setIsStaticMapLoaded(true);
      } catch (error) {
        console.error('지도 데이터 준비 오류:', error);
      }
    }
  }, [open, coordinates]);

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

        {mapCenter && mapLevel ? (
          <div className="w-[300px] h-[300px] overflow-auto mx-auto">
            <Map
              className="w-full h-full bg-gray-100 rounded"
              center={mapCenter}
              level={mapLevel}
              draggable={false}
              zoomable={false}
              disableDoubleClick={true}
              disableDoubleClickZoom={true}>
              {!isStaticMapLoaded && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">지도를 불러오는 중...</p>
                </div>
              )}
              <Polyline
                path={coordinates} // 폴리라인 경로
                strokeWeight={5} // 선 두께
                strokeColor="#FF0000" // 선 색상
                strokeOpacity={0.8} // 선 투명도
                strokeStyle="solid" // 선 스타일
              />
            </Map>
          </div>
        ) : (
          <div className="w-full h-[300px] bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">좌표 데이터를 준비하는 중...</p>
          </div>
        )}

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
