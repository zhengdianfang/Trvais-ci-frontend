<template>
  <Chart
    :height="500"
    :width="400"
    :labels="labels"
    :chartData="chartData"
    title="构建总数"
  />
</template>
<script>
import Chart from '../components/BarChart';
import { mapState } from 'vuex';
import _ from 'lodash';

export default {
  computed: mapState({
    labels: state => _.map(state.repoList, elem => elem.name),
    chartData: state => _.map(state.repoList, elem => _.chain(state.buildMap).get(elem.id).size().value()),
  }),
  components: {
    Chart,
  }
}
</script>