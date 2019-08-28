<template>
  <Chart
    :height="500"
    :width="400"
    :labels="labels"
    :chartData="chartData"
    title="平均恢复时长"
  />
</template>
<script>
import Chart from '../components/BarChart';
import { mapState } from 'vuex';
import moment, { duration } from 'moment';
import _ from 'lodash';

export default {
  computed: mapState({
    labels: state => _.map(state.repoList, elem => elem.name),
    chartData(state) {
      return _.chain(state.repoList)
        .map(repo => {
          return this.assembleChartData(state, repo.id);
        }).value();
    }
  }),
  methods: {
    assembleChartData(state, repoId) {
      const buildList = _.chain(state.buildMap).get(repoId).value()
      let durationSum = 0;
      let count = 0;
      _.each(buildList, (elem, index) => {
        const nextElem = _.get(buildList, index + 1);
        if (nextElem) {
          if (elem.state === 'passed' && nextElem !== 'passed') {
            const duration = moment(elem.endTime).diff(nextElem.endTime, 'minutes');
            durationSum += duration;
            ++count;
          }
        }
      });
      return durationSum / count;
    }
  },
  components: {
    Chart,
  }
}
</script>