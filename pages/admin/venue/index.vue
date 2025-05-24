<template>
    <div v-if="loading" class="flex-1 flex-center flex-col text-gray-400">
        <Loader2Icon class="w-24 h-24 animate-spin" />
    </div>
    <div v-else>
        <SurfTable
            :data="adminVenues"
            :columns="columns"
            :filters="filters"
            :sort="sort"
            :pagination="pagination"
            @update:page="handlePage"
            @update:size="handleSize"
            @update:sort="handleSort"
            @update:filters="handleFilter"
        >
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
import type { TableColumn, TableFilter, TablePagination, TableSort } from "~/types/common/table";
import { EditIcon, Loader2Icon, ServerOffIcon, Trash2Icon } from "lucide-vue-next";
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

const columns: TableColumn[] = [
    { key: "id", label: "Id", headerClass: "w-20", align: "center", sortable: true },
    { key: "name", label: "Name", sortable: true, filterable: true },
    { key: "actions", label: "Actions", headerClass: "w-36", align: "center" },
];

const sort = reactive<TableSort>({ key: null, direction: null });
const pagination = reactive<TablePagination>({ page: 1, size: 5 });
const filters = reactive<TableFilter>(
    Object.assign({}, ...columns.filter((c) => c.filterable).map((v) => ({ [v.key]: "" })))
);
const loading = ref(false);

const { getAdminVenues } = useVenueApi();
const { data, refresh } = await useAsyncData(() => getAdminVenues(getMerchantId(), pagination, sort, filters), {
    watch: [pagination, sort, filters],
});

function handlePage(value: number) {
    pagination.page = value;
}

function handleSize(value: number) {
    pagination.size = value;
}

function handleSort(value: TableSort) {
    sort.key = value.key;
    sort.direction = value.direction;
}

function handleFilter(value: TableFilter) {
    const keys = Object.keys(value);
    for (let key of keys) {
        filters[key] = value[key];
    }
    pagination.page = 1;
}

const adminVenues = computed(() => ({
    items: data.value?.data?.items ?? [],
    page: data.value?.data?.page ?? 1,
    size: data.value?.data?.size ?? 15,
    totalItems: data.value?.data?.totalItems ?? 0,
    totalPages: data.value?.data?.totalPages ?? 0,
}));

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
