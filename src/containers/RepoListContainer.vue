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
    <el-row style="marginTop: 32px">
	<el-input
	    placeholder="请输入内容"
	    prefix-icon="el-icon-search"
	    v-model="searchText">
	</el-input>
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
        label="代码库名称"
      >
      </el-table-column>
      <el-table-column
        prop="branch"
        label="分支"
        width="180"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      loading: true,
      searchText: '',
    }
  },
  computed: mapState({
	  repoList(state) {
	    return _.filter(state.repoList, elem => elem.name.startsWith(this.searchText)); 
	  }
  }),
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
