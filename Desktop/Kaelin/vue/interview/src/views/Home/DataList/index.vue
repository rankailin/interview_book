<template>
  <div class="data-list-container">
    <div class="data-title">
      <MyNavBar :title="getType" @bark="$router.back()" />
    </div>
    <div class="data-container">
      <!-- 搜索框 -->
      <div class="serach-container">
        <div class="container" @click="$router.push({name:'Search',query:{search_type:dataType}})">
          <i class="iconfont iconicon_search" />
          <span>请输入关键字</span>
        </div>
      </div>
      <!-- 数据加载列表 -->
      <div class="data-list-container">
        <MoreList :moreType="dataType" />
      </div>
    </div>
  </div>
</template>

<script>
import { artcleAPI } from '@/api';
import MoreList from '../Discover/components/MoreList.vue';

export default {
  name: 'DataList',
  components: {
    MoreList,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataType: this.$route.query.more_data,
    };
  },
  computed: {
    getType() {
      let dataTitle = '';
      if (this.dataType === 'technic') {
        dataTitle = '面试技巧';
      } else if (this.dataType === 'share') {
        dataTitle = '面经分享';
      }
      return dataTitle;
    },
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      const resShare = await artcleAPI.getShareData({ start: 0, limit: 6, q: '' });
      this.list = resShare.list;
      this.loading = false;

      this.finished = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.data-list-container {
  position: relative;
  box-sizing: border-box;
  // width: 100vw;
  .data-title {
    position: fixed;
    width: 100%;
    height: 46px;
  }
  .data-container {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    .serach-container {
      position: fixed;
      width: 100%;
      top: 46px;
      .container {
        margin: 9px 15px;
        height: 34px;
        line-height: 34px;
        padding: 7px 0;
        text-align: center;
        background: #f7f4f5;
        font-size: 14px;
        color: #b3b3b3;
        border-radius: 23px;
      }
    }
    .data-list-container {
      position: fixed;
      top: 112px;
      width: 100%;
      height: 100%;
      padding: 0 15px;
      overflow-y: auto;
      padding-bottom: 120px;
    }
  }
}
</style>
