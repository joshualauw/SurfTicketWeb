<template>
    <div id="password" class="flex flex-col">
        <h2 class="text-lg font-semibold">Change Password</h2>
        <form @submit="onSubmit" class="w-full lg:w-[40%] mt-8 space-y-4">
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel class="mb-2">New Password</FormLabel>
                    <FormControl>
                        <Input type="password" v-bind="componentField" :disabled="!isEditing" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="passwordConfirmation">
                <FormItem>
                    <FormLabel class="mb-2">Password Confirmation</FormLabel>
                    <FormControl>
                        <Input type="password" v-bind="componentField" :disabled="!isEditing" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button @click="isEditing = !isEditing" variant="ghost">
                {{ isEditing ? "Cancel" : "Edit" }}
            </Button>
            <Button v-show="isEditing" variant="secondary" type="submit" class="ml-2">Save</Button>
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
        password: z.string(),
        passwordConfirmation: z.string(),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        password: "",
        passwordConfirmation: "",
    },
});

const onSubmit = handleSubmit((values) => {
    console.log(values);
});
</script>
