import { CreatePostDto } from '@/application/usecases/posts/dto/CreatePostDto';
import CreatePostUsecase from '@/application/usecases/posts/CreatePostUsecase';
import { SbCourseRepository } from '@/infra/repositories/supabase/SbCourseRepository';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 1, courseId, title, content } = body;
    if (!userId || !courseId || !title) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 422 });
    }
    const createPostDto = new CreatePostDto(userId, courseId, title, content);
    const createPostUsecase = new CreatePostUsecase(
      new SbPostRepository(),
      new SbCourseRepository()
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
