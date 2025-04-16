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
import { useState } from 'react';
import useMapStore from '@/store/useMapStore';

interface SaveCourseModalProps {
  open: boolean;
  onSave: (name: string) => void;
  onOpenChange: (open: boolean) => void;
}

export function SaveCourseModal({ open, onSave, onOpenChange }: SaveCourseModalProps) {
  const [courseName, setCourseName] = useState('');

  const { clearCourse, stopRecordingCourse } = useMapStore();

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseName(value);
  };

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
