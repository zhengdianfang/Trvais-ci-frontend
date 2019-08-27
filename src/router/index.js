import VueRouter from 'vue-router';
import Vue from 'vue';
import LoginContainer from '../containers/LoginContainer';
import RepoListContainer from '../containers/RepoListContainer';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: LoginContainer },
    { path: '/repoList', component: RepoListContainer },
];

export default new VueRouter({
    routes,
  });
  