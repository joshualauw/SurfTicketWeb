<template>
    <div class="bg-primary px-5 py-3 text-gray-50 flex justify-between items-center space-x-3">
        <NuxtLink :to="{ name: RouteKey.HOME }" class="flex items-center space-x-3">
            <NuxtImg src="/images/logo.png" class="rounded-full w-10 h-10" />
            <h1 class="text-xl font-extrabold">SurfTicket</h1>
        </NuxtLink>
        <div class="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger as-child class="relative">
                    <Button variant="none">
                        <BellIcon class="w-7 h-7" />
                        <div
                            class="bg-red-600 rounded-full absolute top-0 right-0 w-4 h-4 text-2xs text-white flex-center"
                        >
                            5
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56 md:w-72">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <div>
                                <p><b>Hoolay</b> created a new ticket</p>
                                <small>4 minutes ago</small>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div>
                                <p><b>Argenti</b> updated ticket go to the museum park</p>
                                <small>26 April, 13:03</small>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="flex justify-between items-center">
                            <span class="text-center font-semibold">View All Activity</span>
                            <ArrowRightIcon />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="none">
                        <Avatar>
                            <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p class="text-sm hidden md:block">joshualauw1@gmail.com</p>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-24 md:w-48">
                    <DropdownMenuGroup>
                        <DropdownMenuItem v-for="drop in CLIENT_DROPDOWN">
                            <NuxtLink :to="{ name: drop.key }" class="flex items-center w-full">
                                <component :is="drop.icon" class="mr-2" />
                                {{ drop.title }}
                            </NuxtLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div @click="doLogout" class="text-destructive flex items-center w-full">
                                <LogOutIcon class="mr-2 text-destructive" />
                                Log Out
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon, BadgeDollarSignIcon, BellIcon, LogOutIcon, StoreIcon, UserIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { RouteKey } from "~/const/route";

const CLIENT_DROPDOWN = [
    {
        title: "Profile",
        icon: UserIcon,
        key: RouteKey.SETTING_ACCOUNT,
    },
    {
        title: "Merchant",
        icon: StoreIcon,
        key: RouteKey.SETTING_MERCHANT,
    },
    {
        title: "Billing",
        icon: BadgeDollarSignIcon,
        key: RouteKey.SETTING_BILLING,
    },
];

const { logout } = useAuthApi();

async function doLogout() {
    try {
        await logout();
        toast.success("logout successful", { class: "toast-success" });

        await nextTick();
        navigateTo({ name: RouteKey.AUTH_LOGIN });
    } catch (e: any) {
        toast.error("logout failed", { class: "toast-error" });
    }
}
</script>
