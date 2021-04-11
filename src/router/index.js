import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const AuthRouter = [{
  path: '/',
  component: () => import('../AuthView.vue'),
  children: [{
    path: '/user/login',
    component: () => import('../views/Auth/Login.vue'),
    meta: {
      title: 'Login'
    }
  }, {
    path: '/user/register',
    component: () => import('../views/Auth/Register.vue'),
    meta: {
      title: 'Register'
    }
  }],
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...AuthRouter
  ],
});

export default router;
