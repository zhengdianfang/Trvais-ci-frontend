<template>
  <div
    style="width: 80%"
    v-loading="loading"
  >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/repo-list' }">Repo List</el-breadcrumb-item>
      <el-breadcrumb-item>Chart</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs
      v-model="activeName"
      style="height: 100px; marginTop: 32px"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="构建总数"
        name="build-count"
      ></el-tab-pane>
      <el-tab-pane
        label="构建平均时长"
        name="build-duration"
      ></el-tab-pane>
      <el-tab-pane
        label="构建成功率"
        name="build-passed"
      ></el-tab-pane>
      <el-tab-pane
        label="平均恢复时长"
        name="build-fix"
      ></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';

export default {
  data() {
    return {
      loading: true,
      activeName: 'build-count'
    }
  },
  computed: mapState([
    'repoList',
  ]),
  mounted() {
    switch (_.last(this.$route.path.split('/'))) {
      case "":
        this.activeName = "build-count";
        break;
      case "duration":
        this.activeName = "build-duration";
        break;
      case "passed":
        this.activeName = "build-passed";
        break;
      case "fix":
        this.activeName = "build-fix";
        break;
    }
    Promise.all(_.map(this.repoList, repo => this.requestBuildListByRepoId(repo.id)))
      .then(() => this.loading = false)
  },
  methods: {
    ...mapActions(['requestBuildListByRepoId']),
    handleClick(tab) {
      if (tab.name === "build-count") {
        this.$router.push({ path: `/chart` });
      } else if (tab.name === 'build-duration') {
        this.$router.push({ path: `/chart/duration` });
      } else if (tab.name === 'build-passed') {
        this.$router.push({ path: `/chart/passed` });
      } else if (tab.name === 'build-fix') {
        this.$router.push({ path: `/chart/fix` });
      }


    }
  },
}
</script>