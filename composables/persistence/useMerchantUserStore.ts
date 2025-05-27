import type { PermissionAccess } from "~/types/atoms/PermissionAccess";
import type { PermissionCode } from "~/types/atoms/PermissionCode";
import type { MerchantUser } from "~/types/state/MerchantUser";

export default function () {
    const merchantUser = useState<MerchantUser | null>("merchantUser", () => null);

    function setMerchantUser(state: MerchantUser) {
        merchantUser.value = state;
    }

    function hasPermission(permission: PermissionCode, access?: PermissionAccess) {
        if (!merchantUser.value) return false;

        if (merchantUser.value.role == "OWNER") {
            return true;
        }

        if (merchantUser.value.permissions.map((p) => p.code).includes(permission)) {
            if (access) {
                return merchantUser.value.permissions.map((p) => p.access).includes(access);
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    return { merchantUser, setMerchantUser, hasPermission };
}
