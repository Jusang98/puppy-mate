'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createPost } from '@/api/post';

export default function PostForm() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  const handleSaveBtnClick = () => {
    createPost(1, 29, title, content, images);
  };
  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold">포스트 작성하기</h2>
        <Input
          placeholder="제목을 입력해주세요!"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      {/* Carousel for images */}
      <Carousel className="w-full">
        <CarouselContent>
          {previewUrls.map((url, index) =>
            <CarouselItem key={index} className="basis-1/3">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt={`uploaded-${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          )}

          {/* Upload button as last item */}
          <CarouselItem className="basis-1/3">
            <Label
              htmlFor="imageUpload"
              className="flex items-center justify-center aspect-square border rounded-lg cursor-pointer hover:bg-gray-100"
            >
              +
            </Label>
            <Input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Textarea */}
      <Textarea
        className="w-full min-h-[100px] resize-none"
        placeholder="산책이 어땠는지 공유해주세요"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <div className="flex justify-between">
        <Button variant="ghost">← 이전</Button>
        <Button onClick={handleSaveBtnClick}>등록</Button>
      </div>
    </div>
  );
}
