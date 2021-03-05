<template>
  <div class="searchHistory">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!--//TODO 用$emit自定义方法通知父组件 将 searchHistories 清空-->
        <span class="deleteAll" @click="$emit('delete-search-histories',[])">全部删除</span>
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon
        name="delete"
        @click="deleteShow"
        v-else
      ></van-icon>
    </van-cell>
    <van-cell
      :title="text"
      v-for="(text, index) in searchHistories"
      :key="index"
      @click="onSearchTextClick(text,index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {

    // prop传递的参数,在子组件中,如果是简单数据类型,如number,string是绝对不能修改的,即便修改了也不会传导到父组件中
    // 如果是引用型数据,如Array[],object{},
    // 可以修改值,如 arr.push(1) , .splice()...
    // 但是不可以赋值 如 arr[]=1
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteShow() {
      this.isDeleteShow = true
    },
    onSearchTextClick(text, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('search', text)
      }
    }
  }
}
</script>
<style scoped lang="less">
.deleteAll{
  padding-right: 10px;
}
</style>
