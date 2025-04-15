import { Course } from './Course';

export class CourseView extends Course {
    constructor(
        id: number,
        userId: number,
        name: string,
        courseImageUrl: string,
        address: string,
        isPublic: boolean,
        distance: number,
        duration: number,
        createdAt: Date,
        updatedAt: Date,
        public coordinates: { lat: number; lng: number }[] // 좌표 데이터
    ) {
        super(id, userId, name, courseImageUrl, address, isPublic, distance, duration, createdAt, updatedAt);
    }
}