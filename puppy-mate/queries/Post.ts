<<<<<<< HEAD
import { getPost } from '@/api/post';
import { PostDto } from '@/application/usecases/post/dto/PostDto';
import { useQuery } from '@tanstack/react-query';

export const usePostQuery = (postId: string) => {
  const postQuery = useQuery<PostDto>({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    enabled: !!postId, // postId가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    retry: 1 // 실패시 1번만 재시도
  });

  return {
    post: postQuery.data,
    isLoading: postQuery.isLoading,
    error: postQuery.error
=======
import { CoursePost } from '@/types/Post';
import { getPostsByCourseId } from '@/api/post';
import { useQuery, useQueries } from '@tanstack/react-query';

// 코스 아이디로 게시물 조회
export const usePostQuery = (courseIds: number[]) => {
  const results = useQueries({
    queries: courseIds.map((id) => ({
      queryKey: ['post', id],
      queryFn: () => getPostsByCourseId(id),
      // default는 0분마다 리패치, 5분마다 데이터 유지
      // staleTime: 5 * 60 * 1000, // 5 minutes
      // cacheTime: 10 * 60 * 1000, // 10 minutes
    })),
  });

  // 모든 쿼리의 상태
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const errors = results.filter((result) => result.error).map((result) => result.error);
  const isSuccess = results.every((result) => result.isSuccess);

  // 모든 쿼리 데이터를 하나의 배열로 합침
  const posts = isSuccess ? results.flatMap((result) => result.data || []) : [];

  // 모든 쿼리 리패치 (필요 없을 듯?)
  // const refetchAll = async () => {
  //   const refetchPromises = results.map((result) => result.refetch());
  //   return Promise.all(refetchPromises);
  // };

  return {
    results,
    posts,
    isLoading,
    isError,
    errors,
    isSuccess,
>>>>>>> c3e3dad (feat: cluster 클릭시postStore 에 post들 저장)
  };
};
