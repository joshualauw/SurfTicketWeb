import useMerchantUserApi from "~/composables/external/useMerchantUserApi";
import useMerchantUserStore from "~/composables/persistence/useMerchantUserStore";
import { RouteKey } from "~/const/route";

export default defineNuxtRouteMiddleware(async (to) => {
    const { getMerchantUser } = useMerchantUserApi();
    const { merchantUser, setMerchantUser } = useMerchantUserStore();

    const merchantId = to.query.id ? parseInt(to.query.id as string) : null;
    if (!merchantId) {
        return navigateTo({ name: RouteKey.HOME });
    }

    if (!merchantUser.value) {
        try {
            const res = await getMerchantUser(merchantId);
            if (res.data && res.success) {
                setMerchantUser({ ...res.data, merchantId });
            }
        } catch (err) {
            return navigateTo({ name: RouteKey.HOME });
        }
    }
});
