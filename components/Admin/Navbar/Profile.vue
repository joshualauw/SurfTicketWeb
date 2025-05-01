<script lang="ts" setup></script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="">
                <Avatar>
                    <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p class="text-sm text-gray-700 hidden md:block">joshualauw1@gmail.com</p>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-24 md:w-48">
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <span class="text-red-600">Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
