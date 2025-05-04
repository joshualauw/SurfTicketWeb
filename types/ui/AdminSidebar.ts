import type { LucideProps } from "lucide-vue-next";
import type { FunctionalComponent } from "vue";
import type { RouteKey } from "~/const/route";

export interface AdminSidebar {
    title: string;
    icon: FunctionalComponent<LucideProps, {}, any, {}>;
    key: RouteKey;
}
