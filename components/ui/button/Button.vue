<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { type ButtonVariants, buttonVariants } from ".";
import { Loader2Icon } from "lucide-vue-next";

interface Props extends PrimitiveProps {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: HTMLAttributes["class"];
    loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    as: "button",
});
</script>

<template>
    <Primitive
        data-slot="button"
        :as="as"
        :as-child="asChild"
        :class="cn(buttonVariants({ variant, size }), props.class)"
        :disabled="loading"
    >
        <Loader2Icon v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <slot />
    </Primitive>
</template>
