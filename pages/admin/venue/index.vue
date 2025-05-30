<template>
    <div v-if="loading" class="flex-1 flex-center flex-col text-gray-400">
        <Loader2Icon class="w-24 h-24 animate-spin" />
    </div>
    <div v-else>
        <div class="border rounded-md mb-4 w-fit">
            <AdminActionCreate permission="VENUE" :to="{ name: RouteKey.ADMIN_VENUE_CREATE, query: route.query }" />
            <AdminActionRefresh @click="hardRefresh" />
            <AdminActionExport />
        </div>
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
            <template #cell-logoUrl="{ item }">
                <Avatar class="w-10 h-10 md:w-16 md:h-16">
                    <AvatarImage :src="item.logoUrl ?? '/images/logo.png'" alt="@unovue" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </template>
            <template #cell-updatedAt="{ item }">
                {{ dayjs(item.updatedAt).format("DD MMM YYYY HH:mm") }}
            </template>
            <template #cell-actions="{ item }">
                <NuxtLink :to="{ name: RouteKey.ADMIN_VENUE_DETAIL, query: route.query, params: { id: item.id } }">
                    <Button variant="ghost" size="sm" class="mr-2">
                        <EyeIcon />
                        <span class="hidden md:block">View</span>
                    </Button>
                </NuxtLink>
                <AdminVenueDelete
                    v-if="hasPermission('VENUE', 'DELETE')"
                    @done="handleDoneDelete"
                    :merchant-id="merchantId"
                    :venue-id="item.id"
                />
            </template>
        </SurfTable>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { TableColumn, TableFilter, TablePagination, TableSort } from "~/types/common/table";
import { EyeIcon, Loader2Icon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";
import type { PermissionCode } from "~/types/atoms/PermissionCode";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Venue",
    name: RouteKey.ADMIN_VENUE,
    permission: "VENUE" as PermissionCode,
});

const route = useRoute();
const { hasPermission } = useMerchantUserStore();
const merchantId = computed(() => (route.query.id ? parseInt(route.query.id as string) : 0));

const columns: TableColumn[] = [
    { key: "logoUrl", label: "Logo", align: "center", rowClass: "w-[100px]" },
    { key: "name", label: "Name", sortable: true, filterable: true, rowClass: "min-w-[250px]" },
    { key: "updatedAt", label: "Last Updated At", sortable: true, align: "center", rowClass: "w-[200px]" },
    { key: "actions", label: "Actions", align: "center", rowClass: "w-[175px]" },
];

const sort = reactive<TableSort>({ key: null, direction: null });
const pagination = reactive<TablePagination>({ page: 1, size: 10 });
const filters = reactive<TableFilter>(
    Object.assign({}, ...columns.filter((c) => c.filterable).map((v) => ({ [v.key]: "" })))
);

const loading = ref(false);

const { getAdminVenues } = useVenueApi();
const { data, refresh } = await useAsyncData(() => getAdminVenues(merchantId.value, pagination, sort, filters), {
    watch: [pagination, sort, filters],
});

const adminVenues = computed(() => ({
    items: data.value?.data?.items ?? [],
    page: data.value?.data?.page ?? 1,
    size: data.value?.data?.size ?? 15,
    totalItems: data.value?.data?.totalItems ?? 0,
    totalPages: data.value?.data?.totalPages ?? 0,
}));

async function handleDoneDelete(success: boolean) {
    if (success) {
        await refresh();
    }
}

async function hardRefresh() {
    loading.value = true;
    await refresh();
    loading.value = false;
}

function handlePage(value: number) {
    pagination.page = value;
}

function handleSize(value: number) {
    pagination.size = value;
    pagination.page = 1;
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
</script>
