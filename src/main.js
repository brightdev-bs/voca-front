import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router.js';

import vSelect from "vue-select";

import vuetify from './plugins/vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { loadFonts } from './plugins/webfontloader'

import VCalendar from 'v-calendar'
import VueBasicAlert from 'vue-basic-alert'

import vue3GoogleLogin from 'vue3-google-login'
import { createHead } from '@vueuse/head'


const pinia = createPinia();
const head = createHead();

loadFonts()

let app = createApp(App)
    .use(router)
    .use(vuetify)
    .use(aliases, mdi)
    .use(VCalendar, {})
    .use(pinia)
    .use(vue3GoogleLogin, {
        clientId: '178996359638-7l7a0t9l4slvtdvao0amrtf7tg47mphh.apps.googleusercontent.com',
    })
    .use(VueBasicAlert)
    .use(head)

app.component("v-select", vSelect)

let globalProperties = app.config.globalProperties;

globalProperties.domain = process.env.VUE_APP_ADDRESS
globalProperties.server = process.env.VUE_APP_ADDRESS_API;

app.mount('#app')

