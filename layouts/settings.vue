<template>
    <NuxtLayout name="client">
        <div class="grid grid-cols-4 h-full">
            <div class="hidden lg:block lg:col-span-1 bg-muted py-4 px-8">
                <h2 class="font-bold my-6">Navigation</h2>
                <div v-if="$route.meta.navs" class="space-y-2">
                    <Button
                        v-for="nav in $route.meta.navs as ClientSettingsNav[]"
                        variant="ghost"
                        class="rounded-full w-full"
                    >
                        <a :href="nav.target" class="w-full text-left">{{ nav.name }}</a>
                    </Button>
                </div>
            </div>
            <div class="col-span-4 lg:col-span-3 px-6 h-full overflow-y-auto">
                <div class="mt-4 grid w-full grid-cols-3">
                    <Button
                        v-for="tab in tabs"
                        :variant="tab.key == $route.meta.name ? 'default' : 'ghost'"
                        @click="navigateTo({ name: tab.key })"
                        class="h-10"
                    >
                        {{ tab.name }}
                    </Button>
                </div>
                <slot />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

interface ClientSettingsNav {
    target: string;
    name: string;
}

const tabs = ref([
    {
        key: RouteKey.SETTING_ACCOUNT,
        name: "Account",
    },
    {
        key: RouteKey.SETTING_MERCHANT,
        name: "Merchant",
    },
    {
        key: RouteKey.SETTING_BILLING,
        name: "Billing",
    },
]);
</script>
