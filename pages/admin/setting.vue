<template>
    <Card>
        <CardHeader></CardHeader>
        <CardContent>
            <div class="flex items-center">
                <Avatar class="w-20 h-20 md:w-28 md:h-28 mb-8 mr-4">
                    <AvatarImage :src="attachment.preview ?? '/images/logo.png'" alt="@unovue" />
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
            <div class="space-y-8 text-sm">
                <div>
                    <p class="font-semibold mb-2">Name</p>
                    <p>-</p>
                </div>
                <div>
                    <p class="font-semibold mb-2">Description</p>
                    <p>-</p>
                </div>
                <Button
                    v-if="hasPermission('SETTINGS', 'UPDATE')"
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
import { toast } from "vue-sonner";
import { RouteKey } from "~/const/route";
import type { PermissionCode } from "~/types/atoms/PermissionCode";
import type { Attachment } from "~/types/common/Attachment";

definePageMeta({
    middleware: ["auth", "admin"],
    layout: "admin",
    title: "Settings",
    permission: "SETTINGS" as PermissionCode,
    name: RouteKey.ADMIN_SETTING,
});

const { hasPermission } = useMerchantUserStore();

const isEdit = ref(false);
const attachment = reactive<Attachment>({
    preview: null,
    file: null,
});

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
</script>
