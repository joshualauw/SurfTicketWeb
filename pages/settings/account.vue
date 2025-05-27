<template>
    <div class="px-4 lg:px-14 pt-8 overflow-y-auto space-y-8">
        <ClientSettingAccountProfile v-if="profile && profile.data" :data="profile.data" />
        <ClientSettingAccountNotification />
        <ClientSettingAccountPassword />
    </div>
</template>

<script setup lang="ts">
import { RouteKey } from "~/const/route";

const CLIENT_SETTING_ACCOUNT_NAV = [
    {
        name: "Profile",
        target: "#profile",
    },
    {
        name: "Notifications",
        target: "#notification",
    },
    {
        name: "Password",
        target: "#password",
    },
];

definePageMeta({
    middleware: ["auth"],
    layout: "settings",
    name: RouteKey.SETTING_ACCOUNT,
    navs: CLIENT_SETTING_ACCOUNT_NAV,
});

const { getProfile } = useUserApi();
const { data: profile } = await useAsyncData(() => getProfile());
</script>
