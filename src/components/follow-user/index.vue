<template>
  <van-button
    round
    size="small"
    v-if="is_followed"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
    v-else
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  components: {},
  model: {
    prop: 'is_followed',
    event: 'update-follow'
  },
  props: {
    userId: {
      type: [Number, String, Object],
      required: true
    },
    is_followed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onFollow() {
      this.loading = true
      try {
        if (this.is_followed) {
          // 已关注,点击发送请求 取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注, 发送请求 关注
          await addFollow(this.userId)
        }
        this.$emit('update-follow', !this.is_followed)
      } catch (error) {
        let message = '操作失败，请重试！'
        // 例如用户关注自己会报错
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less"></style>
