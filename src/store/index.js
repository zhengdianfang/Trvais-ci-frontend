import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import VuexPersistence from 'vuex-persist';
import _ from 'lodash';
import { get } from '../api';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        repoList: [],
        buildMap: {}
    },
    mutations: {
        updateRepoList(state, payload) {
            state.repoList = payload;
        },
        putBuildList(state, payload) {
            state.buildMap[payload.id] = payload.buildList;
        }
    },
    actions: {
        async requestRepoList({ commit }) {
            const response = await get("https://api.travis-ci.org/repos");
            const json = await response.json();
            const repoData = _.chain(json)
                .get("repositories")
                .filter(elem => elem.active)
                .map(elem => ({ name: elem.slug, branch: elem.default_branch.name, id: elem.id }))
                .value()
            commit('updateRepoList', repoData);
        },
        async requestBuildListByRepoId({ commit }, id) {
            const response = await get(`https://api.travis-ci.org/repo/${id}/builds`);
            const json = await response.json();
            const buildList = _.chain(json)
                .get("builds")
                .map(elem => ({
                    number: `#${elem.number}`,
                    branch: elem.branch.name,
                    id: elem.id,
                    state: elem.state,
                    duration: elem.duration,
                    startTime: moment(elem.started_at).format("YYYY-MM-DD HH:mm:ss"),
                    endTime: elem.finished_at,
                    createUser: elem.created_by.login
                }))
                .value()
            commit('putBuildList', { id, buildList })
        }
    },
    plugins: [vuexLocal.plugin]
});