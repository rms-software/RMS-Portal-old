import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/rms/dashboard',
    name: 'Dashboard',
    component: () => import('../views/pages/Dashboard.vue')
  },
  {
    path: '/rms/profile',
    name: 'Profile',
    component: () => import('../views/pages/Profile.vue')
  },
  {
    path: '/rms/employees',
    name: 'Employees',
    component: () => import('../views/pages/Employees.vue')
  },
  {
    path: '/rms/products',
    name: 'Products',
    component: () => import('../views/pages/Products.vue')
  },
  {
    path: '/rms/products/:productId',
    name: 'Product',
    component: () => import('../views/pages/products/Product.vue')
  },
  {
    path: '/rms/content',
    name: 'Content',
    component: () => import('../views/pages/Content.vue')
  },
  {
    path: '/rms/settings',
    name: 'Settings',
    component: () => import('../views/pages/Settings.vue')
  },
  {
    path: '/rms/orders',
    name: 'Orders',
    component: () => import('../views/pages/Orders.vue')
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash'
});

router.beforeEach((to, from, next) => {
  document.title = to.name + ' - RMS';
  next();
});

export default router;
