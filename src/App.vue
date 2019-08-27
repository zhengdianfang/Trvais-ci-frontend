<template>
  <el-row
    type="flex"
    align="middle"
    justify="center"
    class="App_Container"
  >
    <router-view></router-view>
  </el-row>
</template>
<style>
html,
body {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.App_Container {
  height: 100%;
}
</style>