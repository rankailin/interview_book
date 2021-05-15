<template>
  <div class="home-container">
    <KeepAlive :include="['Discover']">
      <RouterView />
    </KeepAlive>
    <van-tabbar
      route
      active-color="#ff976a"
      v-if="!$route.meta.unwantedTabber"
      inactive-color="#969799"
    >
      <van-tabbar-item
        v-for="tabbar in tabbarList"
        :name="tabbar.name"
        :key="tabbar.id"
        :to="{name:tabbar.name}"
      >
        <span class="tabbar-text">{{ tabbar.text }}</span>
        <template #icon>
          <i :class="['iconfont', 'tabbar-icon', tabbar.icon ]" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarList: [
        {
          id: 1, name: 'Company', text: '公司', icon: 'iconicon_footbar_gs_nor',
        },
        {
          id: 2, name: 'Question', text: '题库', icon: 'iconicon_footbar_st_nor',
        },
        {
          id: 3, name: 'Discover', text: '发现', icon: 'iconicon_footbar_fx_nor',
        },
        {
          id: 4, name: 'Mine', text: '我的', icon: 'iconicon_footbar_wode_nor',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  .tabbar-icon {
    font-size: 28px;
  }
  .tabbar-text {
    font-size: 10px;
    font-weight: 400;
  }
}
</style>
