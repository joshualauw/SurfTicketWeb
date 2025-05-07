<template>
    <form @submit="onSubmit" class="space-y-5">
        <FormField v-slot="{ componentField }" name="username">
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
        <FormField v-slot="{ componentField }" name="password_confirmation">
            <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <SurfPassword :componentField="componentField" />
                <FormMessage />
            </FormItem>
        </FormField>
        <div>
            <Button type="submit" class="w-full"> Submit </Button>
            <Button variant="link" class="block mx-auto mt-2">
                <NuxtLink :to="{ name: RouteKey.AUTH_LOGIN }"> Already have an account? </NuxtLink>
            </Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";
import { useForm } from "vee-validate";

definePageMeta({
    layout: "auth",
    title: "Sign Up",
    name: RouteKey.AUTH_REGISTER,
});

const form = useForm();

const onSubmit = form.handleSubmit((values) => {
    console.log("submitted", values);
});
</script>
