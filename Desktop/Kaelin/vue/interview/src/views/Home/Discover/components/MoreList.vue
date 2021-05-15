<template>
  <div class="my-van-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <template v-if="moreType === 'technic'">
        <TechnicDemo :technic="technicitem" v-for="technicitem in dataList" :key="technicitem.id" />
      </template>

      <ShareDemo v-else-if="moreType === 'share'" :shareList="dataList" />
    </van-list>
  </div>
</template>

<script>
import vandata from '@/mixins/my_van_list';
import ShareDemo from './ShareDemo.vue';
import TechnicDemo from './TechnicDemo.vue';
// eslint-disable-next-line import/order
import { artcleAPI } from '@/api';

export default {
  name: 'MyVanList',
  mixins: [vandata],
  props: {
    moreType: {
      type: String,
      required: true,
    },
  },
  components: {
    ShareDemo,
    TechnicDemo,
  },
  async created() {
    // this.loadData();
  },
  methods: {
    // eslint-disable-next-line consistent-return
    async loadData(loadInfo) {
      let resLoadData = null;
      try {
        if (this.moreType === 'technic') {
          resLoadData = await artcleAPI.getTechnicData(loadInfo);
        } else if (this.moreType === 'share') {
          resLoadData = await artcleAPI.getShareData(loadInfo);
        }
        console.log(resLoadData);
        return resLoadData;
      } catch (err) {
        this.$toast({
          type: 'fail',
          message: err,
        });
      }
    },
  },
};
</script>

<style>
</style>
