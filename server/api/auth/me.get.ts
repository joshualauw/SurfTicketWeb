export default defineEventHandler(async (event) => {
    const cookie = getCookie(event, "auth");

    if (cookie) {
        try {
            const data = JSON.parse(cookie);
            return data;
        } catch (e) {
            console.error("[SERVER]: error parsing cookie");
            return null;
        }
    }

    return null;
});
