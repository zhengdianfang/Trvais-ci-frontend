<template>
  <el-row
    align="middle"
    justify="center"
  >
    <el-row
      type="flex"
      align="middle"
      justify="center"
    >
      <span class="Login_Title">Welcome ACCA</span>
    </el-row>

    <el-row
      type="flex"
      align="middle"
      justify="center"
    >
      <el-input
        class="Login_Input"
        v-model="token"
        placeholder="请输入Travis-ci token"
      ></el-input>
    </el-row>
    <el-row
      type="flex"
      align="middle"
      justify="center"
    >
      <el-button
        type="primary"
        class="Login_Button"
        @click="clickConfirmButton()"
      >确定</el-button>
    </el-row>
  </el-row>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      token: ''
    }
  },
  methods: {
    clickConfirmButton() {
      if (_.isEmpty(this.token)) {
        alert("请输入Travis-ci token");
      } else {
        this.loginToken = this.token;
      }
    }
  }
}
</script>
<style scoped>
.Login_Container {
  height: 100%;
}
.Login_Title {
  font-size: 90px;
  color: #409eff;
}
.Login_Input {
  margin-top: 16px;
}
.Login_Button {
  margin-top: 16px;
}
</style>
