import {
    StoreIcon,
    LayoutDashboardIcon,
    SettingsIcon,
    TicketIcon,
    MessageCircleMoreIcon,
    ChartNoAxesCombinedIcon,
    ScanBarcodeIcon,
} from "lucide-vue-next";
import { RouteKey } from "~/const/route";
import type { AdminSidebar } from "~/types/ui/AdminSidebar";

export const ADMIN_SIDEBAR: AdminSidebar[] = [
    {
        title: "Dashboard",
        icon: LayoutDashboardIcon,
        key: RouteKey.ADMIN_DASHBOARD,
    },
    {
        title: "Venue",
        icon: StoreIcon,
        key: RouteKey.ADMIN_VENUE,
    },
    {
        title: "Tickets",
        icon: TicketIcon,
        key: RouteKey.ADMIN_TICKET,
    },
    {
        title: "Revenue",
        icon: ChartNoAxesCombinedIcon,
        key: RouteKey.ADMIN_REVENUE,
    },
    {
        title: "Scans",
        icon: ScanBarcodeIcon,
        key: RouteKey.ADMIN_SCAN,
    },
    {
        title: "Chat",
        icon: MessageCircleMoreIcon,
        key: RouteKey.ADMIN_CHAT,
    },
    {
        title: "Settings",
        icon: SettingsIcon,
        key: RouteKey.ADMIN_SETTING,
    },
];
