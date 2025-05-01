<template>
    <Sidebar>
        <SidebarHeader>
            <div class="flex w-full justify-center mt-4">
                <img class="w-32 h-32 rounded-full bg-gray-200" />
            </div>
        </SidebarHeader>
        <SidebarContent class="pl-4">
            <SidebarGroup>
                <SidebarGroupLabel>Navigations</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in items" :key="item.title">
                            <SidebarMenuButton asChild :isActive="item.active">
                                <a :href="item.url" class="h-10" :style="{ 'font-size': '14px' }">
                                    <component :is="item.icon" />
                                    <span class="ml-1">{{ item.title }}</span>
                                </a>
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

const route = useRoute();

const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
        active: route.meta.name == "admin-dashboard",
    },
    {
        title: "Venue",
        url: "/admin/venue",
        icon: Store,
        active: route.meta.name == "admin-venue",
    },
    {
        title: "Tickets",
        url: "/admin/ticket",
        icon: Ticket,
        active: route.meta.name == "admin-ticket",
    },
    {
        title: "Revenue",
        url: "/admin/revenue",
        icon: ChartNoAxesCombined,
        active: route.meta.name == "admin-revenue",
    },
    {
        title: "Scans",
        url: "/admin/scan",
        icon: ScanBarcode,
        active: route.meta.name == "admin-scan",
    },
    {
        title: "Chat",
        url: "/admin/chat",
        icon: MessageCircleMore,
        active: route.meta.name == "admin-chat",
    },
    {
        title: "Settings",
        url: "/admin/setting",
        icon: Settings,
        active: route.meta.name == "admin-setting",
    },
];
</script>
