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
        label="构建号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="执行者"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="duration"
        label="时长"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="branch"
        label="仓库分支"
        width="180"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash';
import { transalteDuration } from '../utils';

export default {
  data() {
    return {
      loading: true,
    }
  },
  computed: mapState({
    buildList(state) {
      return _.map(state.buildMap[this.$route.params.id], elem => ({
        ...elem,
        duration: transalteDuration(elem.duration)
      })) || [];
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