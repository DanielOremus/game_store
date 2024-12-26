import { createApp } from "vue"
import "./style.css"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"

//Components
import App from "./App.vue"
import router from "./router"
import store from "./store"

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
})

createApp(App).use(vuetify).use(router).use(store).mount("#app")
