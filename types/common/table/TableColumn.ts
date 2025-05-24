export interface TableColumn {
    key: string;
    label: string;
    align?: "left" | "right" | "center";
    headerClass?: string;
    rowClass?: string;
    sortable?: boolean;
    filterable?: boolean;
}
