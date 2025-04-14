import { Course } from './Course';

export class CourseView extends Course {
    constructor(public coordinates: { lat: number; lng: number }[]) {
        super();
    }
}
