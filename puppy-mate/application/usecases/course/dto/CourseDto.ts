import { CoordinateDto } from './CoordinateDto';

export class CourseDto {
    constructor(
        public id: number,
        public userId: number,
        public name: string,
        public courseImageUrl: string,
        public address: string,
        public isPublic: boolean,
        public distance: number,
        public duration: number,
        public createdAt: Date,
        public updatedAt: Date,
        public coordinates: CoordinateDto[]
    ) {}
}
