<template>.</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Revenue",
    name: RouteKey.ADMIN_REVENUE,
});
</script>
