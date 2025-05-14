import type { BaseMerchant } from "~/types/api/merchant/BaseMerchant";

export interface GetHandledMerchantResponse {
    ownedMerchants: BaseMerchant[];
    collaboratedMerchants: BaseMerchant[];
}
