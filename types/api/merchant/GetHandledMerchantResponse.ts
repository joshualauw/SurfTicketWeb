import type { BaseMerchant } from "~/types/api/merchant/BaseMerchant";

export interface GetHandledMerchantResponse {
    ownedMerchants: HandledMerchantItem[];
    collaboratedMerchants: HandledMerchantItem[];
}

export type HandledMerchantItem = Pick<BaseMerchant, "id" | "name" | "logoUrl"> & {
    lastVisitedAt: string;
};
