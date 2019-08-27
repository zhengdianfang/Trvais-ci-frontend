<template>
  <div style="width: 80%">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/repo-list'}">repo-list</el-breadcrumb-item>
      <el-breadcrumb-item>build-list</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      v-loading="loading"
      :data="buildList"
      style="width: 100%;marginTop: 32px"
      height="600"
      row-class-name="RepoList-Table-Row"
      :cell-style="stateCellStyle"
    >
      <el-table-column
        prop="number"
        label="Number"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="State"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="CreateUser"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="duration"
        label="Duration"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="StartTime"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="branch"
        label="Branch"
        width="180"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: true,
    }
  },
  computed: mapState({
    buildList(state) {
      return state.buildMap[this.$route.params.id] || [];
    }
  }),
  created() {
    this.requestBuildListByRepoId(this.$route.params.id)
      .then(() => this.loading = false);
  },
  methods: {
    ...mapActions(['requestBuildListByRepoId']),
    stateCellStyle({ row, columnIndex }) {
      let color = "black";
      if (columnIndex == 1) {
        if (row.state === 'passed') {
          color = "green";
        } else {
          color = "red";
        }
      }
      return { color };
    },
  }
} 
</script>
<style scoped>
.RepoList-Table-Row {
  cursor: pointer;
}
</style>