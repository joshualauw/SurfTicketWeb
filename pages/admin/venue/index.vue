<template>
    <div class="container py-10 mx-auto">
        <div class="w-full flex items-center justify-between">
            <NuxtLink :to="{ name: RouteKey.ADMIN_VENUE_CREATE }">create</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    layout: "admin",
    title: "Venue",
    name: RouteKey.ADMIN_VENUE,
});
</script>
