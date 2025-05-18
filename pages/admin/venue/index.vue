<template>
    <div class="container py-10 mx-auto">
        <p class="text-center text-lg text-gray-400">-no venues here-</p>
    </div>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Venue",
    name: RouteKey.ADMIN_VENUE,
});

const route = useRoute();
const { merchantUser } = useMerchantUserStore();

const { getAdminVenues } = useVenueApi();
const { data: adminVenues } = await useAsyncData(() => getAdminVenues(merchantUser.value?.merchantId ?? 0));
</script>
