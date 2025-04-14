import { Course } from '@/domain/entities/Course';
import { CourseRepository } from '@/domain/repositories/CourseRepository';
import { createClient } from '@/utils/supabase/server';

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
            .select(`
                id,
                route_id,
                lat,
                lng,
                point_order,
                courses (
                    *
                )
            `)
            .gte('lat', southWestLat)
            .lte('lat', northEastLat)
            .gte('lng', southWestLng)
            .lte('lng', northEastLng)
            .order('point_order', { ascending: true });

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching courses:', error);
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

    async create(course: Course): Promise<Course> {
        // Implementation for creating a course
        throw new Error('Method not implemented.');
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
