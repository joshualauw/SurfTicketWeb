<template>
    <NuxtLink v-if="hasPermission(permission, 'INSERT')" :to="to">
        <Button variant="ghost">
            <CirclePlusIcon />
            <span class="hidden md:block">Create</span>
        </Button>
    </NuxtLink>
</template>

<script setup lang="ts">
import { CirclePlusIcon } from "lucide-vue-next";
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from "vue-router";
import type { PermissionCode } from "~/types/atoms/PermissionCode";

defineProps<{
    permission: PermissionCode;
    to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined;
}>();

const { hasPermission } = useMerchantUserStore();
</script>
0
