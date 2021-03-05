<template>
  <div class="searchSuggestion">
    <van-cell
      :title="text"
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search',text)"
    >
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需导入
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当 searchText 发生改变的时候就会调用 handler 函数
      // 注意：handler 函数名称是固定的
      // handler (value) {
      //   console.log(value)
      // },

      // debounce 函数
      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function(value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取搜索建议失败')
      }
    },
    highlight(text) {
      /**
     * 处理高亮文本
     * 思路：
     * 1. 想要在一个字符串中，将固定的字符特殊显示（改变颜色）
     * 2. 那么就需要在这个字符串中，找出该字符，然后为该字符设置单独的样式（span.active）
     * 拆解：
     *     1. 找出字符
     *     2. 替换字符
     *     3. 设置单独的样式比较容易（替换字符），难点在于找出字符
     * 如何找出字符：
     * 1. 那么《处理高亮文本》的问题，就变成，《如何在字符串中找出固定的字符》
     * 2. 在字符串中找出固定字符，大家首先想到的就应该是使用 -》 正则表达式
     * 3. 简单使用正则（text.replace(/匹配的内容/gi, highlightStr)） , 无法插入响应式数据
     * 4. 所以我们使用了 RegExp 对象。RegExp 构造函数创建了一个正则表达式对象，用于将文本与一个模式匹配。MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp
     * 5. 通过 RegExp 来完成响应式数据的正则匹配
     */
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      // text.replace(/匹配的内容/gi, highlightStr)
      return text.replace(reg, highlightStr)
    }
  }
}
</script>
<style scoped lang="less">
.searchSuggestion{
  /deep/.active{
    color: #3269fa !important;
  }
}
</style>
