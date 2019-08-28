import VueRouter from 'vue-router';
import Vue from 'vue';
import LoginContainer from '../containers/LoginContainer';
import RepoListContainer from '../containers/RepoListContainer';
import BuildListContainer from '../containers/BuildListContainer';
import ChartContainer from '../containers/ChartContainer';
import BuildCountChartContainer from '../containers/BuildCountChartContainer';
import BuildDurationChartContainer from '../containers/BuildDurationChartContainer';
import BuildSuccessChartContainer from '../containers/BuildSuccessChartContainer';
import BuildFailedFixDurationChartContainer from '../containers/BuildFailedFixDurationChartContainer';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: LoginContainer },
    { path: '/repo-list', component: RepoListContainer },
    { path: '/build-list/:id', component: BuildListContainer },
    { 
        path: '/chart',
        component: ChartContainer,
        children: [
            { path: '', component: BuildCountChartContainer },
            { path: 'duration', component: BuildDurationChartContainer },
            { path: 'passed', component: BuildSuccessChartContainer },
            { path: 'fix', component: BuildFailedFixDurationChartContainer },

        ]
    },
];

export default new VueRouter({
    routes,
  });
  