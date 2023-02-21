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
globalProperties.server = "http://18.180.26.177/server";
globalProperties.domain = "http://18.180.26.177:8089";

// globalProperties.server = "http://localhost:8088";
// globalProperties.domain = "http://localhost:8089";

app.mount('#app')

