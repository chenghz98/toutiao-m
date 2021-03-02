<template>
  <div class="searchSuggestion">
    <van-cell :title="text" icon="search" v-for="(text, index) in suggestions" :key="index"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
export default {

  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler(value) {
        this.loadSearchSuggestions(value)
      },
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取搜索建议失败')
      }
    }
  }
}
</script>
<style scoped lang="less"></style>
