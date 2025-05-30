<template>
    <div class="text-sm">
        <div class="overflow-x-auto">
            <table class="min-w-full table-fixed border-collapse border-2">
                <thead>
                    <tr>
                        <th class="border cursor-pointer select-none py-2 px-4 bg-sky-50 w-6 text-center">Row</th>
                        <th
                            v-for="col in columns"
                            :key="col.key"
                            class="border cursor-pointer select-none py-2 px-4 bg-sky-50"
                            :class="[col.rowClass, getHeaderAlignment(col.align)]"
                            @click="col.sortable && toggleSort(col.key)"
                        >
                            {{ col.label }}
                            <span v-if="sort.key === col.key" class="ml-1 text-xs">
                                {{ sort.direction === "asc" ? "▲" : sort.direction === "desc" ? "▼" : "" }}
                            </span>
                        </th>
                    </tr>
                    <tr v-if="columns.some((c) => c.filterable)">
                        <th class="border p-1 bg-white"></th>
                        <th v-for="col in columns" :key="col.key" class="border p-1 bg-white">
                            <Input
                                v-if="col.filterable"
                                v-model="localFilters[col.key]"
                                placeholder="Filter..."
                                class="w-full border rounded h-8"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="data.items.length === 0">
                        <td :colspan="columns.length + 1" class="text-center py-2 text-gray-600">
                            -No data available-
                        </td>
                    </tr>
                    <tr
                        v-for="(item, i) in data.items"
                        :key="item.id || i"
                        class="bg-white hover:bg-zinc-50 transition"
                    >
                        <td class="border py-2 px-4 text-center">{{ i + (data.page - 1) * data.size + 1 }}</td>
                        <td v-for="col in columns" :key="col.key" class="border py-2 px-4">
                            <div :class="[col.rowClass, getRowAlignment(col.align)]">
                                <slot :name="`cell-${col.key}`" :value="item[col.key]" :item="item">
                                    {{ item[col.key] }}
                                </slot>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination flex justify-between items-center gap-2 mt-3">
            <div class="border">
                <Button
                    v-for="size in sizeVariants"
                    @click="switchSize(size)"
                    class="rounded-none border-r"
                    :variant="pagination.size == size ? 'default' : 'ghost'"
                    size="sm"
                >
                    {{ size }}
                </Button>
            </div>
            <div>
                <Button variant="ghost" @click="goToPage(data.page - 1)" :disabled="data.page === 1"> Prev </Button>
                <span>Page {{ data.page }} of {{ data.totalPages }}</span>
                <Button
                    variant="ghost"
                    @click="goToPage(pagination.page + 1)"
                    :disabled="data.page === data.totalPages"
                >
                    Next
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup generic="T extends {id: number; [key: string]: any}">
import type { TableColumn, TableFilter, TablePagination, TableSort } from "~/types/common/table";
import { defineProps, defineEmits } from "vue";
import { watch } from "vue";
import { debounce } from "lodash";

interface PagedResult<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    size: number;
}

const props = defineProps<{
    data: PagedResult<T>;
    columns: TableColumn[];
    filters: TableFilter;
    sort: TableSort;
    pagination: TablePagination;
}>();

const emit = defineEmits<{
    (e: "update:filters", value: TableFilter): void;
    (e: "update:sort", value: TableSort): void;
    (e: "update:page", value: number): void;
    (e: "update:size", value: number): void;
}>();

const localFilters = ref({ ...props.filters });
const sizeVariants = [5, 10, 15];

watch(
    () => localFilters.value,
    debounce((val) => emit("update:filters", val), 300),
    { deep: true }
);

function getHeaderAlignment(col?: "left" | "center" | "right") {
    if (col == "left" || !col) return "text-left";
    else if (col == "center") return "text-center";
    else return "text-right";
}

function getRowAlignment(row?: "left" | "center" | "right") {
    if (row == "left" || !row) return "flex justify-start";
    else if (row == "center") return "flex justify-center";
    else return "flex justify-end";
}

const switchSize = (size: number) => {
    emit("update:size", size);
};

const toggleSort = (key: string) => {
    const current = props.sort;
    if (current.key !== key) {
        emit("update:sort", { key, direction: "asc" });
    } else if (current.direction === "asc") {
        emit("update:sort", { key, direction: "desc" });
    } else {
        emit("update:sort", { key: null, direction: null });
    }
};

const goToPage = (page: number) => {
    if (page >= 1 && page <= props.data.totalPages) {
        emit("update:page", page);
    }
};
</script>
