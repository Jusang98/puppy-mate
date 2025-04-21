import { CreateUserDto } from '@/application/usecases/course/dto/CreateUserDto';
import CreateUserUsecase from '@/application/usecases/course/CreateUserUseCase';

import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { NextResponse } from 'next/server';
import { create } from 'domain';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, nickname, profileImageUrl } = body;
    if (!email || !password || !nickname) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 422 });
    }
    const createUserDto: CreateUserDto = {
      email: body.username as string,
      password: body.password as string,
      nickname: body.nickname as string,
      profileImageUrl: body.profileImageUrl as string,
    };

    const createUserUsecase = new CreateUserUsecase(
      new SbUserRepository(),
      createUserDto
    );
    const newUser = await createUserUsecase.execute(createUserDto);

    return NextResponse.json(
      { message: 'Member created successfully', data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { message: 'Failed to create member' },
      { status: 500 }
    );
  }
}
