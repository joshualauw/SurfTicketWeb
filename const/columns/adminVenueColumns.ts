import type { ColumnDef } from "@tanstack/vue-table";
import type { AdminVenueItem } from "~/types/api/venue/GetAdminVenuesResponse";

export const columns: ColumnDef<AdminVenueItem>[] = [
    {
        accessorKey: "id",
        header: () => h("div", "Id"),
        cell: ({ row }) => {
            return h("div", row.getValue("id"));
        },
    },
    {
        accessorKey: "name",
        header: () => h("div", "Name"),
        cell: ({ row }) => {
            row.getValue("logoUrl");
            return h("div", row.getValue("name"));
        },
    },
];
