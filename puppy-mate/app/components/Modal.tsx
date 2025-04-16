'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LatLng } from '@/store/useMapStore';

interface SaveCourseModalProps {
  open: boolean;
  onSave: (
    data: {
      name: string;
      courseImageUrl: string;
      address: string;
      distance: number;
      duration: number;
      coordinates: LatLng[];
    }
  ) => void;
  coordinates: LatLng[];
}

export function SaveCourseModal({ open, onSave }: SaveCourseModalProps) {
  const [form, setForm] = useState({
    name: '',
    courseImageUrl: '',
    address: '',
    distance: 0,
    duration: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'distance' || name === 'duration' ? Number(value) : value
    }));
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>경로 저장</DialogTitle>
          <DialogDescription>경로 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input name="name" placeholder="코스 이름" onChange={handleChange} />
          <Input
            name="courseImageUrl"
            placeholder="이미지 URL"
            onChange={handleChange}
          />
          <Input name="address" placeholder="주소" onChange={handleChange} />
          <Input
            name="distance"
            placeholder="거리 (숫자)"
            type="number"
            onChange={handleChange}
          />
          <Input
            name="duration"
            placeholder="소요시간 (분)"
            type="number"
            onChange={handleChange}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button
            onClick={() => {
              onSave(form);
            }}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
