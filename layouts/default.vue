<template>
    <main class="w-screen h-screen bg-zinc-50">
        <slot />
    </main>
    <ClientOnly>
        <Toaster position="top-right" />
    </ClientOnly>
</template>

<style>
.toast-error {
    background-color: #e95050;
    color: white;
    border: none;
}
.toast-success {
    background-color: #2bac52;
    color: white;
    border: none;
}
</style>
