import useAuthStore from "~/composables/persistence/useAuthStore";

export default defineNuxtRouteMiddleware(async (to) => {
    const { me } = useAuthApi();
    const { loggedUser, setLoggedUser } = useAuthStore();

    if (!loggedUser.value) {
        const userData = await me();
        if (!userData) {
            return navigateTo("/login");
        }
        setLoggedUser(userData.user);
    }
});
