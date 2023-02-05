import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';


import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

let app = createApp(App)
    .use(router)
    .use(vuetify)

let globalProperties = app.config.globalProperties;
globalProperties.server = "http://localhost:8088";
globalProperties.domain = "http://localhost:8089";

app.mount('#app')

