<template>
    <div class="grid grid-cols-4 border-2 rounded-lg h-[84vh] bg-zinc-50">
        <div class="hidden lg:block lg:col-span-1 h-[84vh] bg-primary rounded-r-none py-4 px-8 text-gray-200">
            <h2 class="font-bold my-6">Navigation</h2>
            <div class="space-y-2">
                <Button v-for="nav in navs" variant="ghost" class="rounded-full w-full">
                    <a :href="nav.target" class="w-full text-left">{{ nav.name }}</a>
                </Button>
            </div>
        </div>
        <div class="col-span-4 lg:col-span-3 px-6">
            <Tabs default-value="account" class="mt-4">
                <TabsList class="grid w-full grid-cols-3">
                    <TabsTrigger @click="setSettingAccountNav" value="account">Account</TabsTrigger>
                    <TabsTrigger @click="setSettingMerchantNav" value="merchant">Merchant</TabsTrigger>
                    <TabsTrigger @click="setSettingBillingNav" value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <ClientSettingAccount />
                </TabsContent>
                <TabsContent value="merchant">
                    <ClientSettingMerchant />
                </TabsContent>
                <TabsContent value="billing">
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
