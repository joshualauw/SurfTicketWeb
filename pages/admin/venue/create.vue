<template>
    <Card>
        <CardHeader>Create Venue</CardHeader>
        <CardContent>
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
                <Button :loading="loading" type="submit" class="block mx-auto w-24">Save</Button>
            </form>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import * as z from "zod";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Create Venue",
    name: RouteKey.ADMIN_VENUE_CREATE,
});

const formSchema = toTypedSchema(
    z.object({
        name: z.string(),
        description: z.string().min(3),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});

const route = useRoute();
const merchantId = computed(() => (route.query.id ? parseInt(route.query.id as string) : 0));

const { createVenue } = useVenueApi();
const { loading, execute, success, message } = useApi(createVenue);

const onSubmit = handleSubmit(async (values) => {
    await execute(merchantId.value, values);

    if (success.value) {
        toast.success(message.value, { class: "toast-success" });

        await nextTick();
        navigateTo({ name: RouteKey.ADMIN_VENUE, query: route.query });
    } else {
        toast.error(message.value, { class: "toast-error" });
    }
});
</script>
