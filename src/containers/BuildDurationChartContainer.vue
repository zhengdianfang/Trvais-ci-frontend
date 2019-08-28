<template>
  <Chart
    :height="500"
    :width="400"
    :labels="labels"
    :chartData="chartData"
    title="构建平均时长"
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
          const totalDuration = _.chain(state.buildMap)
            .get(repo.id)
            .reduce((sum, elem) => sum + elem.duration, 0)
            .value()
          return totalDuration / _.size(_.get(state.buildMap, repo.id));
        }).value(),

  }),
  components: {
    Chart,
  }
}
</script>