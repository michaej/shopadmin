<template>
  <div class="login-container">
    <div class="login-bg" id="login-bg"></div>
    <div class="loginAllContent">
      <!-- 左侧背景图 -->
      <div style="width:498px;height:419px;" class="login-bg">
        <img style="width:498px;" src="../../assets/logo_images/login-left.png" alt="">
      </div>
      <!-- 右侧登录界面 -->
      <div class="login-form" @keyup.enter="submitLogin">
        <!-- <a :href="MixinBuyerDomain" class="login-logo" target="_blank">
          <img class="login-logo-img" src="../../assets/logo_images/logo-javashop-rectangle-light.png" alt="javashop">
        </a> -->
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-input">
          <el-form-item prop="username">
            <p style="text-align:center;line-height:20px;font-size:20px;">LOGIN</p>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :placeholder="translateKey('username')" autofocus clearable>
              <svg-icon slot="prefix" class="el-input__icon" icon-class="user"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" :placeholder="translateKey('password')" :minlength="6" :maxlength="20" clearable>
              <svg-icon slot="prefix" class="el-input__icon" icon-class="password"/>
            </el-input>
          </el-form-item>
          <!-- <el-form-item prop="validcode">
            <el-input v-model="loginForm.validcode" :placeholder="translateKey('validcode')" :maxlength="4" clearable>
              <template slot="append">
                <img class="login-validcode-img" :src="validcodeImg" @click="changeValidcode">
              </template>
            </el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="submitLogin">{{translateKey('logIn')}}</el-button>
          </el-form-item>
          <!-- <lang-select class="set-language"/> -->
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import * as API_common from '@/api/common'
  import * as API_login from '@/api/login'
  import 'particles.js'
  import particlesjsConfig from '@/assets/particlesjs-config.json'
  import LangSelect from '@/components/LangSelect'
  import Storage from '@/utils/storage'
  import uuidv1 from 'uuid/v1'

  export default {
    components: { LangSelect },
    name: 'login',
    data() {
      return {
        loading: false,
        loginForm: {
          username: 'superadmin',
          password: '111111',
          validcode: '1111'
        },
        loginRules: {
          as: [
            { required: true, message: this.translateKey('val_username'), trigger: 'blur' }
          ],
          se: [
            { required: true, message: this.translateKey('val_password'), trigger: 'blur' }
          ]
        },
        validcodeImg: '',
        uuid: Storage.getItem('admin_uuid')
      }
    },
    mounted() {
    },
    methods: {
      /** 翻译 */
      translateKey(key) {
        return this.$t('login.' + key)
      },
      // /** 加载背景插件 */
      // loadParticles() {
      //   window.particlesJS('login-bg', particlesjsConfig)
      // },
      /** 更换图片验证码 */
      changeValidcode() {
        this.validcodeImg = API_common.getValidateCodeUrl('LOGIN', this.uuid)
      },
      /** 表单提交 */
      submitLogin() {
            const formdata = this.MixinClone(this.loginForm)
            let params = {ac:formdata.username,se:formdata.password}
            this.loading = true
            console.log(params)
            this.$store.dispatch('loginAction', params).then(() => {
              this.loading = false
              const forward = this.$route.query.forward
              this.$router.push({ path: forward || '/' })
            }).catch(() => {
              this.loading = false
            })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../styles/mixin";
  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/login_images/bg.jpg") no-repeat;
    background-size: cover;
  }
  /deep/ .el-input__prefix{
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  .bg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  .loginAllContent{
    width: 877px;
    height: 419px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    /deep/ .el-input__inner{
      height: 42px;
    }

    /deep/ .el-form-item{
      margin-bottom: 18px;
    }

    /deep/ .el-button--small{
      padding: 14px 15px;
    }

    /deep/ .el-input__inner:focus {
      border-color: #242424;
    }
    /deep/ .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus:focus {
      border-color: #FF4D4D;
    }
  }
  $form_width: 325px;
  .login-form {
    width:379px;
    height: 419px;
    padding: 20px 15px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center
  }
  .login-bg,.login-form{
    float: left;
  }
  .login-logo {
    width: 100%;
    height: 110px;
  }
  .login-logo-img {
    width: 300px;
    height: 100px;
    margin: 0 auto;
    display: block;
  }

  .login-input {
    margin-top: 0;
    .el-button {
      width: 100%;
    }
    /deep/ .el-input-group__append {
      padding: 0;
      margin: 0;
      border: 0;
    }
    .login-validcode-img {
      width: 90px;
      height: 42px;
      display: block;
      cursor: pointer;
    }
  }
</style>
