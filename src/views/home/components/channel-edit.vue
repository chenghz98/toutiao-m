<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        class="editbtn"
        @click="isEdit = !isEdit"
        >{{isEdit?'完成':'编辑'}}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in myChannels"
        :key="index"
      >
        <span slot="text" class="text" :class="{ active: active === index }">{{
          channel.name
        }}</span>
        <van-icon name="clear" slot="icon" v-show="isEdit&&!fixedChannels.includes(channel.id)"></van-icon
      ></van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannels: [0]
    }
  },
  computed: {
    /* recommendChannels() {
      const channels = []
      this.allChannels.forEach(channel => {
        // find 找到符合条件的第一个就返回，后面就不再查找！
        const ret = this.myChannels.find(
          myChannel => myChannel.id === channel.id
        )
        // 我的频道没有找到 channel，则收集
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    } */
    recommendChannels() {
      return this.allChannels.filter(channel => {
        const mychannel = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        return !mychannel
      })
    }
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    },
    onAddChannel(channel) {
      this.myChannels.push(channel)
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  .editbtn {
    width: 100px;
  }
  .channel-item {
    height: 86px;
    /deep/ .van-grid-item__content {
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
      }
      .active {
        color: red;
      }
    }
    /deep/.van-icon-clear {
      color: #ccc;
    }
  }
}
/deep/.van-icon-clear {
  position: absolute;
  top: -16px;
  right: -16px;
  font-size: 32px;
  z-index: 2;
}
/deep/.van-grid-item__text {
  margin: 0;
}
/deep/ .recommend-grid {
  .van-grid-item__content {
    flex-direction: row;
    color: #222;
    .van-icon {
      font-size: 24px;
      margin-right: 6px;
    }

    .van-grid-item__text,
    .text-wrap {
      font-size: 28px;
      margin-top: 0;
    }
  }
}
</style>
