<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<template>
    <SidebarProvider>
        <AdminSidebar />
        <main class="w-screen">
            <SidebarTrigger />
            <AdminNavbar />
            <div class="p-2 md:p-3 xl:p-4">
                <h1 class="text-lg md:text-2xl font-bold mb-2 md:mb-3 xl:mb-4">{{ $route.meta.title }}</h1>
                <slot />
            </div>
        </main>
    </SidebarProvider>
</template>
