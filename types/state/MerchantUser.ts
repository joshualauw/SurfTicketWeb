import type { MerchantRole } from "~/types/atoms/MerchantRole";
import type { PermissionAccess } from "~/types/atoms/PermissionAccess";
import type { PermissionCode } from "~/types/atoms/PermissionCode";

export interface MerchantUser {
    id: number;
    role: MerchantRole;
    permissions: {
        id: number;
        code: PermissionCode;
        access: PermissionAccess;
    }[];
}
