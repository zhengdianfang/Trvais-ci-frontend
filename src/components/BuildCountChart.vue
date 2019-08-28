<script>
import { Bar } from 'vue-chartjs';
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';

export default {
  extends: Bar,
  computed: mapState([
    'repoList',
    'buildMap'
  ]),
  methods: {
    ...mapActions(['requestBuildListByRepoId']),
    renderBuildCountChart() {
      this.renderChart({
        labels: _.map(this.repoList, elem => elem.name),
        datasets: [
          {
            label: 'Build Count',
            backgroundColor: '#409eff',
            data: _.map(this.repoList, repo => _.size(this.buildMap[repo.id]))
          }
        ],
      }, { maintainAspectRatio: false })
    }
  },
  mounted() {
    Promise.all(_.map(this.repoList, repo => this.requestBuildListByRepoId(repo.id)))
      .then(() => this.renderBuildCountChart())
  }

}
</script>