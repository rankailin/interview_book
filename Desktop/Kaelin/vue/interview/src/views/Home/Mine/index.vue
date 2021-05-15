<template>
  <div class="mine-container">
    <div class="content" v-if="newUserInfo">
      <div class="mine-info-head">
        <div class="info-head">
          <!-- 昵称信息 -->
          <div class="head">
            <h2>{{newUserInfo.nickname || '麦客'}}</h2>
            <p>{{newUserInfo.intro || '麦熟季节,到乡入户,替人收割麦子'}}</p>
          </div>
          <!-- 头像 -->
          <div class="mine-avatar" @click="$router.push({name:'MineInfo'})">
            <img
              :src="BASEURL+newUserInfo.avatar || 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=6965124,2146386350&fm=26&gp=0.jpg'"
            />
          </div>
        </div>
        <!-- 刷题记录 -->
        <div class="mine-data">
          <div class="data-item">
            <p class="data-num">{{ newUserInfo.submitNum }}</p>
            <p class="data-desc">累计答题</p>
          </div>
          <div class="data-item">
            <p class="data-num">{{newUserInfo.collectQuestions.length}}</p>
            <p class="data-desc">收藏题目</p>
          </div>
          <div class="data-item">
            <p class="data-num">{{ newUserInfo.errorQuestions.length }}</p>
            <p class="data-desc">我的错题</p>
          </div>
          <div class="data-item">
            <p class="data-num">{{ newTime }}%</p>
            <p class="data-desc">正确率</p>
          </div>
        </div>
        <!-- 岗位 -->
        <van-cell class="mine-cell" @click="toEditMine" :value="newUserInfo.position" is-link>
          <template #title>
            <i class="iconfont mine-icon iconicon_mine_gangwei" />
            <span class="custom-title">我的岗位</span>
          </template>
        </van-cell>
      </div>
      <div class="mine-content">
        <div class="share-content">
          <h2>面经数据</h2>
          <div class="share-box">
            <div class="share-item">
              <p class="share-yesterday">
                昨日阅读
                <span class="share-data">+{{newUserInfo.shareData.read.yesterday}}</span>
              </p>
              <p class="share-num">{{ newUserInfo.shareData.read.total }}</p>
              <p class="total-text">阅读总数</p>
            </div>
            <div class="share-item">
              <p class="share-yesterday">
                昨日获赞
                <span class="share-data">+{{ newUserInfo.shareData.star.yesterday }}</span>
              </p>
              <p class="share-num">{{ newUserInfo.shareData.star.total }}</p>
              <p class="total-text">获赞总数</p>
            </div>
            <div class="share-item">
              <p class="share-yesterday">
                昨日新增
                <span class="share-data">+{{ newUserInfo.shareData.comment.yesterday }}</span>
              </p>
              <p class="share-num">{{ newUserInfo.shareData.comment.total }}</p>
              <p class="total-text">评论总数</p>
            </div>
          </div>
        </div>
        <van-cell-group class="mine-data-content">
          <van-cell class="mine-cell item-cell" value="21" is-link>
            <template #title>
              <i class="iconfont mine-icon iconicon_mine_mianjing" />
              <span class="custom-title">我的面经分享</span>
            </template>
          </van-cell>
          <van-cell class="mine-cell item-cell" value="81" is-link>
            <template #title>
              <i class="iconfont mine-icon iconicon_mine_xiaoxi" />
              <span class="custom-title">我的消息</span>
            </template>
          </van-cell>
          <van-cell class="mine-cell item-cell" value="23" is-link>
            <template #title>
              <i class="iconfont mine-icon iconicon_mine_tikushoucang" />
              <span class="custom-title">收藏的题库</span>
            </template>
          </van-cell>
          <van-cell class="mine-cell item-cell" value="61" is-link>
            <template #title>
              <i class="iconfont mine-icon iconicon_mine_qiyeshoucang" />
              <span class="custom-title">收藏的企业</span>
            </template>
          </van-cell>
          <van-cell class="mine-cell item-cell" value="100" is-link>
            <template #title>
              <i class="iconfont mine-icon iconicon_mine_cuoti" />
              <span class="custom-title">我的错题</span>
            </template>
          </van-cell>
          <van-cell class="mine-cell item-cell" value="24" is-link>
            <template #title>
              <i class="iconfont mine-icon iconicon_mine_gangwei" />
              <span class="custom-title">收藏的面试经验</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      BASEURL: process.env.VUE_APP_BASEURL,
      newTime: 0,
    };
  },
  watch: {
    newIsLogin() {
      // eslint-disable-next-line no-mixed-operators
      this.newTime = Math.floor((this.newUserInfo.submitNum - this.newUserInfo.errorNum)
        // eslint-disable-next-line no-mixed-operators
        / this.newUserInfo.submitNum * 100);
    },
  },
  computed: {
    ...mapGetters(['newUserInfo', 'newIsLogin']),
  },
  methods: {
    toEditMine() {
      this.$router.push({ name: 'MineEdit', query: { mine_type: 'position' } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
