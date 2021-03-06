<template>
  <van-button
  :icon="is_liked===1?'good-job':'good-job-o'"
  :class="{Liked:is_liked}"
  @click="onLiked"
  ></van-button>
</template>

<script>
import { addLiked, deleteLiked } from '@/api/article'
export default {
  name: 'LikeArticle',
  components: {},
  model: {
    prop: 'is_liked',
    event: 'update-like'
  },
  props: {
    is_liked: {
      type: [Number],
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLiked() {
      try {
        let status = -1
        if (this.is_liked === 1) {
          await deleteLiked(this.artId)
        } else {
          await addLiked(this.artId)
          status = 1
        }
        this.$emit('update-like', status)
        // 更新视图
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('点赞失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
.Liked{
  /deep/.van-icon{
    color: #ea0000;
  }
}
</style>
