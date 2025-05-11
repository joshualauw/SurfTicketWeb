<template>
    <main class="bg-white flex flex-col h-screen">
        <slot />
        <ClientOnly>
            <Toaster position="top-right" />
        </ClientOnly>
    </main>
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
