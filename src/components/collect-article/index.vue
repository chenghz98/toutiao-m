<template>
  <van-button
    :icon="is_collected ? 'star' : 'star-o'"
    :class="{
      collected: is_collected
    }"
    @click="onCollected"
      :loading="loading"
  ></van-button>
</template>

<script>
import { addCollected, deleteCollected } from '@/api/article'
export default {

  name: 'CollectArticle',
  components: {},
  model: {
    prop: 'is_collected',
    events: 'update-collected'
  },
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, String, Object],
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
    async onCollected() {
      // this.loading = true
      try {
        if (this.is_collected) {
          await deleteCollected(this.artId)
        } else {
          await addCollected(this.artId)
        }
        this.$emit('update-collected', !this.is_collected)
        // 注意这里的 this.value 不会马上改变，所以进行了取反
        this.$toast.success(!this.is_collected ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('收藏失败')
      }
      // this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
.collected{
  .van-icon{
    color: #ffa500 !important;
  }
}
</style>
