<template>
    <div class="flex-center flex-col space-y-6">
        <MailQuestionIcon class="text-gray-300 w-24 h-24" />
        <div v-if="!isSent" class="w-full space-y-4">
            <p class="text-gray-600 text-center">
                You need to confirm <span class="underline">user@example.com</span> before continuing
            </p>
            <Button @click="isSent = true" class="w-full">Send Link</Button>
        </div>
        <div v-else class="w-full space-y-6 flex-center flex-col">
            <p class="text-gray-600">Please check your email for confirmation token</p>
            <PinInput id="pin-input" v-model="pin" placeholder="○">
                <PinInputGroup>
                    <PinInputSlot v-for="(id, idx) in 6" :key="id" :index="idx" />
                </PinInputGroup>
            </PinInput>
            <div class="w-full">
                <Button @click="navigateTo({ name: RouteKey.HOME })" class="w-full">Verify</Button>
                <Button variant="link" class="block mx-auto">Doesn't receive email? resend</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MailQuestionIcon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";

definePageMeta({
    layout: "auth",
    name: RouteKey.AUTH_CONFIRM_EMAIL,
});

const pin = ref<string[]>([]);
const isSent = ref<boolean>(false);
</script>
