import { CreateUserDto } from '@/application/usecases/user/dto/CreateUserDto';
import CreateUserUsecase from '@/application/usecases/user/CreateUserUsecase';

import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, nickname, profileImageUrl } = body;

    if (!email || !password || !nickname) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 422 });
    }

    const createUserDto: CreateUserDto = {
      email: email,
      password: password,
      nickname: nickname,
      profileImageUrl: profileImageUrl || '',
    };

    const createUserUsecase = new CreateUserUsecase(
      new SbUserRepository(),
      createUserDto
    );
    const newUser = await createUserUsecase.execute(createUserDto);

    // 새로운 사용자가 생성된 후, 'userId' 반환
    return NextResponse.json(
      { message: 'Member created successfully', data: { userId: newUser } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { message: 'Failed to create member', error },
      { status: 500 }
    );
  }
}
