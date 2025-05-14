export interface BaseEntity {
    id: number;
    createdAt: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}
