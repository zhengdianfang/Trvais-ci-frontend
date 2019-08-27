import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import { get } from '../api';

Vue.use(Vuex);

const transalteDuration = (duration) => {
    var h = Math.floor(duration / 3600);
    var m = Math.floor((duration / 60 % 60));
    var s = Math.floor((duration % 60));
    let durationStr = s + "s";
    if (m > 0) {
    durationStr = m + "m" + durationStr;
    }
    if (h > 0) {
    durationStr = h + "H" + durationStr;
    }
    return durationStr;
}

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
        requestRepoList({ commit }) {
            get("https://api.travis-ci.org/repos")
                .then(response => {
                    response.json().then(json => {
                        const repoData = _.chain(json)
                            .get("repositories")
                            .filter(elem => elem.active)
                            .map(elem => ({ name: elem.slug, branch: elem.default_branch.name, id: elem.id }))
                            .value()
                        commit('updateRepoList', repoData);
                    })
                }).catch(_.noop)
        },
        requestBuildListByRepoId({ commit }, id) {
            get(`https://api.travis-ci.org/repo/${id}/builds`)
                .then(response => {
                    response.json().then(json => {
                        const buildList = _.chain(json)
                            .get("builds")
                            .map(elem => ({
                                number: `#${elem.number}`,
                                branch: elem.branch.name,
                                id: elem.id,
                                state: elem.state,
                                duration: transalteDuration(elem.duration),
                                startTime: moment(elem.started_at).format("ll"),
                                createUser: elem.created_by.login
                            }))
                            .value()
                        commit('putBuildList', { id, buildList })
                    })
                })
                .catch(_.noop)
        }
    }
});