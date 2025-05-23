<template>
    <div class="text-sm">
        <table class="w-full table-auto border-collapse border">
            <thead>
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col.key"
                        class="border cursor-pointer select-none py-2 px-4 bg-sky-50"
                        :class="[col.headerClass, getHeaderAlignment(col.align)]"
                        @click="col.sortable && toggleSort(col.key)"
                    >
                        {{ col.label }}
                        <span v-if="sortKey === col.key" class="ml-1 text-xs">
                            {{ sortDirection === "asc" ? "▲" : sortDirection === "desc" ? "▼" : "" }}
                        </span>
                    </th>
                </tr>
                <tr v-if="columns.some((c) => c.filterable)">
                    <th v-for="col in columns" :key="col.key" class="border p-1">
                        <Input
                            v-if="col.filterable"
                            v-model="filters[col.key]"
                            placeholder="Filter..."
                            class="w-full border rounded h-8"
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, i) in filteredSortedItems"
                    :key="item.id || item"
                    class="bg-zinc-50 hover:bg-zinc-100 transition"
                >
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
        <div class="pagination flex justify-end items-center gap-2 mt-2">
            <Button variant="ghost" @click="goToPage(data.page - 1)" :disabled="data.page === 1"> Prev </Button>
            <span>Page {{ data.page }} of {{ data.totalPages }}</span>
            <Button variant="ghost" @click="goToPage(data.page + 1)" :disabled="data.page === data.totalPages">
                Next
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { TableColumn } from "~/types/atoms/TableColumn";

interface PagedResult<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    size: number;
}

const sortKey = ref<string | null>(null);
const sortDirection = ref<"asc" | "desc" | null>(null);
const filters = ref<Record<string, string>>({});

const props = defineProps<{
    data: PagedResult<any>;
    columns: TableColumn[];
}>();

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

const emit = defineEmits<{
    (e: "update:page", value: number): void;
    (e: "update:size", value: number): void;
}>();

const toggleSort = (key: string) => {
    if (sortKey.value !== key) {
        sortKey.value = key;
        sortDirection.value = "asc";
    } else if (sortDirection.value === "asc") {
        sortDirection.value = "desc";
    } else {
        sortKey.value = null;
        sortDirection.value = null;
    }
};

const filteredSortedItems = computed(() => {
    let result = [...props.data.items];

    // Filtering
    for (const [key, filterValue] of Object.entries(filters.value)) {
        if (filterValue) {
            result = result.filter((item) =>
                String(item[key] ?? "")
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
            );
        }
    }

    // Sorting
    if (sortKey.value && sortDirection.value) {
        result.sort((a, b) => {
            const valA = a[sortKey.value!];
            const valB = b[sortKey.value!];

            if (valA == null) return 1;
            if (valB == null) return -1;

            if (typeof valA === "number" && typeof valB === "number") {
                return sortDirection.value === "asc" ? valA - valB : valB - valA;
            }

            return sortDirection.value === "asc"
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA));
        });
    }

    return result;
});

const goToPage = (page: number) => {
    if (page >= 1 && page <= props.data.totalPages) {
        emit("update:page", page);
    }
};
</script>
