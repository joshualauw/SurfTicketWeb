<template>
    <div class="h-screen flex-center flex-col">
        <CircleOffIcon class="text-gray-500 w-40 h-40" />
        <p class="text-2xl font-bold mt-4">Sorry, You don't have permission to access this page</p>
        <Button @click="$router.go(-1)" variant="secondary" class="mt-8">Go Back</Button>
    </div>
</template>

<script setup lang="ts">
import { CircleOffIcon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";

definePageMeta({
    name: RouteKey.DENIED,
});
</script>
