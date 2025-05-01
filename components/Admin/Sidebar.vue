<template>
    <Sidebar>
        <SidebarHeader>
            <div class="flex w-full justify-center mt-4">
                <NuxtImg src="/SurfTicket.png" class="w-30 h-30 rounded-full bg-gray-200" />
            </div>
        </SidebarHeader>
        <SidebarContent class="pl-4">
            <SidebarGroup>
                <SidebarGroupLabel>Navigations</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in items" :key="item.key">
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
    Store,
    LayoutDashboard,
    Settings,
    Ticket,
    MessageCircleMore,
    ChartNoAxesCombined,
    ScanBarcode,
} from "lucide-vue-next";
import { RouteKey } from "~/config/route";

const items = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        key: RouteKey.ADMIN_DASHBOARD,
    },
    {
        title: "Venue",
        icon: Store,
        key: RouteKey.ADMIN_VENUE,
    },
    {
        title: "Tickets",
        icon: Ticket,
        key: RouteKey.ADMIN_TICKET,
    },
    {
        title: "Revenue",
        icon: ChartNoAxesCombined,
        key: RouteKey.ADMIN_REVENUE,
    },
    {
        title: "Scans",
        icon: ScanBarcode,
        key: RouteKey.ADMIN_SCAN,
    },
    {
        title: "Chat",
        icon: MessageCircleMore,
        key: RouteKey.ADMIN_CHAT,
    },
    {
        title: "Settings",
        icon: Settings,
        key: RouteKey.ADMIN_SETTING,
    },
];
</script>
