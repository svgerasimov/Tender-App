import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Analyst from '@/components/Roles/Analyst/Analyst'
import CallCenter from '@/components/Roles/CallCenter'
import Head from '@/components/Roles/Head'
import Manager from '@/components/Roles/Manager'
import Operator from '@/components/Roles/Operator/Operator'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/analyst',
      name: 'Analyst',
      component: Analyst
    },
    {
      path: '/call-center-operator',
      name: 'CallCenter',
      component: CallCenter
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/operator',
      name: 'Operator',
      component: Operator
    },
    {
      path: '/head',
      name: 'Head',
      component: Head
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    }
  ],
  mode: 'history'
})
