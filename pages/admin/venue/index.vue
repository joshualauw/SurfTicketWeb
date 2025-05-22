<template>
    <div v-if="adminVenues.length == 0" class="flex-1 flex-center flex-col text-gray-400">
        <ServerOffIcon class="w-20 h-20 mb-6" />
        <div class="text-center text-lg">-No Venues Available-</div>
    </div>
    <div v-else>
        <ClientOnly>
            <AdminVenueTable :columns="columns" :data="adminVenues" />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { ServerOffIcon } from "lucide-vue-next";
import { columns } from "~/const/columns/adminVenueColumns";
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
const { data } = await useAsyncData(() => getAdminVenues(getMerchantId()));
const adminVenues = computed(() => data.value?.data?.items ?? []);

watch(event, (val) => {
    if (val == "create") {
        navigateTo({ name: RouteKey.ADMIN_VENUE_CREATE, query: route.query });
    }
    clearEvent();
});
</script>
