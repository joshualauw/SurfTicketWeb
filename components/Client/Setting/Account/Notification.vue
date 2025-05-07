<template>
    <div id="notification" class="flex flex-col">
        <h2 class="text-lg font-semibold">Notifications</h2>
        <form @submit="onSubmit" class="mt-8 space-y-4">
            <FormField v-slot="{ value, handleChange }" type="checkbox" name="1">
                <FormItem class="flex items-center">
                    <FormControl>
                        <Checkbox :model-value="value" @update:model-value="handleChange" :disabled="!isEditing" />
                    </FormControl>
                    <div class="space-y-1 leading-none">
                        <FormLabel>Receive new purchased ticket event</FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>
            <FormField v-slot="{ value, handleChange }" type="checkbox" name="2">
                <FormItem class="flex items-center">
                    <FormControl>
                        <Checkbox :model-value="value" @update:model-value="handleChange" :disabled="!isEditing" />
                    </FormControl>
                    <div class="space-y-1 leading-none">
                        <FormLabel>Receive new merchant collaborator invitation</FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            </FormField>
            <FormField v-slot="{ value, handleChange }" type="checkbox" name="3">
                <FormItem class="flex items-center">
                    <FormControl>
                        <Checkbox :model-value="value" @update:model-value="handleChange" :disabled="!isEditing" />
                    </FormControl>
                    <div class="space-y-1 leading-none">
                        <FormLabel>Receive promotional & marketing app updates</FormLabel>
                        <FormMessage />
                    </div>
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
        1: z.boolean().optional(),
        2: z.boolean().optional(),
        3: z.boolean().optional(),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
    console.log(values);
});
</script>
