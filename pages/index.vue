<template>blank page</template>

<script setup lang="ts">
import { RouteKey } from "~/config/route";

definePageMeta({
    middleware: ["auth"],
    name: RouteKey.HOME,
});
</script>
