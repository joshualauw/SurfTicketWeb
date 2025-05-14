<template>
    <div class="px-14 pt-8 h-[68vh]">
        <div
            v-if="data.collaboratedMerchants.length == 0 && data.ownedMerchants.length == 0"
            class="w-full h-full flex-center flex-col space-y-4"
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
                    v-for="merchant in data.ownedMerchants"
                    :name="merchant.name"
                    :logo-url="merchant.logoUrl"
                    :last-visited-at="merchant.createdAt"
                />
                <p v-if="data.ownedMerchants.length == 0" class="text-gray-400 text-center">
                    -You have no Main Account-
                </p>
            </div>
            <div id="collaborator" class="flex flex-col">
                <h2 class="text-lg font-semibold mb-4">Collaborator Accounts</h2>
                <ClientSettingMerchantItem
                    v-for="merchant in data.collaboratedMerchants"
                    :name="merchant.name"
                    :logo-url="merchant.logoUrl"
                    :last-visited-at="merchant.createdAt"
                />
                <p v-if="data.collaboratedMerchants.length == 0" class="text-gray-400 text-center">
                    -You have no Collaborator Account-
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CalendarX2Icon } from "lucide-vue-next";
import type { GetHandledMerchantResponse } from "~/types/api/merchant/GetHandledMerchantResponse";

defineProps<{ data: GetHandledMerchantResponse }>();
</script>
