import { createApp } from "vue"
import "./style.css"
import "video.js/dist/video-js.css"
// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { VNumberInput } from "vuetify/labs/VNumberInput"
import { VDateInput } from "vuetify/labs/VDateInput"
import { VFileUpload } from "vuetify/labs/VFileUpload"

import "@mdi/font/css/materialdesignicons.css"

//Components
import App from "./App.vue"
import router from "./router"
import store from "./store"

const vuetify = createVuetify({
  components: {
    ...components,
    VNumberInput,
    VDateInput,
    VFileUpload,
  },
  directives,

  icons: {
    defaultSet: "mdi",
  },
})

store.dispatch("auth/checkAuthStatus", null, { root: true })

createApp(App).use(vuetify).use(router).use(store).mount("#app")
