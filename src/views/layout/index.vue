<template>
  <div class="layout-container">
    <!--  //TODO: 子路由入口 -->
    <router-view></router-view>
    <!-- 底部标签导航栏 -->
    <!-- //TODO: router开启路由模式 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{user?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less">
.layout-tabbar{
  i.toutiao{
    font-size: 40px;
  }
  .text{
    font-size: 20px;
  }
}
</style>
