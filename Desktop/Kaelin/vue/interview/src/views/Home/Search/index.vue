<template>
  <div class="search-container">
    <div class="search-title">
      <MyNavBar :title="searchType" @bark="$router.back()" />
      <!-- 搜索框 -->
      <div class="search-demo">
        <van-search
          v-model="searchVal"
          shape="round"
           show-action
          @search="seachData(searchVal)"
          placeholder="请输入搜索关键词"
        />
      </div>
    </div>
    <div class="search-content-box">
      <!-- 搜索记录 -->
      <div class="search-record" v-if="!searchVal">
        <!-- 大家都在搜 -->
        <div class="search search-hot" >
          <h3>大家都在搜</h3>
          <ul class="search-text">
            <li v-for="item in searchRecord" :key="item" @click="seachData(item)">{{ item }}</li>
          </ul>
        </div>
        <!-- 搜索记录 -->
        <div class="search search-history">
          <div class="history">
            <h3>历史搜索</h3>
            <span class="clear" @click="historyClear">清空</span>
          </div>
          <ul class="search-text">
            <li v-for="item in historyRecord" :key="item" @click="seachData(item)">{{ item }}</li>
          </ul>
        </div>
      </div>
      <!-- 展示搜索数据 -->
      <div class="search-data-list" v-if="searchVal" >
        <MoreList :newQ="searchVal" :moreType="searchKind" />
      </div>
    </div>
  </div>
</template>

<script>
import { artcleAPI } from '@/api';
import { MKToken } from '@/utils';
import MoreList from '../Discover/components/MoreList.vue';

export default {
  name: 'Search',
  components: {
    MoreList,
  },
  data() {
    return {
      searchVal: '',
      searchRecord: [],
      historyRecord: new Array(5),
    };
  },
  created() {
    this.takeHotSearch();
    this.historyRecord = JSON.parse(MKToken.getMKToken('HISTORY')) || [];
  },
  computed: {
    searchKind() {
      return this.$route.query.search_type;
    },
    searchType() {
      let type = null;
      if (this.searchKind === 'technic') {
        type = '搜索面试技巧';
      } else if (this.searchKind === 'share') {
        type = '搜索面经分享';
      }
      return type;
    },
  },
  methods: {
    historyClear() {
      console.log('aa');
      this.$dialog.confirm({
        title: '温馨提醒',
        message: '确定要清除历史记录吗',
      })
        .then(() => {
          MKToken.removeMKToken('HISTORY');
          this.historyRecord = [];
        })
        .catch(() => {
          // on cancel
        });
    },
    seachData(val) {
      if (val.trim() === '') return;
      this.searchVal = val;
      this.historyRecord.unshift(this.searchVal);
      this.historyRecord = [...new Set(this.historyRecord)];
      this.historyRecord.splice(5);
      console.log(this.historyRecord);
      MKToken.setMKToken('HISTORY', JSON.stringify(this.historyRecord));
    },
    /** 接受数据啦 */
    takeHotSearch() {
      if (this.searchKind === 'technic') {
        this.getHotSearch('technicTopSearch');
      } else if (this.searchKind === 'share') {
        this.getHotSearch('shareTopSearch');
      }
    },
    /** 获取面经/面试技巧热搜数据 */
    async getHotSearch(searchText) {
      try {
        this.searchRecord = await artcleAPI.getHotSearch(searchText);
      } catch (err) {
        this.$toast.fail(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
