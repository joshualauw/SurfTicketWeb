<template>
    <div class="px-6 lg:px-14 pt-8 space-y-8">
        <ClientSettingAccountProfile :data="data" />
        <ClientSettingAccountNotification />
        <ClientSettingAccountPassword />
    </div>
</template>

<script setup lang="ts">
import type { GetProfileResponse } from "~/types/api/user/GetProfileResponse";

defineProps<{ data: GetProfileResponse }>();
</script>
