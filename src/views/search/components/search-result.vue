<template>
  <div class="searchResult">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error='error'
      error-text="加载失败,请请稍后重试"
    >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perpage,
          q: this.searchText
        })
        const { results } = data.data
        // console.log(result)

        // 将获取的数据导入到声明好的list中,
        // 因为list是数组,所以应用push导入数据而不能用赋值
        this.list.push(...results)
        // 关闭'加载中...'的loading,展示数据
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        // 加载失败
        this.error = true

        // 加载失败也要关闭loading
        this.loading = false
      }
    }
  }
}
</script>
<style scoped lang="less"></style>
