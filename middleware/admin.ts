import useMerchantUserApi from "~/composables/external/useMerchantUserApi";
import useMerchantUserStore from "~/composables/persistence/useMerchantUserStore";
import { RouteKey } from "~/const/route";
import type { PermissionAccess } from "~/types/atoms/PermissionAccess";
import type { PermissionCode } from "~/types/atoms/PermissionCode";

export default defineNuxtRouteMiddleware(async (to) => {
    const { getMerchantUser } = useMerchantUserApi();
    const { merchantUser, setMerchantUser, hasPermission } = useMerchantUserStore();

    const merchantId = to.query.id ? parseInt(to.query.id as string) : null;
    if (!merchantId) {
        return navigateTo({ name: RouteKey.HOME });
    }

    if (!merchantUser.value) {
        try {
            const res = await getMerchantUser(merchantId);
            if (res.data && res.success) {
                setMerchantUser(res.data);
            }
        } catch (err) {
            return navigateTo({ name: RouteKey.HOME });
        }
    }

    if (merchantUser.value) {
        if (!hasPermission(to.meta.permission as PermissionCode, to.meta.access as PermissionAccess)) {
            return navigateTo({ name: RouteKey.DENIED });
        }
    }
});
