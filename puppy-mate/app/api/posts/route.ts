import { CreatePostDto } from '@/application/usecases/post/dto/CreatePostDto';
import CreatePostUsecase from '@/application/usecases/post/CreatePostUsecase';
import { SbCourseRepository } from '@/infra/repositories/supabase/SbCourseRepository';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';
import { NextRequest, NextResponse } from 'next/server';

import { SbPostImageRepository } from '@/infra/repositories/supabase/SbPostImageRepository';
import { SbStorageRepository } from '@/infra/repositories/supabase/SbStorageRepository';
import GetPostsByCourseIdUsecase from '@/application/usecases/post/GetPostsByCourseIdUsecase';
import { SbCoordinatesRepository } from '@/infra/repositories/supabase/SbCoordinatesRepository';
import { getUserIdFromRequest } from '@/utils/auth';
export const dynamic = 'force-dynamic';
// 코스 아이디로 게시물 조회
// 게시물의 정보와 코스의 좌표 정보를 함께 반환
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const courseIdParam = searchParams.get('courseId');

    if (!courseIdParam) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 422 }
      );
    }

    const courseId = parseInt(courseIdParam);
    if (isNaN(courseId)) {
      return NextResponse.json({ error: 'Invalid course ID' }, { status: 422 });
    }

    const getPostsByCourseIdUsecase = new GetPostsByCourseIdUsecase(
      new SbPostRepository(),
      new SbCourseRepository(),
      new SbCoordinatesRepository()
    );
    const posts = await getPostsByCourseIdUsecase.execute(courseId);

    if (!posts || posts.length === 0) {
      return NextResponse.json(posts, { status: 200 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error getting posts by course ID:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const courseId = Number(formData.get('courseId'));
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const images = formData.getAll('images') as File[];

    const createPostDto = new CreatePostDto(
      userId,
      courseId,
      title,
      content,
      images
    );
    const createPostUsecase = new CreatePostUsecase(
      new SbPostRepository(),
      new SbCourseRepository(),
      new SbPostImageRepository(),
      new SbStorageRepository()
    );
    const newPostId = await createPostUsecase.execute(createPostDto);
    return NextResponse.json(
      { message: '게시물 작성이 완료되었습니다.', newPostId },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error create Post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
