import { defineNuxtConfig } from "@nuxt/bridge";

export default defineNuxtConfig({
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || "",
            },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
        script: [],
    },
    loading: {
        color: "#fff",
    },
    reactiveLoading: true,
    css: [],
    plugins: [],
    modules: [
        "@nuxtjs/auth",
        '@nuxtjs/axios',
    ],
    build: {
        transpile: ["@nuxtjs/auth"],
    },
    auth: {
        strategies: {
            google: {
                client_id: process.env.GOOGLE_CLIENT_ID,
            },
        },
        redirect: {
            login: '/login',
            logout: '/logout',
            callback: '/auth/callback',
            home: '/'
        },
        plugins: [],
    },
});
