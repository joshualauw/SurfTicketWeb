<template>
    <div v-if="adminVenues.items.length == 0" class="flex-1 flex-center flex-col text-gray-400">
        <ServerOffIcon class="w-20 h-20 mb-6" />
        <div class="text-center text-lg">-No Venues Available-</div>
    </div>
    <div v-else-if="loading" class="flex-1 flex-center flex-col text-gray-400">
        <Loader2Icon class="w-24 h-24 animate-spin" />
    </div>
    <div v-else>
        <SurfTable :data="adminVenues" :columns="columns" @update:page="handlePage">
            <template #cell-actions="{ item }">
                <Button variant="ghost" size="sm" class="border mr-2">
                    <EditIcon />
                    Edit
                </Button>
                <Button variant="destructive" size="sm">
                    <Trash2Icon />
                    Delete
                </Button>
            </template>
        </SurfTable>
    </div>
</template>

<script setup lang="ts">
import { EditIcon, Loader2Icon, ServerOffIcon, Trash2Icon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";
import type { TableColumn } from "~/types/atoms/TableColumn";

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
const page = ref(1);
const loading = ref(false);

const { getAdminVenues } = useVenueApi();
const { data, refresh } = await useAsyncData(() => getAdminVenues(getMerchantId(), page.value), {
    watch: [page],
});

function handlePage(value: number) {
    page.value = value;
}

const adminVenues = computed(() => ({
    items: data.value?.data?.items ?? [],
    page: data.value?.data?.page ?? 1,
    size: data.value?.data?.size ?? 15,
    totalItems: data.value?.data?.totalItems ?? 0,
    totalPages: data.value?.data?.totalPages ?? 0,
}));

const columns: TableColumn[] = [
    { key: "id", label: "Id", headerClass: "w-20", align: "center", sortable: true },
    { key: "name", label: "Name", sortable: true, filterable: true },
    { key: "actions", label: "Actions", headerClass: "w-36", align: "center" },
];

watch(event, async (val) => {
    if (val == "create") {
        navigateTo({ name: RouteKey.ADMIN_VENUE_CREATE, query: route.query });
    } else if (val == "refresh") {
        loading.value = true;
        await refresh();
        loading.value = false;
    }
    clearEvent();
});
</script>
