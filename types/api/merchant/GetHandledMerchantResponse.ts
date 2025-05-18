export interface GetHandledMerchantResponse {
    ownedMerchants: HandledMerchantItem[];
    collaboratedMerchants: HandledMerchantItem[];
}

export interface HandledMerchantItem {
    id: number;
    name: string;
    description: string;
    logoUrl?: string;
    lastVisitedAt: string;
}
