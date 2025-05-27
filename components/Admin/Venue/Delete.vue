<template>
    <ClientOnly>
        <Dialog>
            <DialogTrigger>
                <Button variant="destructive" size="sm">
                    <Trash2Icon />
                    <span class="hidden md:block">Delete</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <VisuallyHidden asChild>
                    <DialogHeader>
                        <DialogTitle>Delete Confirmation</DialogTitle>
                    </DialogHeader>
                </VisuallyHidden>
                <div class="my-4 flex-center flex-col text-destructive">
                    <CircleXIcon class="w-20 h-20 mb-2" />
                    Deleted item cannot be recovered. Are you sure?
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button @click="emit('done', false)" variant="ghost" type="button">Cancel</Button>
                    </DialogClose>
                    <Button @click="doDeleteVenue" variant="destructive" :loading="loading">Delete Forever</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </ClientOnly>
</template>

<script setup lang="ts">
import { CircleXIcon, Trash2Icon } from "lucide-vue-next";
import { VisuallyHidden } from "reka-ui";
import { toast } from "vue-sonner";

const props = defineProps<{
    merchantId: number;
    venueId: number;
}>();

const emit = defineEmits<{
    (e: "done", success: boolean): void;
}>();

const { deleteVenue } = useVenueApi();
const { success, loading, execute, message } = useApi(deleteVenue);

async function doDeleteVenue() {
    await execute(props.merchantId, props.venueId);

    if (success.value) {
        toast.success(message.value, { class: "toast-success" });
        emit("done", true);
    } else {
        toast.error(message.value, { class: "toast-error" });
    }
}
</script>
