import CoordinateListUsecase from '@/application/usecases/coordinate/CoordinateListUsecase';
import { SbCoordinatesRepository } from '@/infra/repositories/supabase/SbCoordinatesRepository';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    const courseId = Number(id);
    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: 'Invalid course ID format' },
        { status: 400 }
      );
    }

    const coordinateListUsecase = new CoordinateListUsecase(
      new SbCoordinatesRepository()
    );

    const coordinateListDto = await coordinateListUsecase.execute(courseId);

    if (!coordinateListDto) {
      return NextResponse.json(
        { error: 'Coordinates not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(coordinateListDto);
  } catch (error) {
    console.error('Error fetching course coordinates:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
