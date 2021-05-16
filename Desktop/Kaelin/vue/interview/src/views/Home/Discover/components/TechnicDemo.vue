<template>
  <!-- <div class="technic-demo-container"> -->
  <div class="technic-item">
    <div class="technic-left" @click="toDetails(technic)">
      <h5 class="technic-title" v-html=" technic.title" />
      <div class="technic-info">
        <p class="technic-time">{{ technic.updated_at | formatTime }}</p>
        <p class="technic-read">
          <i class="iconfont iconicon_liulanliang" />
          <span>{{ technic.read }}</span>
        </p>
        <p :class="{'technic-star':true, 'technic-icon':technic.star>=1}">
          <i class="iconfont iconbtn_dianzan_small_nor" />
          <span>{{ technic.star }}</span>
        </p>
      </div>
    </div>
    <div v-if="technic.cover" class="technic-right">
      <img :src="$store.state.BASEURL + technic.cover" alt />
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'TechnicDemo',
  props: ['technic'],
  methods: {
    toDetails(item) {
      // console.log(item);
      this.$router.push({ name: 'ContentDetails', query: { content_type: 'technic', id: item.id } });
    },
  },

};
</script>

<style lang="scss" scoped>
// .technic-demo-container {
.technic-item {
  display: flex;
  justify-content: space-between;
  // margin: 13px 0;
  padding-bottom: 28px;
  .technic-left {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 15px;
    .technic-title {
      font-size: 16px;
      line-height: 23px;
      height: 46px;
      color: #181a39;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; // 作为弹性伸缩盒子模型显示。
      /* autoprefixer: off */ // 这行必须加的，这个就是控制代码被编译不生效的问题的 上off  下on
      -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
      /* autoprefixer: on */
      -webkit-line-clamp: 2; // 显示的行
      flex-direction: column;
      word-break: break-all;
      margin-bottom: 6px;
    }
    .technic-info {
      font-size: 12px;
      display: flex;
      i,
      span {
        margin: 0 3px;
        vertical-align: middle;
      }
      .technic-time {
        flex: 2;
      }
      .technic-read {
        flex: 1;
        text-align: center;
      }
      .technic-star {
        flex: 1;
        text-align: center;
        &.technic-icon {
          color: $orange;
        }
      }
    }
  }
  .technic-right {
    img {
      display: block;
      width: 113px;
      height: 75px;
      border-radius: 8px;
    }
  }
}
// }
</style>
