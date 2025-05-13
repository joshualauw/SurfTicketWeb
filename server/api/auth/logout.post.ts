export default defineEventHandler((event) => {
    try {
        deleteCookie(event, "auth");

        return {};
    } catch (e: any) {
        console.error(e);
        setResponseStatus(event, 500);

        return {};
    }
});
