import { Course } from '@/domain/entities/Course';
import { CourseRepository } from '@/domain/repositories/CourseRepository';
import { createClient } from '@/utils/supabase/server';
import { CourseView } from '@/domain/entities/CourseView';
export class SbCourseRepository implements CourseRepository {
    async findInBounds(
        southWestLat: number,
        southWestLng: number,
        northEastLat: number,
        northEastLng: number
    ): Promise<Course[]> {
        const supabase = await createClient();

        const query = supabase
            .from('course_coordinates')
            .select(
                `
                id,
                route_id,
                lat,
                lng,
                point_order,
                courses (*)
            `
            )
            .filter('courses.is_public', 'eq', true)
            .gte('lat', southWestLat)
            .lte('lat', northEastLat)
            .gte('lng', southWestLng)
            .lte('lng', northEastLng)
            .order('point_order', { ascending: true });

        const { data, error } = await query;

        if (error) {
            throw new Error('Method not implemented.');
        }

        return data.map((row: any) => ({
            id: row.id,
            userId: row.user_id,
            name: row.name,
            courseImageUrl: row.course_image_url,
            address: row.address,
            isPublic: row.is_public,
            distance: row.distance,
            duration: row.duration,
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at), // Added updatedAt property
            coordinates: {
                lat: row.lat,
                lng: row.lng,
            },
        })) as Course[];
    }

    async findById(id: number): Promise<Course | null> {
        // Implementation for finding a course by ID
        throw new Error('Method not implemented.');
    }

    async findAllByUserId(userId: number): Promise<Course[]> {
        // Implementation for finding all courses by user ID
        throw new Error('Method not implemented.');
    }

    async create(course: CourseView): Promise<CourseView> {
        const supabase = await createClient();
    
        try {
            // 1. courses 테이블에 경로 정보 저장
            const { data: courseData, error: courseError } = await supabase
                .from('courses')
                .insert({
                    user_id: course.userId,
                    name: course.name,
                    course_image_url: course.courseImageUrl,
                    address: course.address,
                    is_public: course.isPublic,
                    distance: course.distance,
                    duration: course.duration,
                })
                .select()
                .single();
    
            if (courseError) {
                console.error('Error inserting course:', courseError);
                throw new Error('Failed to insert course.');
            }
    
            // 2. course_coordinates 테이블에 좌표 데이터 저장
            const coordinates = course.coordinates.map((coord, index) => ({
                route_id: courseData.id,
                lat: coord.lat,
                lng: coord.lng,
                point_order: index + 1, // 좌표 순서
            }));
    
            const { error: coordinatesError } = await supabase
                .from('course_coordinates')
                .insert(coordinates);
    
            if (coordinatesError) {
                console.error('Error inserting course coordinates:', coordinatesError);
                throw new Error('Failed to insert course coordinates.');
            }
    
            // 3. 저장된 데이터를 반환
            return new CourseView(
                courseData.id,
                course.userId,
                course.name,
                course.courseImageUrl,
                course.address,
                course.isPublic,
                course.distance,
                course.duration,
                new Date(courseData.created_at),
                new Date(courseData.updated_at),
                course.coordinates // 기존 좌표 데이터를 그대로 반환
            );
        } catch (error) {
            console.error('Error creating course:', error);
            throw new Error('Failed to create course.');
        }
    }

    async update(course: Course): Promise<Course> {
        // Implementation for updating a course
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<void> {
        // Implementation for deleting a course
        throw new Error('Method not implemented.');
    }
}
