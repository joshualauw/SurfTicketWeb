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

        const perm = merchantUser.value.permissions.find((p) => p.code == permission);
        if (!perm) return false;

        if (access) {
            return perm.access == access;
        }

        return true;
    }

    return { merchantUser, setMerchantUser, hasPermission };
}
