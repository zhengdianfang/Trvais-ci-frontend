<template>
  <div style="width: 80%">
    <el-row
      type="flex"
      align="middle"
      justify="space-between"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>repo-list</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        type="primary"
        @click="navigateToChart"
      >统计</el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :data="repoList"
      style="width: 100%;marginTop: 32px"
      height="600"
      @row-click="clickRow"
      row-class-name="RepoList-Table-Row"
    >
      <el-table-column
        prop="name"
        label="Name"
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
  computed: mapState(['repoList']),
  created() {
    this.requestRepoList().then(() => this.loading = false);
  },
  methods: {
    ...mapActions(['requestRepoList']),
    clickRow(row) {
      this.$router.push({ path: `/build-list/${row.id}` });
    },
    navigateToChart() {
      this.$router.push({ path: `/chart` });
    }
  }
} 
</script>
<style scoped>
.RepoList-Table-Row {
  cursor: pointer;
}
</style>