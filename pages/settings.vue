<template>
    <div class="grid grid-cols-4 gap-6 border rounded-lg h-[82vh]">
        <div class="hidden lg:block lg:col-span-1 h-[82vh] bg-accent rounded-r-none py-4 px-8">
            <h2 class="font-bold mb-4">Navigation</h2>
            <div class="space-y-2">
                <Button v-for="nav in navs" variant="muted" class="rounded-full w-full">
                    <a :href="nav.target" class="w-full text-left">{{ nav.name }}</a>
                </Button>
            </div>
        </div>
        <div class="col-span-4 lg:col-span-3">
            <Tabs default-value="account" class="mt-4">
                <TabsList class="grid w-full grid-cols-3">
                    <TabsTrigger @click="setSettingAccountNav" value="account">Account</TabsTrigger>
                    <TabsTrigger @click="setSettingMerchantNav" value="merchant">Merchant</TabsTrigger>
                    <TabsTrigger @click="setSettingBillingNav" value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <ClientSettingAccount />
                    <ClientSettingMerchant />
                    <ClientSettingBilling />
                </TabsContent>
            </Tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";
import type { ClientSettingNav } from "~/types/ui/ClientSettingNav";
import {
    CLIENT_SETTING_ACCOUNT_NAV,
    CLIENT_SETTING_BILLING_NAV,
    CLIENT_SETTING_MERCHANT_NAV,
} from "~/const/ui/clientSettingNav";

definePageMeta({
    middleware: ["auth"],
    layout: "client",
    name: RouteKey.SETTING,
});

const navs = ref<ClientSettingNav[]>(CLIENT_SETTING_ACCOUNT_NAV);

function setSettingAccountNav() {
    navs.value = CLIENT_SETTING_ACCOUNT_NAV;
}

function setSettingMerchantNav() {
    navs.value = CLIENT_SETTING_MERCHANT_NAV;
}

function setSettingBillingNav() {
    navs.value = CLIENT_SETTING_BILLING_NAV;
}
</script>
