<template>.</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Scans",
    name: RouteKey.ADMIN_SCAN,
});
</script>
