import { CourseListDto } from '@/application/usecases/course/dto/CourseListDto';
import { SbCourseRepository } from '@/infra/repositories/supabase/SbCourseRepository';
import { NextResponse, NextRequest } from 'next/server';
import CreateCourseUsecase from '@/application/usecases/course/CreateCourseUsecase';
import { SbCoordinatesRepository } from '@/infra/repositories/supabase/SbCoordinatesRepository';
import { CreateCourseDto } from '@/application/usecases/course/dto/CreateCourseDto';
import CourseListIsPublicUsecase from '@/application/usecases/course/CourseListIsPublicUsecase';
import { CourseListIsPublicDto } from '@/application/usecases/course/dto/CourseListIsPublicDto';
import jwt from 'jsonwebtoken';

// JWT에서 userId 추출 함수
function getUserIdFromRequest(request: NextRequest): number | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export async function GET() {
  try {
    const courseListUsecase = new CourseListIsPublicUsecase(
      new SbCourseRepository()
    );
    const courseListIsPublicDto: CourseListIsPublicDto[] =
      await courseListUsecase.execute();
    return NextResponse.json(courseListIsPublicDto);
  } catch (error) {
    console.log('Error fetching course list:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // userId 추출
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, address, distance, duration, coordinates } = body;
    if (!name || address === undefined || !distance || !duration) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 422 });
    }
    const createCourseDto = new CreateCourseDto(
      userId,
      name,
      address,
      distance,
      duration,
      coordinates
    );
    const createCourseUsecase = new CreateCourseUsecase(
      new SbCourseRepository(),
      new SbCoordinatesRepository()
    );
    const newCourse = await createCourseUsecase.execute(createCourseDto);

    return NextResponse.json(
      { message: 'Course created successfully', newCourse },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error create course:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
