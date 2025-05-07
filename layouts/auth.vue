<template>
    <NuxtLayout name="default">
        <div class="w-screen h-screen flex-center bg-image p-4 bg-muted">
            <Card class="w-full md:max-w-[500px]">
                <CardHeader v-if="$route.meta.title" class="flex-center flex-col">
                    <NuxtImg src="/images/logo.png" class="w-32 h-32" />
                    <CardTitle class="text-center text-lg">{{ $route.meta.title }}</CardTitle>
                </CardHeader>
                <CardContent>
                    <slot />
                </CardContent>
            </Card>
        </div>
    </NuxtLayout>
</template>

<style scoped>
.bg-image {
    position: relative;
    z-index: 0;
}

.bg-image::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url("/images/auth_bg.jpg") no-repeat center center;
    background-size: cover;
    z-index: -1;
}
</style>
