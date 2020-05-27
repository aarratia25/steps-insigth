import Vue from 'vue'
import App from '@/App'
import router from '@/router'

Vue.config.productionTip = false

// Global SASS Own Styles
import '@/styles/main.scss'

// Vuetify Material
import Vuetify from 'vuetify';

Vue.use(Vuetify)

// Axios
import axios from 'axios'

import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

// API Config
import ApiConfig from '@/config'

Vue.use(ApiConfig);

new Vue({
  router, 
  vuetify : new Vuetify(),
  render: h => h(App)
}).$mount('#app')
