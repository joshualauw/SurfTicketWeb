<template>
    <Card>
        <CardContent v-if="adminVenue">
            <div class="flex items-center">
                <Avatar class="w-20 h-20 md:w-28 md:h-28 mb-8 mr-4">
                    <AvatarImage :src="attachment.preview ?? adminVenue.logoUrl ?? '/images/logo.png'" alt="@unovue" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div v-if="isEdit">
                    <p class="font-semibold mb-2">Logo <span class="text-sm text-gray-500">(max: 5mb)</span></p>
                    <Input
                        accept="image/png, image/jpeg, image/webp"
                        @change="handleFileChange"
                        id="picture"
                        type="file"
                        class="w-56"
                    />
                </div>
            </div>
            <AdminVenueEdit
                v-if="isEdit"
                @done="handleDoneEdit"
                :merchant-id="merchantId"
                :venue-id="venueId"
                :name="adminVenue.name"
                :description="adminVenue.description"
            />
            <div v-else class="space-y-8 text-sm">
                <div>
                    <p class="font-semibold mb-2">Name</p>
                    <p>{{ adminVenue.name }}</p>
                </div>
                <div>
                    <p class="font-semibold mb-2">Description</p>
                    <p>{{ adminVenue.description }}</p>
                </div>
                <Button
                    v-if="hasPermission('VENUE', 'UPDATE')"
                    @click="isEdit = true"
                    variant="ghost"
                    type="button"
                    class="flex mx-auto w-24"
                >
                    <EditIcon />
                    Edit
                </Button>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { EditIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import Avatar from "~/components/ui/avatar/Avatar.vue";
import { RouteKey } from "~/const/route";
import type { PermissionCode } from "~/types/atoms/PermissionCode";
import type { Attachment } from "~/types/common/Attachment";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Venue Detail",
    permission: "VENUE" as PermissionCode,
    name: RouteKey.ADMIN_VENUE_DETAIL,
});

const route = useRoute();
const { hasPermission } = useMerchantUserStore();

const isEdit = ref(false);
const attachment = reactive<Attachment>({
    preview: null,
    file: null,
});
const merchantId = computed(() => (route.query.id ? parseInt(route.query.id as string) : 0));
const venueId = computed(() => (route.params.id ? parseInt(route.params.id as string) : 0));
const adminVenue = computed(() => data.value?.data ?? null);

const { getAdminVenue, updateVenueLogo } = useVenueApi();
const { execute, success: _success } = useApi(updateVenueLogo);
const { data, refresh } = await useAsyncData(() => getAdminVenue(merchantId.value, venueId.value));

async function handleDoneEdit(success: boolean) {
    if (success) {
        if (attachment.file) {
            await execute(merchantId.value, venueId.value, { logo: attachment.file });

            if (!_success.value) {
                toast.error("Change logo failed", { class: "toast-error" });
            } else {
                attachment.file = null;
                attachment.preview = null;
            }
        }
        await refresh();
    }
    isEdit.value = false;
}

function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file) {
        if (file.size > maxSize) {
            toast.error(`File cannot exceed 5mb`, { class: "toast-error" });
            return;
        }

        attachment.file = file;
        attachment.preview = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (attachment.preview) {
        URL.revokeObjectURL(attachment.preview);
    }
});
</script>
