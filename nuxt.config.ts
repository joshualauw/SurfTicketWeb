import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: ["shadcn-nuxt", "@nuxt/image"],
    css: ["~/assets/css/tailwind.css"],
    vite: {
        plugins: [tailwindcss()],
    },
    shadcn: {
        prefix: "",
        componentDir: "./components/ui",
    },
    imports: {
        dirs: ["composables/**"],
    },
    ssr: true,
});
