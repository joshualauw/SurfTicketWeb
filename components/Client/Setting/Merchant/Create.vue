<template>
    <Dialog>
        <DialogTrigger><Button variant="secondary">Create Now +</Button></DialogTrigger>
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
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button variant="secondary" type="submit">Save</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
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
    initialValues: {
        name: "",
        description: "",
    },
});

const onSubmit = handleSubmit((values) => {
    console.log(values);
    navigateTo({ name: RouteKey.ADMIN_DASHBOARD });
});
</script>
