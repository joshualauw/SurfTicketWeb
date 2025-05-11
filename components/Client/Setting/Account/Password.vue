<template>
    <div id="password" class="flex flex-col">
        <h2 class="text-lg font-semibold">Change Password</h2>
        <form @submit="onSubmit" class="w-full lg:w-[40%] mt-8 space-y-4">
            <FormField v-slot="{ componentField }" name="oldPassword">
                <FormItem>
                    <FormLabel class="mb-2">Current Password</FormLabel>
                    <FormControl>
                        <Input type="password" v-bind="componentField" :disabled="!isEditing" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
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
            <Button @click="toogleEdit" variant="ghost" type="button">
                {{ isEditing ? "Cancel" : "Edit" }}
            </Button>
            <Button v-show="isEditing" :loading="loading" variant="secondary" type="submit" class="ml-2">Save</Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";

const isEditing = ref(false);

const formSchema = toTypedSchema(
    z
        .object({
            oldPassword: z.string().min(6).max(12),
            password: z.string().min(6).max(12),
            passwordConfirmation: z.string().min(6).max(12),
        })
        .refine((d) => d.password === d.passwordConfirmation, {
            message: "Password doesn't match",
            path: ["passwordConfirmation"],
        })
);

const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
});

const { changePassword } = useAuthApi();
const { loading, execute, success, message, data } = useApi(changePassword);

const onSubmit = handleSubmit(async (values) => {
    await execute(values);

    if (success.value && data.value) {
        isEditing.value = false;
        resetForm();
        toast.success(message.value, { class: "toast-success" });
    } else {
        toast.error(message.value, { class: "toast-error" });
    }
});

function toogleEdit() {
    isEditing.value = !isEditing.value;
    if (!isEditing.value) {
        resetForm();
    }
}
</script>
