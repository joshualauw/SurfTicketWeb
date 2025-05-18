<template>.</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Dashboard",
    name: RouteKey.ADMIN_DASHBOARD,
});
</script>
