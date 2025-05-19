<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <Card v-for="venue in adminVenues?.data?.venues">
            <CardHeader>{{ venue.name }}</CardHeader>
        </Card>
    </div>
    <div v-if="adminVenues?.data?.venues.length == 0" class="flex-1 flex-center flex-col text-gray-400">
        <ServerOffIcon class="w-20 h-20 mb-6" />
        <div class="text-center text-lg">-No Venues Available-</div>
    </div>
</template>

<script setup lang="ts">
import { ServerOffIcon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Venue",
    name: RouteKey.ADMIN_VENUE,
    modules: ["create", "refresh", "export"],
});

const route = useRoute();
const { event, clearEvent } = useAdminModuleHandler();
const { getMerchantId } = useMerchantUserStore();

const { getAdminVenues } = useVenueApi();
const { data: adminVenues } = await useAsyncData(() => getAdminVenues(getMerchantId()));

watch(event, (val) => {
    if (val == "create") {
        navigateTo({ name: RouteKey.ADMIN_VENUE_CREATE, query: route.query });
    }
    clearEvent();
});
</script>
