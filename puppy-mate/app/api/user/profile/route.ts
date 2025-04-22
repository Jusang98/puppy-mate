import { NextRequest, NextResponse } from 'next/server';
import GetUserUsecase from '@/application/usecases/user/GetUserUsecase';
import { SbUserRepository } from '@/infra/repositories/supabase/SbUserRepository';
import { SbStorageRepository } from '@/infra/repositories/supabase/SbStorageRepository';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // 1. 헤더에서 JWT 추출
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // 2. JWT 검증 및 userId 추출
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: number;
      };
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.userId;

    // 3. 유즈케이스 실행
    const getUserUsecase = new GetUserUsecase(
      new SbUserRepository(),
      new SbStorageRepository()
    );
    const user = await getUserUsecase.execute(userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 4. 유저 정보 응답
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return NextResponse.json(
      { message: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
