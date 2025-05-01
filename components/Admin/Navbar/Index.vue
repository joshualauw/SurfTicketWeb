<template>
    <div class="w-full border-b border-gray-300 py-2 px-2 flex items-center justify-between">
        <div><SidebarTrigger /></div>
        <div class="flex items-center space-x-3">
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
                        <DropdownMenuItem>
                            <span class="text-center font-semibold">View All Activity</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <AdminNavbarProfile />
        </div>
    </div>
</template>

<script setup lang="ts">
import { BellIcon } from "lucide-vue-next";
</script>
