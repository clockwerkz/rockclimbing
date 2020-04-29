import Vue from 'vue';
import Router from 'vue-router';
import AppTest from '@/components/AppTest';
import Login from '@/components/Login';
import Profile from '@/components/Profile';
import SignUp from '@/components/SignUp';
import Landing from '@/components/Landing';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/test',
      name: 'AppTest',
      component: AppTest
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },
    {
      path: '/',
      name: 'Landing',
      component: Landing
    }
  ],
});

router.beforeEach((to, from, next) => {
  let authToken = localStorage.getItem('rc-token');
  if (to.fullPath === '/profile') {
    if (!authToken) {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    if (authToken) {
      next('/profile');
    }
  }
  next();
});

export default router;