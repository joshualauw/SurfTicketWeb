<template>
    <div id="profile" class="flex flex-col">
        <div class="flex items-center">
            <Avatar class="w-20 h-20">
                <AvatarImage src="/images/logo.png" />
                <AvatarFallback class="text-xl">JW</AvatarFallback>
            </Avatar>
            <div class="ml-4">
                <p class="text-lg font-semibold">Joshua William</p>
                <small>Pro plan</small>
            </div>
        </div>
        <form @submit="onSubmit" class="w-[40%] mt-8 space-y-4">
            <FormField v-slot="{ componentField }" name="firstName">
                <FormItem>
                    <FormLabel class="mb-2">Firstname</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" :disabled="!isEditing" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="lastName">
                <FormItem>
                    <FormLabel class="mb-2">Lastname</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" :disabled="!isEditing" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel class="mb-2">Email</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" :disabled="!isEditing" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button @click="isEditing = !isEditing" variant="ghost">
                {{ isEditing ? "Cancel" : "Edit" }}
            </Button>
            <Button v-show="isEditing" type="submit" class="ml-2">Save</Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

const isEditing = ref(false);

const formSchema = toTypedSchema(
    z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        firstName: "Joshua",
        lastName: "William",
        email: "joshualauw1@gmail.com",
    },
});

const onSubmit = handleSubmit((values) => {
    console.log(values);
});
</script>
