<template>
    <div class="container py-10 mx-auto">
        <AdminTicketData :columns="columns" :data="data" />
    </div>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Tickets",
    name: RouteKey.ADMIN_TICKET,
});

const data = ref<any[]>([]);

import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";

const columns: ColumnDef<any>[] = [
    {
        accessorKey: "amount",
        header: () => h("div", { class: "text-right" }, "Amount"),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return h("div", { class: "text-right font-medium" }, formatted);
        },
    },
];

async function getData(): Promise<any[]> {
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
    ];
}

onMounted(async () => {
    data.value = await getData();
});
</script>
