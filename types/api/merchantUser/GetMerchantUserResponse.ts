import type { MerchantUser } from "~/types/state/MerchantUser";

export type GetMerchantUserResponse = Omit<MerchantUser, "merchantId">;
