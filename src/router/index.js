import VueRouter from 'vue-router';
import Vue from 'vue';
import LoginContainer from '../containers/LoginContainer';
import RepoListContainer from '../containers/RepoListContainer';
import BuildListContainer from '../containers/BuildListContainer';
import BuildCountChartContainer from '../containers/BuildCountChartContainer';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: LoginContainer },
    { path: '/repo-list', component: RepoListContainer },
    { path: '/build-list/:id', component: BuildListContainer },
    { path: '/chart', component: BuildCountChartContainer },
];

export default new VueRouter({
    routes,
  });
  