import useAuthStore from "~/composables/persistence/useAuthStore";
import { RouteKey } from "~/const/route";

export default defineNuxtRouteMiddleware(async (to) => {
    const { me } = useAuthApi();
    const { loggedUser, setLoggedUser } = useAuthStore();

    if (!loggedUser.value) {
        const res = await me();

        if (res.data && res.success) {
            setLoggedUser(res.data);
        } else {
            return navigateTo({ name: RouteKey.AUTH_LOGIN });
        }
    }
});
