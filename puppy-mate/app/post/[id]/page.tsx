'use client';
import { usePostQuery } from '@/queries/Post';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SnapShotMap from '@/app/components/map/SnapShotMap';
import useKakaoLoader from '@/lib/use-kakao-loader';
import { formatDate } from '@/utils/common';
import { deletePost } from '@/api/post';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { likePost, unlikePost } from '@/api/postlike';
import { LuTimer } from 'react-icons/lu';
import { FaShoePrints } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import { PostDetailSkeleton } from './components/PostDetailSkeleton';

export default function PostDetailPage() {
  const { id } = useParams();
  const postId = id as string;
  const { post, isLoading, error, refetch } = usePostQuery(postId);
  useKakaoLoader();
  const router = useRouter();

  if (isLoading) return <PostDetailSkeleton />;

  if (error)
    return (
      <div className='w-full p-4 bg-orange-50 text-orange-600 rounded-lg text-center'>
        포스트를 불러오는 중 오류가 발생했습니다
      </div>
    );

  if (!post)
    return (
      <div className='w-full p-4 bg-orange-50 text-orange-600 rounded-lg text-center'>
        포스트를 찾을 수 없습니다
      </div>
    );

  const handleDeleteBtnClick = async () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;
    try {
      const result = await deletePost(postId);
      if (result.isSuccess) {
        alert(result.message);
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleEditClick = () => {
    if (postId) {
      router.push(`/post/${postId}/edit`);
    }
  };

  const handleLikeBtnClick = async () => {
    try {
      const targetPostId = parseInt(postId);
      if (post.hasLiked) {
        await unlikePost(targetPostId);
      } else {
        await likePost(targetPostId);
      }
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBackClick = () => {
    router.push(`/mypage/posts`);
  };
  return (
    <div className='flex flex-col w-full max-w-md mx-auto p-6 bg-white'>
      {/* Content 영역 */}
      <div className='flex flex-col space-y-6 pb-20'>
        {/* Header */}
        <div className='mb-5'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-bold text-orange-600 mb-1'>
              {post.title}
            </h1>
            <div className='flex items-center gap-1'>
              {post.hasLiked ? (
                <HiHeart
                  onClick={handleLikeBtnClick}
                  className='text-red-500 cursor-pointer'
                  size={24}
                />
              ) : (
                <HiOutlineHeart
                  onClick={handleLikeBtnClick}
                  className='text-gray-500 cursor-pointer hover:text-red-500 transition-colors'
                  size={24}
                />
              )}
            </div>
          </div>
          <p className='text-gray-500 text-xs'>
            작성일: {post.createdAt ? formatDate(post.createdAt) : ''}
          </p>
        </div>

        {/* Map */}
        {post.coordinates && (
          <div
            className='flex flex-col items-start mx-auto'
            style={{ width: 300 }}
          >
            <div className='flex w-fit p-2 gap-4 bg-orange-50 rounded-t-lg text-orange-600'>
              <div className='flex items-center gap-1'>
                <LuTimer className='text-l text-orange-500' />
                <span className='text-gray-700 text-sm'>{post.duration}분</span>
              </div>
              <div className='flex items-center gap-1'>
                <FaShoePrints className='rotate-[-90deg] text-l text-orange-500' />
                <span className='text-gray-700 text-sm'>{post.distance}km</span>
              </div>
            </div>

            <SnapShotMap coordinates={post.coordinates} size={300} />
          </div>
        )}

        {/* Image Carousel */}
        {post.images && post.images.length > 0 && (
          <div className='relative'>
            <Carousel className='w-full'>
              <CarouselContent>
                {post.images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className='basis-1/3 sm:basis-1/3 md:basis-1/3'
                  >
                    <div className='relative p-1'>
                      <div className='aspect-square relative rounded-lg overflow-hidden border-2 border-orange-100'>
                        <Image
                          src={image}
                          alt={`Post image ${index + 1}`}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {post.images.length > 3 && (
                <>
                  <CarouselPrevious className='left-0 bg-white/80 hover:bg-white text-orange-500 hover:text-orange-700 border-orange-200' />
                  <CarouselNext className='right-0 bg-white/80 hover:bg-white text-orange-500 hover:text-orange-700 border-orange-200' />
                </>
              )}
            </Carousel>
          </div>
        )}

        {/* Content */}
        <div className='bg-orange-50/50 p-4 rounded-lg border-2 border-orange-100'>
          <p className='whitespace-pre-wrap text-gray-700'>{post.content}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-between items-center pt-4 border-t border-gray-100'>
        <Button
          onClick={handleBackClick}
          variant='ghost'
          className='flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg'
        >
          <IoMdArrowRoundBack />
          <span className='ml-1'>뒤로가기</span>
        </Button>

        {post.isWriter && (
          <div className='flex gap-2'>
            <Button
              onClick={handleEditClick}
              variant='outline'
              className='flex items-center gap-1 border-orange-200 hover:bg-orange-50'
            >
              <MdEdit size={16} />
              <span>수정</span>
            </Button>
            <Button
              onClick={handleDeleteBtnClick}
              variant='destructive'
              className='flex items-center gap-1'
            >
              <MdDelete size={16} />
              <span>삭제</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
