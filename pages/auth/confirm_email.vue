<template>
    <div class="flex-center flex-col space-y-6">
        <MailQuestionIcon class="text-gray-300 w-24 h-24" />
        <div class="w-full space-y-6 flex-center flex-col">
            <p class="text-gray-600 text-center">
                You need to confirm <span class="underline">user@example.com</span> before continuing
            </p>
            <p class="text-gray-600">Please check your email for confirmation token</p>
            <PinInput id="pin-input" v-model="pin" placeholder="○">
                <PinInputGroup>
                    <PinInputSlot v-for="(id, idx) in 6" :key="id" :index="idx" />
                </PinInputGroup>
            </PinInput>
            <div class="w-full">
                <Button @click="doVerifyEmail" :loading="loading" class="w-full">Verify</Button>
                <Button variant="link" class="block mx-auto">Doesn't receive email? resend</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MailQuestionIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { RouteKey } from "~/const/route";

definePageMeta({
    layout: "auth",
    name: RouteKey.AUTH_CONFIRM_EMAIL,
});

const route = useRoute();
const { verifyEmail } = useAuthApi();
const { loading, execute, success, message } = useApi(verifyEmail);

const pin = ref<string[]>([]);

async function doVerifyEmail() {
    await execute({ email: route.query.email as string, verifyCode: pin.value.join().replaceAll(",", "") });
    if (success.value) {
        toast.success(message.value, { class: "toast-success" });

        await nextTick();
        navigateTo({ name: RouteKey.HOME });
    } else {
        toast.error(message.value, { class: "toast-error" });
    }
}
</script>
