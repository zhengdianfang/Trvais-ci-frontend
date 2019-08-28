<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: {
    title: {
      type: String,
      default: () => "" 
    },
    labels: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array,
      default: () => []
    },
  },
  mounted() {
    this.renderBuildCountChart();
  },
  updated() {
    this.renderBuildCountChart();
  },
  methods: {
    renderBuildCountChart() {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            backgroundColor: '#409eff',
            data: this.chartData
          }
        ],
      }, { maintainAspectRatio: false })
    }
  },

}
</script>