<template>
    <Sidebar>
        <SidebarHeader>
            <div class="flex w-full justify-center mt-4">
                <NuxtImg src="/images/logo.png" class="w-30 h-30 rounded-full bg-gray-200" />
            </div>
        </SidebarHeader>
        <SidebarContent class="pl-4">
            <SidebarGroup>
                <SidebarGroupLabel>Navigations</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in ADMIN_SIDEBAR" :key="item.key">
                            <SidebarMenuButton asChild :isActive="$route.meta.name == item.key">
                                <NuxtLink :to="{ name: item.key }" class="h-10" :style="{ 'font-size': '14px' }">
                                    <component :is="item.icon" />
                                    <span class="ml-1">{{ item.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>

<script setup lang="ts">
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

const ADMIN_SIDEBAR = [
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
</script>
