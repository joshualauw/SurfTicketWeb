<template>
    <div class="flex-center flex-col space-y-6">
        <LockKeyholeIcon class="text-gray-300 w-20 h-20" />
        <div v-if="!isSent" class="w-full space-y-4">
            <p class="text-gray-600 text-center">Enter your email below</p>
            <Input type="text" placeholder="Enter your email..." class="" />
            <Button @click="isSent = true" class="w-full">Send Link</Button>
        </div>
        <div v-else class="space-y-4">
            <p class="text-gray-600">Please check your email for password reset link</p>
            <Button variant="link" class="block mx-auto">Doesn't receive email? resend</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LockKeyholeIcon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";

definePageMeta({
    layout: "auth",
    name: RouteKey.AUTH_FORGOT_PASSWORD,
});

const isSent = ref<boolean>(false);
</script>
