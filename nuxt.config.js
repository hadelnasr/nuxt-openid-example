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
            local: false,
            customLoginWithGoogle: {
                scheme: 'openIDConnect',
                client_id: process.env.GOOGLE_CLIENT_ID,
                redirect_uri: 'http://localhost:3000/auth/callback',
                logoutRedirectUri: 'http://localhost:3000/logout',
                authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
                userinfo_endpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
                endpoints: {
                    configuration: 'https://accounts.google.com/.well-known/openid-configuration',
                    logout: 'http://localhost:3000/logout'
                },
                idToken: {
                    property: 'id_token',
                    maxAge: 60 * 60 * 24 * 30,
                    prefix: '_id_token.',
                    expirationPrefix: '_id_token_expiration.'
                },
                response_type: 'code',
                grant_type: 'authorization_code',
                scope: ['openid', 'profile'],
                codeChallengeMethod: 'S256',
                _scheme: "~/schemes/customAuthScheme",
            },
        },
        redirect: {
            login: 'http://localhost:3000//login',
            logout: 'http://localhost:3000//logout',
            callback: 'http://localhost:3000//auth/callback',
            home: 'http://localhost:3000//index'
        },
        plugins: [],
    },
});
