<template>
    <ClientOnly>
        <Dialog v-model:open="isOpen">
            <DialogTrigger>
                <Button variant="destructive" size="sm">
                    <Trash2Icon />
                    <span class="hidden md:block">Delete</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                </DialogHeader>
                <div class="my-4 flex-center flex-col text-destructive">
                    <CircleXIcon class="w-24 h-24 mb-2" />
                    Deleted item cannot be recovered. Are you sure?
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button @click="emit('done', false)" variant="ghost" type="button">Cancel</Button>
                    </DialogClose>
                    <Button @click="doDeleteVenue" variant="destructive" :loading="loading" :disabled="timer > 0">
                        <span v-if="timer > 0" class="mr-1">{{ timer }}</span> Delete Forever
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </ClientOnly>
</template>

<script setup lang="ts">
import { CircleXIcon, Trash2Icon } from "lucide-vue-next";
import { toast } from "vue-sonner";

const props = defineProps<{
    merchantId: number;
    venueId: number;
}>();

const emit = defineEmits<{
    (e: "done", success: boolean): void;
}>();

const timer = ref(3);
const isOpen = ref(false);

watch(isOpen, (val) => {
    if (val) {
        const interval = setInterval(() => {
            timer.value--;
            if (timer.value == 0) clearInterval(interval);
        }, 1000);
    }
});

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
