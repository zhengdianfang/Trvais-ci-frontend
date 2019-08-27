import VueRouter from 'vue-router';
import Vue from 'vue';
import LoginContainer from '../containers/LoginContainer';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: LoginContainer },
];

export default new VueRouter({
    routes,
  });
  