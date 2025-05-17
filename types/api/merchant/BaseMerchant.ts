import type { BaseEntity } from "~/types/api/BaseEntity";

export interface BaseMerchant extends BaseEntity {
    name: string;
    description: string;
    logoUrl?: string;
}
