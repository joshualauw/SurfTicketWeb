<template>
    <form @submit="onSubmit" class="space-y-5">
        <LockKeyholeOpenIcon class="text-gray-300 w-24 h-24 block mx-auto" />
        <p class="text-gray-600 text-center">Reset your password</p>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>Password</FormLabel>
                <SurfPassword :componentField="componentField" />
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password_confirmation">
            <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <SurfPassword :componentField="componentField" />
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" class="w-full"> Reset </Button>
    </form>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";
import { useForm } from "vee-validate";
import { LockKeyholeOpenIcon } from "lucide-vue-next";

definePageMeta({
    layout: "auth",
    name: RouteKey.AUTH_RESET_PASSWORD,
});

const form = useForm();

const onSubmit = form.handleSubmit((values) => {
    console.log("submitted", values);
});
</script>
