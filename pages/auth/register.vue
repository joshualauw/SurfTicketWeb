<template>
    <form @submit="onSubmit" class="space-y-5">
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="your_email@mail.com" v-bind="componentField" />
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
        <FormField v-slot="{ componentField }" name="passwordConfirmation">
            <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <SurfPassword :componentField="componentField" />
                <FormMessage />
            </FormItem>
        </FormField>
        <div>
            <Button :loading="loading" type="submit" class="w-full">Submit</Button>
            <Button variant="link" class="block mx-auto mt-2">
                <NuxtLink :to="{ name: RouteKey.AUTH_LOGIN }">Already have an account?</NuxtLink>
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { toast } from "vue-sonner";

definePageMeta({
    layout: "auth",
    title: "Sign Up",
    name: RouteKey.AUTH_REGISTER,
});

const formSchema = toTypedSchema(
    z
        .object({
            email: z.string().email(),
            password: z.string().min(6).max(12),
            passwordConfirmation: z.string().min(6).max(12),
        })
        .refine((d) => d.password === d.passwordConfirmation, {
            message: "Password doesn't match",
            path: ["passwordConfirmation"],
        })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});
const { register } = useAuthApi();
const { loading, execute, success, message, data } = useApi(register);

const onSubmit = handleSubmit(async (values) => {
    await execute(values);

    if (success.value && data.value) {
        toast.success(message.value, { class: "toast-success" });

        await nextTick();
        navigateTo({ name: RouteKey.AUTH_CONFIRM_EMAIL, query: { email: values.email } });
    } else {
        toast.error(message.value, { class: "toast-error" });
    }
});
</script>
