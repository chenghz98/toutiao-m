<template>
  <div class="login-container">
    <!-- 头部导航栏区域 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" v-if="this.$route.query.redirect" @click="$router.back()"></van-icon>
    </van-nav-bar>

    <!-- 登录表单区域 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 5"
          format="ss s"
          @finish="isCountDownShow = false"
        />
        <van-button
          v-else
          slot="button"
          size="small"
          round
          type="primary"
          class="send-sms-btn"
          @click="onSendSms"
          native-type="button"
          >获取验证码</van-button
        >
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',

  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3578]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },

  methods: {
    async onSubmit() {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        duration: 0,
        forbidClick: true
      })

      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功')
        this.$router.push(this.$route.query.redirect || '/')
        console.log(data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败,手机或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },
    async onSendSms() {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .van-form {
    height: 182px;
  }
  .van-nav-bar {
    .van-icon {
      font-size: 40px;
      color: #fff;
    }
  }
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    vertical-align: middle;
    background-color: #ededed;
    color: #666;
    font-size: 22px !important;
    width: 152px;
    height: 46px;
    line-height: 46px;
    border: 0;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .van-button {
      background-color: #6db4fb;
      border-radius: 10px;
      border: 0;
    }
  }
}
</style>
