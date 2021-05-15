<template>
  <div class="discover-container">
    <div class="discover-head">
      <van-nav-bar>
        <template #title>
          <h3>发 现</h3>
        </template>
      </van-nav-bar>
    </div>
    <div class="discover-data-content">
      <!-- 面试技巧 -->
      <div class="technic-content content">
        <DiscoverTitle title="面试技巧" @loadMore="handleMore('technic')" />
        <div class="technic-data">
          <TechnicDemo v-for="technic in technicData" :technic="technic" :key="technic.id" />
        </div>
      </div>
      <!-- 市场数据 -->
      <div class="market-content content">
        <DiscoverTitle
          title="市场数据"
          @loadMore="$router.push({ name: 'ChartData', query: { more_data: 'chart' } })"
        />
        <div class="market-data-info">
          <div class="market-host">
            <span class="market-city">{{ city }}</span>
            <span class="market-position">{{ position }}</span>
          </div>
          <div class="market-data-item" v-for="hot in newMarketData" :key="hot.id">
            <div class="market-year">{{ hot.year.substr(0,5) }}</div>
            <div class="market-data">
              <div
                class="market-inner"
                :style="{'width':Math.round(hot.salary / topSalary * 100) + '%'}"
              >¥{{ hot.salary }}</div>
            </div>
            <div class="market-status">
              <template v-if="hot.percent">
                <i
                  :class="['iconfont',hot.percent < 0 ?'iconicon_xiajiang' :'iconicon_shangsheng']"
                />
                <span>{{ hot.percent }}%</span>
              </template>
            </div>
          </div>
          <div @click="isMore = !isMore" class="market-more">
            <span>{{ isMore ?'收起显示' : '展开更多'}}</span>
            <i :class="['iconfont','iconicon_zhankai', isMore ? 'iccon_shouqi':'']" />
          </div>
        </div>
      </div>
      <!-- 面经分享 -->
      <div class="share-content content">
        <DiscoverTitle title="面经分享" @loadMore="handleMore('share')" />
        <div class="share-data">
          <ShareDemo :shareList="shareData" />
        </div>
      </div>
      <div class="footer">------到底了------</div>
    </div>
  </div>
</template>

<script>
import { artcleAPI } from '@/api';
import DiscoverTitle from './components/DiscoverTitle.vue';
import TechnicDemo from './components/TechnicDemo.vue';
import ShareDemo from './components/ShareDemo.vue';

export default {
  name: 'Discover',
  components: {
    DiscoverTitle,
    TechnicDemo,
    ShareDemo,
  },
  data() {
    return {
      technicData: [],
      city: null,
      position: null,
      marketData: [],
      isMore: false,
      topSalary: 0,
      shareData: [],
    };
  },
  created() {
    this.getDiscoverData();
  },
  computed: {
    newMarketData() {
      let marketArr = {};
      if (this.isMore) {
        marketArr = this.marketData;
      } else {
        marketArr = this.marketData.slice(0, 4);
      }
      return marketArr;
    },
  },
  methods: {
    handleMore(type) {
      this.$router.push({ name: 'DataList', query: { more_data: type } });
    },
    /** 获取发现页面所有首次加载数据 */
    async getDiscoverData() {
      const resTechnic = await artcleAPI.getTechnicData({ start: 0, limit: 6, q: '' });
      this.technicData = resTechnic.list;
      this.getMarketData();
      this.getShareData();
    },
    /** 获取市场数据 */
    async getMarketData() {
      const resMarket = await artcleAPI.getMarketData();
      this.city = resMarket.city;
      this.position = resMarket.position;
      this.topSalary = resMarket.topSalary;
      this.marketData = resMarket.yearSalary.reverse();
    },
    /** 获取面经分享数据 */
    async getShareData() {
      const resShare = await artcleAPI.getShareData({ start: 0, limit: 6, q: '' });
      this.shareData = resShare.list;
      // console.log(resShare);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
