<template>
  <div class="share-demo-container" v-if="shareList">
    <div
      class="share-data-item"
      v-for="share in shareList"
      :key="share.id"
      @click=" toDetails(share)"
    >
      <h5 class="share-title" v-html="share.title"></h5>
      <div class="share-desc">{{ share.content }}</div>
      <div class="share-other">
        <p class="author-info">
          <img :src="$store.state.BASEURL + share.author.avatar" alt />
          <span class="nickname">{{ share.author.nickname }}</span>
        </p>
        <p>{{ share.updated_at | formatTime }}</p>
        <p class="comment">
          <i class="iconfont iconicon_pinglunliang" />
          <span>{{ share.article_comments }}</span>
        </p>
        <p class="star">
          <i class="iconfont iconbtn_dianzan_small_nor" />
          <span>{{ share.star }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareDemo',
  props: ['shareList'],
  methods: {
    toDetails(item) {
      // console.log(item);
      this.$router.push({ name: 'ContentDetails', query: { content_type: 'share', id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.share-demo-container {
  .share-data-item {
    margin-bottom: 16px;
    padding-bottom: 28px;
    border-bottom: 1px solid $gray-3;
    .share-title {
      font-size: 16px;
      color: #181a39;
    }
    .share-desc {
      margin: 12px 0 14px 0;
      font-size: 13px;
      line-height: 23px;
      color: #545671;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; // 作为弹性伸缩盒子模型显示。
      /* autoprefixer: off */ // 这行必须加的，这个就是控制代码被编译不生效的问题的 上off  下on
      -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
      /* autoprefixer: on */
      -webkit-line-clamp: 2; // 显示的行
      flex-direction: column;
      word-break: break-all;
    }
    .share-other {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      .author-info {
        img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      p {
        color: #b4b4bd;
        span,
        i,
        img {
          margin-right: 8px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
