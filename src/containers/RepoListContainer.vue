<template>
  <div style="width: 80%">
    <el-table
      :data="repoList"
      style="width: 100%"
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
import { get } from '../api';
import _ from 'lodash';

export default {
  data() {
    return {
      repoList: [],
    }
  },
  created() {
    this.requestRepoList();
  },
  methods: {
    requestRepoList() {
      get("https://api.travis-ci.org/repos")
        .then(response => {
          response.json().then(json => {
            const repoData = _.chain(json)
              .get("repositories")
              .map(elem => ({ name: elem.name, branch: elem.default_branch.name, id: elem.id }))
            this.repoList.splice(0, this.repoList.length);
            this.repoList.push(...repoData)
          })
        })
        .catch(_.noop)
    },
    clickRow(row, event, column) {
      console.log(row.id);
    }
  }
} 
</script>
<style scoped>
.RepoList-Table-Row {
  cursor: pointer;
}
</style>