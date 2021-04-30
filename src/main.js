import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.use(VueRouter)

const routes = [ 
  {
    path: "/",
    name: "Home",
    component: App,
    meta: { requiresAuth: true }
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: 'http://localhost:8080',
  routes
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default router
