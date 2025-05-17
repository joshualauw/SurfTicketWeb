<template>
    <ClientOnly>
        <Dialog>
            <DialogTrigger>
                <Button variant="secondary">Create Now +</Button>
            </DialogTrigger>
            <DialogContent>
                <form @submit="onSubmit" class="w-full space-y-6">
                    <DialogHeader>
                        <DialogTitle>Create Merchant</DialogTitle>
                    </DialogHeader>
                    <div class="space-y-4">
                        <FormField v-slot="{ componentField }" name="name">
                            <FormItem>
                                <FormLabel class="mb-2">Merchant Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Merchant Name..." v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="description">
                            <FormItem>
                                <FormLabel class="mb-2">Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Describe your business..." v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="ghost" type="button">Cancel</Button>
                        </DialogClose>
                        <Button variant="secondary" :loading="loading">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </ClientOnly>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";
import { RouteKey } from "~/const/route";

const formSchema = toTypedSchema(
    z.object({
        name: z.string(),
        description: z.string(),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});

const { createMerchant } = useMerchantApi();
const { loading, execute, success, message, data } = useApi(createMerchant);

const onSubmit = handleSubmit(async (values) => {
    await execute(values);

    if (success.value && data.value) {
        toast.success(message.value, { class: "toast-success" });

        await nextTick();
        navigateTo({ name: RouteKey.ADMIN_DASHBOARD, query: { id: data.value.merchantId } });
    } else {
        toast.error(message.value, { class: "toast-error" });
    }
});
</script>
