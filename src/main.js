import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router.js';

import vSelect from "vue-select";

import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import VCalendar from 'v-calendar'
import VueBasicAlert from 'vue-basic-alert'

const pinia = createPinia();

loadFonts()

let app = createApp(App)
    .use(router)
    .use(vuetify)
    .use(VCalendar, {})
    .use(pinia)
    .use(VueBasicAlert)

app.component("v-select", vSelect)

let globalProperties = app.config.globalProperties;

globalProperties.domain = process.env.VUE_APP_ADDRESS
globalProperties.server = process.env.VUE_APP_ADDRESS_API;

app.mount('#app')

