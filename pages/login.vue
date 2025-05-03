<template>
    <form @submit="onSubmit" class="space-y-6">
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
                <FormControl>
                    <Input type="password" placeholder="*****" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <p class="text-gray-500 text-sm text-center">
            <NuxtLink :to="{ name: RouteKey.REGISTER }"> doesn't have an account? register </NuxtLink>
        </p>
        <Button :disabled="loading" type="submit" class="w-full">
            <Loader2Icon v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            Submit
        </Button>
        <Alert v-if="error" variant="destructive">
            <AlertTitle>{{ error.errorMessage }}</AlertTitle>
            <AlertDescription v-for="err in errors">
                {{ err.message }}
            </AlertDescription>
        </Alert>
    </form>
</template>

<script setup lang="ts">
import { RouteKey } from "~/config/route";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Loader2Icon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import * as z from "zod";

definePageMeta({
    layout: "auth",
    title: "Sign In",
    name: RouteKey.LOGIN,
});

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        password: z.string().min(3).max(12),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});
const { setLoggedUser } = useAuthStore();
const { login } = useAuthApi();
const { loading, execute, errors, error, success, message, data } = useApi(login);

const onSubmit = handleSubmit(async (values) => {
    await execute(values);

    if (success.value && data.value) {
        toast.success(message.value, { class: "toast-success" });
        setLoggedUser(data.value.user);

        await nextTick();
        navigateTo({ name: RouteKey.HOME });
    } else {
        console.log(error.value);
        toast.error(message.value, { class: "toast-error" });
    }
});
</script>
