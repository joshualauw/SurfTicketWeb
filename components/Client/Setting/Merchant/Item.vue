<template>
    <div class="mt-4 flex items-center justify-between w-full">
        <div class="flex items-center">
            <Avatar class="w-16 h-16 border">
                <AvatarImage :src="logoUrl ?? '/images/logo.png'" />
            </Avatar>
            <div class="ml-4">
                <p class="font-semibold cursor-pointer hover:underline">{{ name }}</p>
                <small class="text-muted-foreground">
                    Last visited: {{ dayjs(lastVisitedAt).format("DD MMM YYYY HH:mm") }}
                </small>
            </div>
        </div>
        <NuxtLink :to="{ name: RouteKey.ADMIN_DASHBOARD, query: { id } }">
            <Button variant="ghost" class="border hidden sm:flex">
                <LogInIcon class="mr-1" />
                Enter
            </Button>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { LogInIcon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";

defineProps<{
    id: number;
    name: string;
    logoUrl?: string;
    lastVisitedAt: string;
}>();
</script>
