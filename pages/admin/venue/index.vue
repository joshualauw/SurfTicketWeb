<template>
    <div class="container py-10 mx-auto">
        <p class="text-center text-lg text-gray-400">-no venues here-</p>
    </div>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    layout: "admin",
    title: "Venue",
    name: RouteKey.ADMIN_VENUE,
    modules: ["add"],
});
</script>
