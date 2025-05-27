<template>
    <NuxtLayout name="default">
        <SidebarProvider>
            <AdminSidebar />
            <main class="w-screen flex flex-col">
                <AdminNavbar />
                <div class="p-4 md:p-6 xl:p-8 bg-slate-50 flex-1 overflow-auto flex flex-col">
                    <div class="w-full flex items-end justify-between mb-8">
                        <div>
                            <h1 class="text-lg md:text-2xl font-bold mb-2">{{ $route.meta.title }}</h1>
                            <Breadcrumb v-if="$route.meta.name != RouteKey.ADMIN_DASHBOARD">
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <NuxtLink :to="{ name: RouteKey.ADMIN_DASHBOARD, query: $route.query }">
                                            Dashboard
                                        </NuxtLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <template v-for="crumb in breadcrumbs">
                                        <BreadcrumbItem>
                                            <NuxtLink :to="crumb.path">{{ crumb.name }}</NuxtLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </template>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{{ $route.meta.title }}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col">
                        <slot />
                    </div>
                </div>
                <p class="text-center text-gray-500 text-xs p-2">@2025 - Joshua W</p>
            </main>
        </SidebarProvider>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

const route = useRoute();

const breadcrumbs = computed(() => generateBreadcrumbs(route.path));

function generateBreadcrumbs(url: string, skipStart = 1, skipEnd = 1): { path: string; name: string }[] {
    const originalSegments = url.split("/").filter(Boolean);

    const slicedSegments = originalSegments.slice(skipStart, originalSegments.length - skipEnd);

    const breadcrumbs: { path: string; name: string }[] = [];

    for (let i = 0; i < slicedSegments.length; i++) {
        const pathSegments = originalSegments.slice(0, skipStart + i + 1);
        const path = "/" + pathSegments.join("/");
        const name = slicedSegments[i].charAt(0).toUpperCase() + slicedSegments[i].slice(1);
        breadcrumbs.push({ path: path + `?id=${route.query.id}`, name });
    }

    return breadcrumbs;
}
</script>
