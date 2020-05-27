import Vue from 'vue'
import Router from 'vue-router'
import Steps from '@/views/Steps'

// The meta data for your routes
const meta = require('./meta.json')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Steps',
      component: Steps,
      meta: meta['/']
    },

    // Global redirect for 404
    { path: '*', redirect: '/'}
  ],
})
