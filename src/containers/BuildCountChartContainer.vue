<template>
  <div style="width: 80%">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>build count chart</el-breadcrumb-item>
    </el-breadcrumb>
    <BuildCountChart
      :height="400"
      :width="400"
      style="marginTop: 32px"
    />
  </div>

</template>
<script>
import BuildCountChart from '../components/BuildCountChart';

export default {
  components: {
    BuildCountChart,
  }
}
</script>