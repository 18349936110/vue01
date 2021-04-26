<template>
  <div class="index">
    <el-container  direction="vertical">
      <el-header>
        <img src="../assets/images/logo.png" class="myLogo">
        <span>员工管理平台</span>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped>
  .myLogo{
    height:70%;
    margin-top: 10px;
  }

  .el-container{
    height: 100%;
  }

  .el-header{
    background-color: #B3C0D1;
    display: flex;
    justify-content: space-between;
    padding-left: 1%;
    color: #fff;
    font-size: 20px;


  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

</style>
