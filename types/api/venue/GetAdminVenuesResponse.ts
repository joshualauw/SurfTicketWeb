export interface GetAdminVenuesResponse {
    venues: {
        id: number;
        name: string;
        logoUrl?: string;
    }[];
}
