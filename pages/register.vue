<template>
    <form @submit="onSubmit" class="space-y-6">
        <FormField v-slot="{ componentField }" name="username">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="your_email@mail.com" v-bind="componentField" />
                </FormControl>
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="*****" v-bind="componentField" />
                </FormControl>
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password_confirmation">
            <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <FormControl>
                    <Input type="password_confirmation" placeholder="*****" v-bind="componentField" />
                </FormControl>
            </FormItem>
        </FormField>
        <p class="text-gray-500 text-sm text-center">
            <NuxtLink :to="{ name: RouteKey.LOGIN }"> already have an account? login </NuxtLink>
        </p>
        <Button type="submit" class="w-full">Submit</Button>
    </form>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";
import { useForm } from "vee-validate";

definePageMeta({
    layout: "auth",
    title: "Sign Up",
    name: RouteKey.REGISTER,
});

const form = useForm();

const onSubmit = form.handleSubmit((values) => {
    console.log("submitted", values);
});
</script>
