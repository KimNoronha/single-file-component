import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'

import './assets/app.css'

/* ---------- START: Font Awesome ----------*/
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faSync, faTrash, faShoppingCart, faTextHeight, faPoundSign, faSave } from '@fortawesome/free-solid-svg-icons'

/* import specific icons */
import { faUniregistry } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faShoppingCart, faTextHeight, faUniregistry, faTrash, faSave, faSync, faPoundSign)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
/* ---------- END: Font Awesome ----------*/

new Vue({
  render: (h) => h(App)
}).$mount('#app')
