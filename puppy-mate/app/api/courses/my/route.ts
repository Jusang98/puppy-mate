import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/utils/auth';
import { SbCourseRepository } from '@/infra/repositories/supabase/SbCourseRepository';
import GetMyCoursesUsecase from '@/application/usecases/course/GetMyCoursesUsecase';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const getMyCoursesUsecase = new GetMyCoursesUsecase(
      new SbCourseRepository()
    );
    const myCourses = await getMyCoursesUsecase.execute(userId);

    return NextResponse.json(myCourses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch my courses' },
      { status: 500 }
    );
  }
}
