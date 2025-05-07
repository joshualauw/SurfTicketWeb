<template>
    <div class="px-6 lg:px-28 pt-8 h-[68vh] overflow-y-auto space-y-8">
        <div id="package" class="flex flex-col">
            <div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="border rounded-sm p-8 space-y-8">
                    <div class="text-center">
                        <p class="text-2xl font-extrabold">Free</p>
                        <p class="text-muted-foreground mt-2">Rp. 0 / month</p>
                    </div>
                    <ul class="w-fit mx-auto space-y-3">
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            1 Merchant Account
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            2 Collaborator Account
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            Report & Analytics
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            5 Tickets per Merchant
                        </li>
                    </ul>
                    <Button variant="ghost" class="bg-accent w-fit mx-auto block" disabled> Selected </Button>
                </div>
                <div class="border rounded-sm p-8 space-y-8">
                    <div class="text-center">
                        <p class="text-2xl font-extrabold">Starter</p>
                        <p class="text-muted-foreground mt-2">Rp. 59.000 / month</p>
                    </div>
                    <ul class="w-fit mx-auto space-y-3">
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            3 Merchant Account
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            10 Collaborator Account
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            Advanced Report & Analytics
                        </li>
                        <li class="flex items-center">
                            <CheckIcon class="w-5 h-5 mr-1 text-primary" />
                            Unlimited Tickets per Merchant
                        </li>
                    </ul>
                    <Button variant="secondary" class="w-fit mx-auto block">Buy Now</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CheckIcon, DotIcon } from "lucide-vue-next";
</script>
