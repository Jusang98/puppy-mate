import { CourseListDto } from '@/application/usecases/course/dto/CourseListDto';
import CourseListUsecase from '@/application/usecases/course/CourseListUsecase';
import { SbCourseRepository } from '@/infra/repositories/supabase/SbCourseRepository';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const southWestLat = searchParams.get('southWestLat');
        const southWestLng = searchParams.get('southWestLng');
        const northEastLat = searchParams.get('northEastLat');
        const northEastLng = searchParams.get('northEastLng');

        if (!southWestLat || !southWestLng || !northEastLat || !northEastLng) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 422 });
        }

        const courseListUsecase = new CourseListUsecase(new SbCourseRepository());

        const courseListDto: CourseListDto = await courseListUsecase.execute(
            parseFloat(southWestLat),
            parseFloat(southWestLng),
            parseFloat(northEastLat),
            parseFloat(northEastLng)
        );
        return NextResponse.json(courseListDto);
    } catch (error) {
        console.log('Error fetching course list:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
