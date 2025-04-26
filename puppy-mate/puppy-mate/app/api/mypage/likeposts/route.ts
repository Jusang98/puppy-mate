import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/utils/auth';
import { SbPostLikeRepository } from '@/infra/repositories/supabase/SbPostLikeRepository';
import { GetLikedPostsWithSnapshotUseCase } from '@/application/usecases/postlike/GetLikePostWithSnapshotUsecase';

export async function GET(request: NextRequest) {
  try {
    // 1. 인증된 유저 ID 추출
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 2. 유스케이스 인스턴스화 및 실행
    const useCase = new GetLikedPostsWithSnapshotUseCase(
      new SbPostLikeRepository()
    );
    const likedPosts = await useCase.execute(userId);

    // 3. 결과 반환
    console.log('좋아! 게시물 in route', likedPosts);
    return NextResponse.json(likedPosts, { status: 200 });
  } catch (error) {
    // 4. 에러 처리
    return NextResponse.json(
      { message: 'Failed to fetch liked posts' },
      { status: 500 }
    );
  }
}
