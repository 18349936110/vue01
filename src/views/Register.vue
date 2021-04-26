<template>
  <div>
    <el-container>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
        >
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
  <script>
    import axios from "axios";
    export default {
      name: 'Register',
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          }else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };

        var validateMobilePhone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('负责人手机号不可为空'));
          } else {
            if (value !== '') {
              var reg=/^1[3456789]\d{9}$/;
              if(!reg.test(value)){
                callback(new Error('请输入有效的手机号码'));
              }
            }
            callback();
          }
        };
        return {
          ruleForm: {
            username: '',
            email: '',
            pass: '',
            checkPass: '',
            phone: '',
          },
          rules: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }

            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            phone: [
              { validator: validateMobilePhone, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          alert("111");
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post("http://localhost:8181/user/register",
                {
                  username: this.ruleForm.username,
                  password: this.ruleForm.pass,
                  email: this.ruleForm.email,
                  phone: this.ruleForm.phone,
                })
                .then(res =>{
                  if (res.data.code == 100){
                    alert("注册成功，跳往登录页面");
                    this.$router.push("/");
                  }
                  console.log('saa', res);
                })
                .catch(function (error) {
                  alert("f");
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
        }
      }
    }
  </script>

<style scoped>
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
    max-width: 500px;
    margin: auto;
  }
</style>
