<template>
  <Chart
    :height="500"
    :width="400"
    :labels="labels"
    :chartData="chartData"
    title="构建成功率"
  />
</template>
<script>
import Chart from '../components/BarChart';
import { mapState } from 'vuex';
import _ from 'lodash';

export default {
  computed: mapState({
    labels: state => _.map(state.repoList, elem => elem.name),
    chartData: state =>
      _.chain(state.repoList)
        .map(repo => {
          const passedCount = _.chain(state.buildMap)
            .get(repo.id)
            .filter(elem => elem.state === 'passed')
            .size()
            .value()
          return passedCount / _.size(_.get(state.buildMap, repo.id)) * 100;
        }).value(),

  }),
  components: {
    Chart,
  }
}
</script>