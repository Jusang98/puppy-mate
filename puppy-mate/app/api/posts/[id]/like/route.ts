import { SbPostLikeRepository } from '@/infra/repositories/supabase/SbPostLikeRepository';
import { getUserIdFromRequest } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

const postLikeRepository = new SbPostLikeRepository();
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromRequest(request);
    const postId = parseInt(params.id);

    if (!userId || !postId) {
      return NextResponse.json(
        { error: 'userId and postId are required' },
        { status: 400 }
      );
    }

    await postLikeRepository.create(userId, postId);

    return NextResponse.json(
      { message: 'Liked successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserIdFromRequest(request);
    const postId = parseInt(params.id);

    if (!userId || !postId) {
      return NextResponse.json(
        { error: 'userId and postId are required' },
        { status: 400 }
      );
    }

    const result = await postLikeRepository.delete(userId, postId);

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to unlike post' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Unliked successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
