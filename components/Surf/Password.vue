<template>
    <FormControl>
        <div class="relative group">
            <Input :type="isShow ? 'text' : 'password'" placeholder="*****" v-bind="componentField" />
            <span
                @click="isShow = !isShow"
                class="absolute hidden group-hover:flex end-0 inset-y-0 items-center justify-center px-2"
            >
                <EyeIcon v-if="!isShow" class="w-5 h-5 cursor-pointer" />
                <EyeOffIcon v-else class="w-5 h-5 cursor-pointer" />
            </span>
        </div>
    </FormControl>
</template>

<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";
import type { ComponentFieldBindingObject } from "vee-validate";

defineProps<{ componentField: ComponentFieldBindingObject<any> }>();

const isShow = ref<boolean>(false);
</script>
