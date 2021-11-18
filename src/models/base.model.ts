export class BaseModel {
    id: number;
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;

    page: number;
    limit: number;
    keyword: string
}