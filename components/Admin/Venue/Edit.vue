<template>
    <form @submit="onSubmit" class="space-y-8">
        <FormField v-slot="{ componentField }" name="name">
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Name..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Describe your venue..." class="min-h-48" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <div class="flex w-full justify-center space-x-2">
            <Button @click="emit('done', false)" variant="ghost" type="button" class="w-24">Cancel</Button>
            <Button :loading="loading" type="submit" class="w-24">Save</Button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";

const props = defineProps<{
    merchantId: number;
    venueId: number;
    name: string;
    description: string;
}>();

const emit = defineEmits<{
    (e: "done", success: boolean): void;
}>();

const formSchema = toTypedSchema(
    z.object({
        name: z.string(),
        description: z.string().min(3),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        name: props.name,
        description: props.description,
    },
});
const { updateVenue } = useVenueApi();
const { loading, execute, success, message } = useApi(updateVenue);

const onSubmit = handleSubmit(async (values) => {
    await execute(props.merchantId, props.venueId, values);

    if (success.value) {
        toast.success(message.value, { class: "toast-success" });
        emit("done", true);
    } else {
        toast.error(message.value, { class: "toast-error" });
    }
});
</script>
