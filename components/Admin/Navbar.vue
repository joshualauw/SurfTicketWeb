<template>
    <div class="w-full border-b border-gray-300 py-2 px-2 flex items-center justify-between">
        <div>
            <SidebarTrigger />
        </div>
        <div class="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger as-child class="relative">
                    <Button variant="ghost">
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
                    <Button v-if="loggedUser" variant="ghost">
                        <Avatar>
                            <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
                            <AvatarFallback>{{ loggedUser.username.substring(0, 1).toUpperCase() }}</AvatarFallback>
                        </Avatar>
                        <p class="text-sm text-gray-700 hidden md:block">{{ loggedUser.email }}</p>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-24 md:w-48">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <NuxtLink :to="{ name: RouteKey.HOME }" class="text-destructive flex items-center">
                                <LogOutIcon class="mr-2 text-destructive" />
                                Back to Home
                            </NuxtLink>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon, BellIcon, LogOutIcon } from "lucide-vue-next";
import { RouteKey } from "~/const/route";

const { loggedUser } = useAuthStore();
</script>
