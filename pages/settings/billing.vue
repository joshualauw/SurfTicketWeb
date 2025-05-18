<template>
    <div class="px-6 lg:px-14 pt-8 overflow-y-auto space-y-8">
        <div id="package" class="flex flex-col">
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <div v-for="pricing in pricings" class="border rounded-sm p-8 space-y-8">
                    <div class="text-center">
                        <p class="text-2xl font-extrabold">{{ pricing.name }}</p>
                        <p class="text-muted-foreground mt-2">
                            <span class="font-bold text-secondary">Rp. {{ pricing.price }}</span> / month
                        </p>
                    </div>
                    <ul class="w-fit mx-auto space-y-3">
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            {{ pricing.merchantCount }} Merchant Account
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            {{ pricing.collaboratorCount }} Collaborator Account
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            {{ pricing.reportType }} Report & Analytics
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            {{ pricing.ticketCount }} Tickets per Merchant
                        </li>
                    </ul>
                    <Button
                        v-if="loggedUser?.activePlan == pricing.code"
                        variant="ghost"
                        class="bg-accent w-fit mx-auto block"
                        disabled
                    >
                        Selected
                    </Button>
                    <Button v-else variant="secondary" class="w-fit mx-auto block"> Buy Now </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import pricings from "~/assets/static/pricing.json";
import { CheckIcon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";

const CLIENT_SETTING_BILLING_NAV = [
    {
        name: "Package",
        target: "#package",
    },
];

definePageMeta({
    middleware: ["auth"],
    layout: "settings",
    name: RouteKey.SETTING_BILLING,
    navs: CLIENT_SETTING_BILLING_NAV,
});

const { loggedUser } = useAuthStore();
</script>
