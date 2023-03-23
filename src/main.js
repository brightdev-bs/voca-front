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
// globalProperties.server = "http://18.180.26.177/server";
// globalProperties.domain = "http://18.180.26.177";

globalProperties.server = "http://localhost:8088";
globalProperties.domain = "http://localhost:8089";

app.mount('#app')

