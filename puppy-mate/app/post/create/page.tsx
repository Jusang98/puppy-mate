'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createPost } from '@/api/post';
import { useCoordinatesQuery } from '@/queries/Coordinate';
import SnapShotMap from '@/app/components/map/SnapShotMap';
import useKakaoLoader from '@/lib/use-kakao-loader';
import { useSearchParams } from 'next/navigation';

export default function PostForm() {
  const searchParams = useSearchParams();
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 코스 ID 추출
  const courseId = parseInt(searchParams.get('courseId') ?? '0', 10);

  // 좌표 쿼리
  const { coordinatesQuery } = useCoordinatesQuery(courseId);
  useKakaoLoader();

  // 이미지 미리보기 URL 해제 (cleanup)
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // 이미지 업로드 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  // 등록 버튼 클릭 핸들러
  const handleSaveBtnClick = async () => {
    if (isSaving) return;
    if (!courseId) {
      alert('코스 정보가 없습니다.');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    setIsSaving(true);
    try {
      const postId = await createPost(courseId, title, content, images);
      window.location.href = `/post/${postId}`;
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('게시글 등록에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 로딩/에러 처리
  if (coordinatesQuery.isLoading) return <div>Loading...</div>;
  if (coordinatesQuery.error) return <div>Error loading coordinates</div>;

  return (
    <div className='w-full max-w-md mx-auto p-4 space-y-4'>
      <div className='text-center space-y-1'>
        <h2 className='text-xl font-bold'>포스트 작성하기</h2>
        <Input
          placeholder='제목을 입력해주세요!'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {coordinatesQuery.data && (
        <SnapShotMap
          coordinates={coordinatesQuery.data.coordinates}
          size={300}
        />
      )}

      {/* 이미지 캐러셀 */}
      <Carousel className='w-full'>
        <CarouselContent>
          {previewUrls.map((url, index) => (
            <CarouselItem key={index} className='basis-1/3'>
              <div className='aspect-square relative rounded-lg overflow-hidden'>
                <Image
                  src={url}
                  alt={`uploaded-${index}`}
                  fill
                  className='object-cover'
                />
              </div>
            </CarouselItem>
          ))}
          {/* 업로드 버튼 */}
          <CarouselItem className='basis-1/3'>
            <Label
              htmlFor='imageUpload'
              className='flex items-center justify-center aspect-square border rounded-lg cursor-pointer hover:bg-gray-100'
            >
              +
            </Label>
            <Input
              id='imageUpload'
              type='file'
              accept='image/*'
              multiple
              onChange={handleImageChange}
              className='hidden'
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* 텍스트 입력 */}
      <Textarea
        className='w-full min-h-[100px] resize-none'
        placeholder='산책이 어땠는지 공유해주세요'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className='flex justify-between'>
        <Button
          variant='ghost'
          type='button'
          onClick={() => window.history.back()}
        >
          ← 이전
        </Button>
        <Button onClick={handleSaveBtnClick} disabled={isSaving}>
          {isSaving ? '등록 중...' : '등록'}
        </Button>
      </div>
    </div>
  );
}
