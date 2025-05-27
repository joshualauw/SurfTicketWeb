<template>
    <Card>
        <CardContent v-if="adminVenue">
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
import { RouteKey } from "~/const/route";
import type { PermissionCode } from "~/types/atoms/PermissionCode";

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
const merchantId = computed(() => (route.query.id ? parseInt(route.query.id as string) : 0));
const venueId = computed(() => (route.params.id ? parseInt(route.params.id as string) : 0));

const { getAdminVenue } = useVenueApi();
const { data, refresh } = await useAsyncData(() => getAdminVenue(merchantId.value, venueId.value));

async function handleDoneEdit(success: boolean) {
    if (success) {
        await refresh();
    }
    isEdit.value = false;
}

const adminVenue = computed(() => data.value?.data ?? null);
</script>
