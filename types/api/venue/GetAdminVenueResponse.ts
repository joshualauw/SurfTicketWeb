export type GetAdminVenueResponse = AdminVenueDetail;

export interface AdminVenueDetail {
    id: number;
    name: string;
    description: string;
    logoUrl?: string;
}
