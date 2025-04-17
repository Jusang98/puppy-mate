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
import { useState, useRef } from 'react';
import useMapStore from '@/store/useMapStore';
import { Map, Polyline, MapProps } from 'react-kakao-maps-sdk';
import html2canvas from 'html2canvas';
interface SaveCourseModalProps {
  open: boolean;
  onSave: (name: string, imageUrl: string | undefined) => void;
  onOpenChange: (open: boolean) => void;
  modalMapOption: MapProps;
}

export function SaveCourseModal({
  open,
  onSave,
  onOpenChange,
  modalMapOption,
}: SaveCourseModalProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [courseName, setCourseName] = useState('');
  const { clearCourse, stopRecordingCourse, coordinates } = useMapStore();

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseName(value);
  };

  const handleCapture = async () => {
    try {
      if (mapRef.current) {
        const canvas = await html2canvas(mapRef.current!, {
          useCORS: true,
          ignoreElements: (el) => {
            const computedStyle = window.getComputedStyle(el);
            return computedStyle.color.includes('oklch');
          },
        });
        const imageUrl = canvas.toDataURL('image/png');
        return imageUrl;
      }
    } catch (error) {
      console.error('Error capturing the map:', error);
      return undefined;
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>경로 저장</DialogTitle>
          <DialogDescription>경로 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className='space-y-3'>
          <Input
            name='name'
            placeholder='코스 이름'
            onChange={handleNameInputChange}
          />
        </div>

        <div ref={mapRef} className='w-[300px] h-[300px] overflow-auto mx-auto'>
          <Map
            className='w-full h-full bg-gray-100 rounded'
            center={modalMapOption.center}
            level={modalMapOption.level}
            draggable={false}
            zoomable={false}
            disableDoubleClick={true}
            disableDoubleClickZoom={true}
          >
            <Polyline
              path={coordinates} // 폴리라인 경로
              strokeWeight={5} // 선 두께
              strokeColor='#FF0000' // 선 색상
              strokeOpacity={0.8} // 선 투명도
              strokeStyle='solid' // 선 스타일
            />
          </Map>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                clearCourse();
                stopRecordingCourse();
                onOpenChange(false);
              }}
              variant='secondary'
            >
              경로 초기화
            </Button>
          </DialogClose>
          <Button
            onClick={async () => {
              stopRecordingCourse();
              const imageUrl = await handleCapture();
              console.log('imageUrl', imageUrl);
              onSave(courseName, imageUrl);
              onOpenChange(false);
            }}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
