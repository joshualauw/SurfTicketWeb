<template>.</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";
import type { PermissionCode } from "~/types/atoms/PermissionCode";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Scans",
    permission: "SCAN" as PermissionCode,
    name: RouteKey.ADMIN_SCAN,
});
</script>
