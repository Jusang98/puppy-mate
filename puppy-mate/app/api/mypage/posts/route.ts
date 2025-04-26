import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/utils/auth';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';
import GetPostsByUserIdUsecase from '@/application/usecases/post/GetMyPostsUsecase.ts';

export async function GET(request: NextRequest) {
  try {
    // 1. 인증된 유저 ID 추출
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 2. 유스케이스 인스턴스화 및 실행
    const useCase = new GetPostsByUserIdUsecase(new SbPostRepository());
    const userPosts = await useCase.execute(userId);

    // 3. 결과 반환
    return NextResponse.json(userPosts, { status: 200 });
  } catch (error) {
    // 4. 에러 처리
    return NextResponse.json(
      { message: 'Failed to fetch user posts' },
      { status: 500 }
    );
  }
}
