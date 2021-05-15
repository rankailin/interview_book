<template>
  <van-cell class="discover-title-container" value="查看更多" @click="loadMore" is-link>
    <!-- 使用 title 插槽来自定义标题 -->
    <template #title>
      <h4 class="custom-title">{{ title }}</h4>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'DiscoerTitle',
  props: ['title'],
  methods: {
    loadMore() {
      this.$emit('loadMore');
    },
  },
};
</script>

<style lang="scss" scoped>
.discover-title-container {
  // padding: 23px 0;
  height: 60px;
  line-height: 60px;
  ::v-deep.van-cell__right-icon {
    margin-left: 8px;
    line-height: 60px;
  }
  .custom-title {
    font-size: 18px;
    font-weight: 500;
    color: $gray-8;
  }
}
</style>
