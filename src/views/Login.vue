<template>
  <div>
    <el-container>
      <el-header>
        <img src="../assets/images/logo.png" class="myLogo">
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username" >
              <el-input v-model="ruleForm.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="form-group" style="display: flex;">
                <div>
                  <input type="text" id="code" v-model="ruleForm.code" class="code"  placeholder="请输入您的验证码" />
                </div>
                <div class="login-code" @click="refreshCode">
                  <!--验证码组件-->
                  <s-identify :identifyCode="ruleForm.identifyCode"></s-identify>
                </div>
              </div>
            </el-form-item>
            <el-form-item style="width: 100%;">
              <el-checkbox class="login_remember" v-model="checked" >
                <span style="color: #409EFF">记住我</span>
                <label style="color: #949493">不是自己电脑请勿勾选</label>
              </el-checkbox>
              <el-button type="text" style="float: right; text-decoration: none; color: #50b6ff" @click="beforeTo">找回密码？</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="medium" type="primary"    @click="submitForm('ruleForm')" class="login-code">登录</el-button>
              <el-button size="medium" type="success" plain @click="resetForm('ruleForm')" class="reset-button">重置</el-button>
              <router-link :to="{ path: '/register' }" type="primary">注册</router-link>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import SIdentify  from '../views/Identify'
  export default {
    name: 'Login',
    components: { SIdentify },
    data() {

      return {
        ruleForm: {
          username: '',
          password: '',
          identifyCodes: "1234567890",
          identifyCode: "",
          code:"",//text框输入的验证码
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.code == ""){
              alert("请输入验证码")
              return;
            }
            if(this.ruleForm.identifyCode != this.ruleForm.code){
              this.ruleForm.code = "";
              this.refreshCode();
              alert("请输入正确的验证码");
              return ;
            }
            this.$http.post("http://localhost:8181/user/login",
              {
                username: this.ruleForm.username,
                password: this.ruleForm.password
              })
              .then(res =>{
                  console.log('saa', res)
                if (res.data.code == 100){
                  this.$router.replace('/index')
                }else{
                  alert("用户或密码错误")
                }
                })
                  .catch(function (error) {
                    console.log(error);
                  });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.ruleForm.identifyCode = "";
        this.makeCode(this.ruleForm.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.ruleForm.identifyCode += this.ruleForm.identifyCodes[
            this.randomNum(0, this.ruleForm.identifyCodes.length)
            ];
        }
      },
      beforeTo() {
        if (this.ruleForm.username === '') {
          this.$notify({
            title: '跳转失败',
            message: "输入用户名再去重置密码吧",
            type: 'error'
          });
        }else {
          this.$router.push({
            name: 'ResetPassword',
            query: {
              username: this.ruleForm.username,
            }
          })
        }
      }
    },
    // 页面加载之前执行
    mounted () {
      this.ruleForm.identifyCode = "";
      this.makeCode(this.ruleForm.identifyCodes, 4);
    },

    created() {
      this.refreshCode()
    }
  }
</script>

<style scoped>
  .login_remember {
    margin: 0px;
    text-align: left;
    float: left;

  }
  .myLogo{
    height:80%;
    margin-top: 10px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
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

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .demo-ruleForm{
    max-width: 400px;
    margin: auto;
  }

  /*验证码样式*/
  .code{
    width:124px;
    height:31px;
    border:1px solid rgba(186,186,186,1);
  }
  .login-code{
    margin: 0px;
    text-align: center;
    float: left;
    width: 100px;
  }
  .reset-button{
    text-align: center;
    float: left;
    width: 100px;
  }
</style>
