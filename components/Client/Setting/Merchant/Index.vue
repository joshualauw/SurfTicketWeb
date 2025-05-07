<template>
    <div class="px-14 pt-8 h-[68vh] overflow-y-auto space-y-8">
        <div class="w-full h-full flex-center flex-col space-y-4">
            <CalendarX2Icon class="text-gray-400 w-24 h-24" />
            <p class="text-gray-400 text-xl">-You have no Merchant Account-</p>
            <ClientSettingMerchantCreate />
        </div>
        <!-- <div id="main" class="flex flex-col">
            <h2 class="text-lg font-semibold">Main Accounts</h2>
            <div class="mt-4 flex items-center justify-between w-full">
                <div class="flex items-center">
                    <Avatar class="w-16 h-16 border">
                        <AvatarImage src="/images/logo.png" />
                        <AvatarFallback class="text-xl">JW</AvatarFallback>
                    </Avatar>
                    <div class="ml-4">
                        <p class="font-semibold cursor-pointer hover:underline">Natlan Amusement Park</p>
                        <small class="text-muted-foreground">Last visited: 28 Ferbruary 2025 11:23</small>
                    </div>
                </div>
                <Button variant="ghost" class="border">
                    <LogInIcon class="mr-1" />
                    Enter
                </Button>
            </div>
        </div>
        <div id="collaborator" class="flex flex-col">
            <h2 class="text-lg font-semibold">Collaborator Accounts</h2>
            <div class="mt-4 flex items-center justify-between w-full">
                <div class="flex items-center">
                    <Avatar class="w-16 h-16 border">
                        <AvatarImage src="/images/logo.png" />
                        <AvatarFallback class="text-xl">JW</AvatarFallback>
                    </Avatar>
                    <div class="ml-4">
                        <p class="font-semibold cursor-pointer hover:underline">Fontaine La Champagne</p>
                        <small class="text-muted-foreground">Last visited: 31 Arpil 2025 07:16</small>
                    </div>
                </div>
                <Button variant="ghost" class="border">
                    <LogInIcon class="mr-1" />
                    Enter
                </Button>
            </div>
            <div class="mt-4 flex items-center justify-between w-full">
                <div class="flex items-center">
                    <Avatar class="w-16 h-16 border">
                        <AvatarImage src="/images/logo.png" />
                        <AvatarFallback class="text-xl">JW</AvatarFallback>
                    </Avatar>
                    <div class="ml-4">
                        <p class="font-semibold cursor-pointer hover:underline">Inazuma City</p>
                        <small class="text-muted-foreground">Last visited: 07 June 2025 21:05</small>
                    </div>
                </div>
                <Button variant="ghost" class="border">
                    <LogInIcon class="mr-1" />
                    Enter
                </Button>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { CalendarX2Icon, LogInIcon } from "lucide-vue-next";
</script>
