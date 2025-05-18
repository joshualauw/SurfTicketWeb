<template>.</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Chat",
    name: RouteKey.ADMIN_CHAT,
});
</script>
