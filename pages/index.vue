<template>blank page</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

definePageMeta({
    middleware: ["auth"],
    layout: "client",
    name: RouteKey.HOME,
});
</script>
