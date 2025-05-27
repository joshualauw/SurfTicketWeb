<template>
    <div v-if="merchants && merchants.data" class="px-4 lg:px-14 pt-8 overflow-y-auto space-y-8">
        <div
            v-if="merchants.data.collaboratedMerchants.length == 0 && merchants.data.ownedMerchants.length == 0"
            class="w-full h-full flex-center flex-col space-y-4 mt-14 lg:mt-28"
        >
            <CalendarX2Icon class="text-gray-400 w-24 h-24" />
            <p class="text-gray-400 text-xl">-You have no Merchant Account-</p>
            <ClientSettingMerchantCreate />
        </div>
        <div v-else class="overflow-y-auto space-y-8">
            <div id="main" class="flex flex-col">
                <div class="flex justify-between items-center w-full mb-4">
                    <h2 class="text-lg font-semibold">Main Accounts</h2>
                    <ClientSettingMerchantCreate />
                </div>
                <ClientSettingMerchantItem
                    v-for="merchant in merchants.data.ownedMerchants"
                    :id="merchant.id"
                    :name="merchant.name"
                    :logo-url="merchant.logoUrl"
                    :last-visited-at="merchant.lastVisitedAt"
                />
                <p v-if="merchants.data.ownedMerchants.length == 0" class="text-gray-400 text-center">
                    -You have no Main Account-
                </p>
            </div>
            <div id="collaborator" class="flex flex-col">
                <h2 class="text-lg font-semibold mb-4">Collaborator Accounts</h2>
                <ClientSettingMerchantItem
                    v-for="merchant in merchants.data.collaboratedMerchants"
                    :id="merchant.id"
                    :name="merchant.name"
                    :logo-url="merchant.logoUrl"
                    :last-visited-at="merchant.lastVisitedAt"
                />
                <p v-if="merchants.data.collaboratedMerchants.length == 0" class="text-gray-400 text-center">
                    -You have no Collaborator Account-
                </p>
            </div>
        </div>
    </div>
    <div v-else>.</div>
</template>

<script setup lang="ts">
import { CalendarX2Icon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";

const CLIENT_SETTING_MERCHANT_NAV = [
    {
        name: "Main",
        target: "#main",
    },
    {
        name: "Collaborator",
        target: "#collaborator",
    },
];

definePageMeta({
    middleware: ["auth"],
    layout: "settings",
    name: RouteKey.SETTING_MERCHANT,
    navs: CLIENT_SETTING_MERCHANT_NAV,
});

const { getHandledMerchants } = useMerchantApi();
const { data: merchants } = await useAsyncData(() => getHandledMerchants());
</script>
