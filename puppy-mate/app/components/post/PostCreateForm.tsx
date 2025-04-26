import { useState, useRef } from 'react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { createPost } from '@/api/post';
import { useCoordinatesQuery } from '@/queries/Coordinate';
import SnapShotMap from '@/app/components/map/SnapShotMap';
import useKakaoLoader from '@/lib/use-kakao-loader';
import { useSearchParams } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { PostFormSkeleton } from '@/app/post/[id]/components/PostFormSkeleton';

export default function PostForm() {
  const searchParams = useSearchParams();
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const courseId = parseInt(searchParams.get('courseId') ?? '0', 10);
  const { coordinatesQuery } = useCoordinatesQuery(courseId);
  useKakaoLoader();
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  const handleBackClick = () => {
    window.history.back();
  };
  const handleSaveBtnClick = () => {
    const postId = createPost(courseId, title, content, images);
    postId.then(id => {
      window.location.href = `/post/${id}`;
    }).catch(error => {
      console.error('Failed to create post:', error);
    });
  };

  if (coordinatesQuery.isLoading) {
    return <PostFormSkeleton />;
  }
  
  if (coordinatesQuery.error) return (
    <div className="w-full p-4 bg-orange-50 text-orange-600 rounded-lg text-center">
      코스 정보를 불러오는 중 오류가 발생했습니다
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-1">산책 기록 공유</h1>
        <p className="text-gray-500 text-sm">반려견과의 산책을 기록하고 공유해봐요</p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="제목을 입력해주세요!"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border-0 border-b-2 border-orange-200 focus:border-orange-500 focus:ring-0 rounded-none px-0 py-2 w-full text-lg font-medium transition-colors duration-200"
          />
        </div>
      </div>

      {coordinatesQuery.data && (
        <SnapShotMap coordinates={coordinatesQuery?.data.coordinates} size={300}/>
      )}

      {/* Hidden file input */}
      <Input
        ref={fileInputRef}
        id="imageUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Images section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-700">사진</h3>
          <button
            onClick={triggerFileInput}
            className="flex items-center gap-1 text-xs text-orange-500 cursor-pointer hover:text-orange-700"
          >
            <FaCamera size={14} /> 추가하기
          </button>
        </div>

        {previewUrls.length > 0 ? (
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {previewUrls.map((url, index) => (
                  <CarouselItem key={index} className="basis-1/3 sm:basis-1/3 md:basis-1/3">
                    <div className="relative p-1">
                      <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-orange-100">
                        <Image
                          src={url}
                          alt={`uploaded-${index}`}
                          fill
                          className="object-cover"
                        />
                        <button 
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition-colors duration-200"
                        >
                          <RxCross2  size={14} />
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {previewUrls.length > 3 && (
                <>
                  <CarouselPrevious className="left-0 bg-white/80 hover:bg-white text-orange-500 hover:text-orange-700 border-orange-200" />
                  <CarouselNext className="right-0 bg-white/80 hover:bg-white text-orange-500 hover:text-orange-700 border-orange-200" />
                </>
              )}
            </Carousel>
          </div>
        ) : (
          <div 
            onClick={triggerFileInput} 
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/50 transition-all duration-200"
          >
            <div className="bg-orange-50 p-3 rounded-full mb-2">
              <FaPlus size={18} className="text-orange-500" />
            </div>
            <p className="text-sm text-gray-500">반려견, 산책로 사진 등등 자유롭게 올려봐요</p>
          </div>
        )}
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">내용</h3>
        <Textarea
          className="w-full min-h-[150px] resize-none border-2 border-orange-100 focus:ring-1 focus:ring-orange-500 focus:border-orange-400 rounded-lg p-3 shadow-sm transition-colors duration-200"
          placeholder="반려견과 산책하기 좋은지, 반려견 친구들은 많은지 자세히 공유해주시면 좋아요!"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <Button 
          onClick={()=>handleBackClick()}
          variant="ghost" 
          className="flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <IoMdArrowRoundBack />
          <span className="ml-1">뒤로가기</span>
        </Button>
        <Button
          onClick={handleSaveBtnClick}
          disabled={!title || !content}
          className="bg-orange-500 text-white hover:bg-orange-600 transition-colors py-2 px-4 rounded-lg flex items-center gap-2 disabled:bg-orange-300"
        >
          <IoSend size={16} />
          <span>게시하기</span>
        </Button>
      </div>
    </div>
    )
}