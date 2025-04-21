import { UpdatePostDto } from '@/application/usecases/posts/dto/UpdatePostDto';
import UpdatePostUsecase from '@/application/usecases/posts/UpdatePostUsecase';
import { SbPostRepository } from '@/infra/repositories/supabase/SbPostRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = 1, id, title, content } = body;
    if (!userId || !id || !title) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 422 });
    }
    const createPostDto = new UpdatePostDto(title, content);
    const createPostUsecase = new UpdatePostUsecase(new SbPostRepository());
    const { postId, isSuccess } = await createPostUsecase.execute(
      id,
      createPostDto
    );
    return NextResponse.json(
      {
        message: 'Post created successfully',
        postId: postId,
        isSuccess: isSuccess
      },
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
