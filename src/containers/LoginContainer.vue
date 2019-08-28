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
      <span class="Login_Title">Welcome ACA</span>
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
      justify="end"
      align="middle"
      style="marginTop: 16px"
    >
      <span class="Login-Token-Tip"><a
          href="https://developer.travis-ci.com/authentication"
          target="blank"
        >如何获取token</a></span>
      <i
        class="el-icon-question"
        style="color: #409eff"
      ></i>
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
        localStorage.setItem("travisToken", this.token);
        this.$router.push({ path: '/repo-list' });
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
.Login-Token-Tip {
  font-size: 12px;
  color: #409eff;
  margin-right: 8px;
  margin-top: 16px;
}
</style>
