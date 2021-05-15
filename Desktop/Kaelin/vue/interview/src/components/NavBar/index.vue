<template>
  <div class="nav-bar-container">
    <van-nav-bar :title="title">
      <template #left>
        <i @click="handleBark" class="iconfont nav-bar-icon iconbtn_nav_back" />
      </template>
      <template v-if="nav_bar_right" #right>
        <a @click="holdMine" class="hold-info">保存</a>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    title: {
      type: String,
      default: '',
    },
    nav_bar_right: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleBark() {
      this.$emit('bark');
    },
    holdMine() {
      this.$emit('hold');
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar-container {
  ::v-deep.van-nav-bar__left {
    padding: 0;
  }
  .nav-bar-icon {
    font-size: 44px;
    color: #181a39;
  }
}
</style>
