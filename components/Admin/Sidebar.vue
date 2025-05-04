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
import { ADMIN_SIDEBAR } from "~/const/ui/adminSidebar";
</script>
