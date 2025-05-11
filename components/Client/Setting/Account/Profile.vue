<template>
    <div id="profile" class="flex flex-col">
        <div class="flex items-center">
            <Avatar class="w-20 h-20 border">
                <AvatarImage src="/images/logo.png" />
                <AvatarFallback class="text-xl">JW</AvatarFallback>
            </Avatar>
            <div class="ml-4">
                <p class="text-lg font-semibold">Joshua William</p>
                <small>Pro plan</small>
            </div>
        </div>
        <form @submit="onSubmit" class="w-full lg:w-[40%] mt-8 space-y-4">
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
                    <small v-if="isEditing" class="text-destructive">
                        *You must confirm email again after changing
                    </small>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button @click="isEditing = !isEditing" variant="ghost" type="button">
                {{ isEditing ? "Cancel" : "Edit" }}
            </Button>
            <Button v-show="isEditing" :loading="loading" variant="secondary" type="submit" class="ml-2">Save</Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import useUserApi from "~/composables/external/useUserApi";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";

const { data: props } = defineProps<{ data: z.infer<typeof schema> }>();

const isEditing = ref(false);

const schema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
});

const formSchema = toTypedSchema(schema);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
    },
});

const { updateProfile } = useUserApi();
const { loading, execute, success, message, data } = useApi(updateProfile);

const onSubmit = handleSubmit(async (values) => {
    await execute(values);

    if (success.value && data.value) {
        isEditing.value = false;
        toast.success(message.value, { class: "toast-success" });
    } else {
        toast.error(message.value, { class: "toast-error" });
    }
});
</script>
