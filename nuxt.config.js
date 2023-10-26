import { defineNuxtConfig } from "@nuxt/bridge";
import fs from 'fs';

export default defineNuxtConfig({
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
            }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
        script: []
    },
    loading: {
        color: "#fff"
    },
    reactiveLoading: true,
    css: [],
    plugins: [],
    modules: [
        "@nuxtjs/auth",
        '@nuxtjs/axios'
    ],
    build: {
        transpile: ["@nuxtjs/auth"]
    },
    server: {
        https: {
            key: fs.readFileSync(process.env.CUSTOM_OPENID_ROOT_CERTIFICATE_KEY_PATH),
            cert: fs.readFileSync(process.env.CUSTOM_OPENID_ROOT_CERTIFICATE_PATH)
        }
    },
    auth: {
        strategies: {
            local: false,
            google: {
                client_id: process.env.GOOGLE_CLIENT_ID
            },
            customLoginStrategy: {
                authorization_endpoint: process.env.CUSTOM_OPENID_AUTHORIZATION_ENDPOINT,
                response_type: process.env.CUSTOM_OPENID_RESPONSE_TYPE,
                client_id: process.env.CUSTOM_OPENID_CLIENT_ID,
                endpoints: {
                    configuration: process.env.CUSTOM_OPENID_CONFIGURATION_URL
                },
                idToken: {
                    property: 'id_token',
                    maxAge: 60 * 60 * 24 * 30,
                    prefix: '_id_token.',
                    expirationPrefix: '_id_token_expiration.'
                },
                responseType: 'code',
                grantType: 'authorization_code',
                scope: ['openid','profile','offline_access'],
                codeChallengeMethod: 'S256',
                _scheme: '~/schemes/customAuthScheme'
            }
        },
        redirect: {
            login: '/login',
            logout: '/logout',
            callback: '/auth/callback',
            home: '/'
        },
        plugins: []
    }
});
