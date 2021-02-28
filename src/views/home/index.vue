<template>
  <div class="home-container">
    <!-- 头部导航栏区域 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- Tab标签栏 -->
    <van-tabs v-model="active" swipeable animated class="channel-tabs">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">{{
        item.name
      }}</van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div class="hamburger-btn" slot="nav-right">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
.home-container {
  .page-nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      border: 0;
      color: #fff;
      font-size: 27px;
      background-color: #5babfb;
    }
    .van-icon {
      font-size: 32px !important;
      color: #fff;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs_wrap {
      height: 82px;
    }
    .van-tabs__nav {
      padding: 0 !important;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      color: #777;
      .van-tab__text {
        font-size: 0.4rem !important;
      }
    }
    .van-tab--active {
      color: #333;
      font-size: 28px;
    }
    .van-tabs__line {
      position: absolute;
      bottom: 8px;
      left: 0;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
