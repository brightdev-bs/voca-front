import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';


import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import VCalendar from 'v-calendar'
import VueBasicAlert from 'vue-basic-alert'

loadFonts()

let app = createApp(App)
    .use(router)
    .use(vuetify)
    .use(VCalendar, {})
    .use(VueBasicAlert)

let globalProperties = app.config.globalProperties;
globalProperties.server = "18.180.26.177:8088";
globalProperties.domain = "18.180.26.177:8089";

app.mount('#app')

