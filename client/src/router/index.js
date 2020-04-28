import Vue from 'vue';
import Router from 'vue-router';
import AppTest from '@/components/AppTest';
import Login from '@/components/Login';
import Profile from '@/components/Profile';
import SignUp from '@/components/SignUp';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
    }
  ],
});

router.beforeEach((to, from, next) => {
  let authToken = localStorage.getItem('rc-token');
  if (to.fullPath === '/') {
    if (!authToken) {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    if (authToken) {
      next('/');
    }
  }
  next();
});

export default router;