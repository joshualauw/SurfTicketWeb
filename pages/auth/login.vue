<template>
    <form @submit="onSubmit" class="space-y-5">
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="your_email@mail.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>Password</FormLabel>
                <SurfPassword :componentField="componentField" />
                <FormMessage />
            </FormItem>
        </FormField>
        <div class="flex items-center justify-between">
            <div>
                <Checkbox id="remember-me" class="cursor-pointer" />
                <label for="remember-me" class="ml-2 text-sm cursor-pointer">Remember me</label>
            </div>
            <Button variant="link" type="button">
                <NuxtLink :to="{ name: RouteKey.AUTH_FORGOT_PASSWORD }">Forgot Password?</NuxtLink>
            </Button>
        </div>
        <div>
            <Button :disabled="loading" type="submit" class="w-full">
                <Loader2Icon v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
                Submit
            </Button>
            <Button variant="link" type="button" class="block mx-auto mt-2">
                <NuxtLink :to="{ name: RouteKey.AUTH_REGISTER }"> doesn't have an account? </NuxtLink>
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Loader2Icon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import * as z from "zod";

definePageMeta({
    layout: "auth",
    title: "Sign In",
    name: RouteKey.AUTH_LOGIN,
});

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        password: z.string().min(6).max(12),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});
const { setLoggedUser } = useAuthStore();
const { login } = useAuthApi();
const { loading, execute, error, success, message, data } = useApi(login);

const onSubmit = handleSubmit(async (values) => {
    await execute(values);

    if (success.value && data.value) {
        toast.success(message.value, { class: "toast-success" });
        setLoggedUser(data.value.user);

        await nextTick();
        navigateTo({ name: RouteKey.AUTH_CONFIRM_EMAIL });
    } else {
        console.log(error.value);
        toast.error(message.value, { class: "toast-error" });
    }
});
</script>
