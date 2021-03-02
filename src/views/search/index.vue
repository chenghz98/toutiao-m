<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"></search-result>
    <!-- 搜索建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText"></search-suggestion>
    <!-- 搜索历史 -->
    <search-history v-else></search-history>

  </div>
</template>

<script>

import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult

  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.$toast(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
