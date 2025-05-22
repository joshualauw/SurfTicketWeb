import type { PagedResult } from "~/types/api/PagedResult";

export type GetAdminVenuesResponse = PagedResult<AdminVenueItem>;

export interface AdminVenueItem {
    id: number;
    name: string;
    logoUrl?: string;
}
