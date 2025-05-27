<template>
    <Button @click="emit('click')" variant="ghost">
        <RefreshCcwIcon />
        <span class="hidden md:block">Refresh</span>
    </Button>
</template>

<script setup lang="ts">
import { RefreshCcwIcon } from "lucide-vue-next";

const emit = defineEmits<{
    (e: "click"): void;
}>();
</script>
