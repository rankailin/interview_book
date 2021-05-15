/* eslint-disable no-underscore-dangle */
<template>
  <div class="login-container">
    <MyNavBar @bark="$router.push({ name: 'Discover' })" />
    <div class="login-from-box">
      <h2 class="login-title">您好,请登录</h2>
      <van-form class="login-form" ref="loginFormRef" @submit="submitLogin">
        <van-field
          v-model="loginInfo.mobile"
          :rules="rules.mobile"
          name="loginMobile"
          class="login-input"
          placeholder="请输入手机号"
        >
          <template #left-icon>
            <i class="iconfont login-icon iconbianzu1" />
          </template>
        </van-field>
        <van-field
          v-model="loginInfo.code"
          :rules="rules.code"
          name="loginCode"
          class="login-input"
          placeholder="请输入验证码"
        >
          <template #left-icon>
            <i class="iconfont login-icon iconyanzhengma" />
          </template>
          <template #button>
            <a v-if="time === 6" href="#" @click="getCode" class="login-link">发送验证码</a>
            <span v-else>{{time}}后重试</span>
          </template>
        </van-field>
        <p class="deal">
          登录及同意
          <a href="#" class="user-link login-link">《用户使用协议》</a>
          和
          <a href="#" class="user-link login-link">《隐私协议》</a>
        </p>
        <div style="margin: 16px;">
          <van-button
            round
            type="danger"
            size="large"
            color="linear-gradient(to right, #ed6a0c, #ff976a)"
            native-type="submit"
          >登 录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api';
import { mapMutations } from 'vuex';
import { MKToken } from '../../utils';

export default {
  name: 'Login',
  data() {
    return {
      timer: null,
      time: 6,
      active: false,
      loginInfo: {
        mobile: '16666661111',
        code: '',
      },
      rules: {
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机号不合法' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{4}$/, message: '验证码为4位数字' }],
      },
    };
  },
  methods: {
    ...mapMutations(['SET_USER_INFO', 'SET_IS_LOGIN']),
    /** 用户登录  */
    async submitLogin() {
      this.$toast({
        type: 'loading',
        duration: 0,
      });
      try {
        const login = await loginAPI.userLogin(this.loginInfo);
        // console.log(login);
        this.SET_USER_INFO(login.user);
        this.SET_IS_LOGIN(true);
        MKToken.setMKToken('MKTOKEN', login.jwt);
        // eslint-disable-next-line no-underscore-dangle
        const _redirect = this.$route.query.redirect;
        console.log(_redirect);
        if (_redirect) {
          this.$router.push(_redirect);
        } else {
          this.$router.push({ name: 'Mine' });
        }
      } catch (err) {
        this.$toast.fail(err.message);
      }
      this.$toast.clear();
    },
    /** 获取验证码 */
    getCode() {
      this.$refs.loginFormRef.validate('loginMobile').then(async () => {
        // console.log('...');
        this.$toast({
          type: 'loading',
        });
        if (this.active) return;
        this.active = true;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.time -= 1;
          if (this.time < 1) {
            this.time = 6;
            this.active = false;
            clearInterval(this.timer);
          }
        }, 1000);
        try {
          const code = await loginAPI.getCode(this.loginInfo.mobile);
          this.$toast(code);
          this.loginInfo.code = code;
        } catch (err) {
          this.$toast.fail(err);
        }
      }, (err) => this.$toast.fail(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  color: $orange-dark;
  .login-from-box {
    margin-top: 50px;
    padding: 0 15px;
    .login-title {
      letter-spacing: 3px;
      font-size: 18px;
      color: $black;
      margin-bottom: 63px;
    }
    .login-from {
    }
    .login-input {
      margin: 23px 0;
    }
    .deal {
      margin: 15px 0;
    }
    .deal,
    .user-link {
      font-size: $font-size-sm;
    }
  }
}
.login-icon {
  margin-right: 21px;
}
.login-link {
  font-size: $font-size-lg;
  color: $blue;
}
</style>
