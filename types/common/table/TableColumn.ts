export interface TableColumn {
    key: string;
    label: string;
    align?: "left" | "right" | "center";
    rowClass?: string;
    sortable?: boolean;
    filterable?: boolean;
}
