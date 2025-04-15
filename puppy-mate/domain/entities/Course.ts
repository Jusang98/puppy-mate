export class Course {
    constructor(
        public id: number, // public 추가
        public userId: number, // public 추가
        public name: string, // public 추가
        public courseImageUrl: string, // public 추가
        public address: string, // public 추가
        public isPublic: boolean, // public 추가
        public distance: number, // public 추가
        public duration: number, // public 추가
        public createdAt: Date, // public 추가
        public updatedAt: Date // public 추가
    ) {}
}