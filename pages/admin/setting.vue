<template>.</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Settings",
    name: RouteKey.ADMIN_SETTING,
});
</script>
