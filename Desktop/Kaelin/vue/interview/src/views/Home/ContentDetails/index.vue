<template>
  <div class="content-details-container">
    <!-- 头部 -->
    <div class="content-head-box">
      <MyNavBar @bark="$router.back()" />
    </div>
    <div class="content-box" v-if="content">
      <!-- 内容区域 -->
      <div class="content" ref="imageWrapper">
        <h3>{{ content.title }}</h3>
        <div class="author" v-if="content.author">
          <img :src="$store.state.BASEURL + content.author.avatar" alt />
          <p class="author-info">
            <span class="name">{{ content.author.nickname }}</span>
            <span class="time">{{ content.created_at | formatFixedTime }}</span>
          </p>
        </div>
        <div class="content-text-box">
          <div class="content-text" v-html="content.content" />
        </div>
      </div>
      <!-- 评论区域 -->
      <div class="comment-container" v-if="contentType.type === 'share'">
        <h3>
          评论
          <sup>{{ total }}</sup>
        </h3>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <template v-for="(comment, index) in commentList">
            <div class="comment-info" :key="index">
              <div class="comment-head">
                <img :src="$store.state.BASEURL + comment.author.avatar" alt />
                <p>
                  <span class="comment-name">{{ comment.author.nickname }}</span>
                  <span class="comment-time">{{ comment.created_at | formatTime }}</span>
                </p>
              </div>
              <div class="comment-text" @click="openComment(comment)">{{ comment.content }}</div>
              <ul class="comment-children" v-if="comment.children_comments.length > 0">
                <li class="comment-item" v-for="item in comment.children_comments" :key="item.id">
                  <span>{{ item.author }}:</span>
                  <span>{{ item.content }}</span>
                </li>
              </ul>
            </div>
          </template>
        </van-list>
      </div>
    </div>
    <!-- 写评论区域 -->
    <div class="write-comment" v-if="content">
      <div class="comment-demo" @click="openComment">我来补充两句</div>
      <div class="comment-sign">
        <p
          :class="{'lit': newIsLogin && newUserInfo.collectArticles.includes(+contentType.id)}"
          @click="collect"
        >
          <i class="iconfont iconbtn_shoucang_nor" />
          <span>{{ content.collect }}</span>
        </p>
        <p
          :class="{'lit': newIsLogin && newUserInfo.starArticles.includes(+contentType.id)}"
          @click="handlestar"
        >
          <i class="iconfont iconbtn_dianzan_small_nor actived" />
          <span>{{ content.star }}</span>
        </p>
        <p @click="openSharePic">
          <i class="iconfont iconbtn_share" />
          <span>{{ content.share }}</span>
        </p>
      </div>
    </div>
    <div class="comment-popup">
      <van-popup class="my-popup" v-model="showComment" position="bottom">
        <textarea v-model="commentText" class="comment-textarea" :placeholder="myPlaceholder" />
        <p :class="{'submit-btn':commentText!== ''}" @click="submitComment">发表</p>
      </van-popup>
    </div>
    <MyOverlay :showSharePic="showSharePic" :imgUrl="imgUrl" @close="close" />
  </div>
</template>

<script>
import { artcleAPI } from '@/api';
import { mapGetters } from 'vuex';
import html2canvas from 'html2canvas';
import MyOverlay from '@/components/MyOverlay/index.vue';

export default {
  name: 'ContentDetails',
  components: {
    MyOverlay,
  },
  data() {
    return {
      // 显示遮罩层
      showSharePic: false,
      // 评论的内容
      commentText: '',
      // 是否打开评论输入框
      showComment: false,
      // 内容详情信息
      content: null,
      // 评论数据
      commentList: [],
      // 加载评论数据
      loading: false,
      // 是否已完成加载数据
      finished: false,
      // 加载的初识值
      start: -3,
      // 每一次加载的条数
      limit: 3,
      // 总的数据条数
      total: -1,
      // 占位
      myPlaceholder: '',
      // 回复评论时的ID
      parentId: null,
      path: window.location.href.split('#')[1],
      imgUrl: '',
    };
  },
  computed: {
    ...mapGetters(['newIsLogin', 'newUserInfo']),
    /** 得出ID和内容显示状态 */
    contentType() {
      return {
        type: this.$route.query.content_type,
        id: this.$route.query.id,
      };
    },
  },
  created() {
    this.getContent();
  },
  methods: {
    /** 打开分享海报 */
    openSharePic() {
      this.showSharePic = true;
      // document.body
      html2canvas(this.$refs.imageWrapper, {
        useCORS: true,
        width: this.$refs.imageWrapper.clientWidth, // dom 原始宽度
        height: this.$refs.imageWrapper.clientHeight,
        scrollY: 0,
        scrollX: 0,
      }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/png');
        this.imgUrl = dataURL;
        if (this.imgUrl !== '') {
          this.dialogTableVisible = true;
        }
        // console.log(dataURL);
      });
    },
    /** 关闭遮罩层 */
    close(type) {
      this.showSharePic = type;
    },
    /** 点赞文章 */
    async handlestar() {
      try {
        const resstart = await artcleAPI.setstar({ article: +this.contentType.id });
        console.log(resstart);
        if (resstart.list.includes(+this.contentType.id)) {
          this.content.star += 1;
        } else {
          this.content.star -= 1;
        }
        this.$store.dispatch('setUserInfo');
      } catch (err) {
        console.log(err);
        this.$toast.fail(err.message);
        this.$isLogin(this.path);
      }
    },
    /** 收藏文章 */
    async collect() {
      try {
        const res = await artcleAPI.collect({ id: +this.contentType.id });
        console.log(res);
        if (res.list.includes(+this.contentType.id)) {
          this.content.collect += 1;
        } else {
          this.content.collect -= 1;
        }
        this.$store.dispatch('setUserInfo');
      } catch (err) {
        console.log(err);
        this.$toast.fail(err.message);
        this.$isLogin(this.path);
      }
    },
    /** 打开回复面板 */
    openComment(item) {
      this.showComment = true;
      if (item.id) {
        this.myPlaceholder = `回复: ${item.author.nickname}`;
        this.parentId = item.id;
      } else {
        this.myPlaceholder = '我也来说两句';
      }
    },
    /** 提交评论 */
    async submitComment() {
      console.log(this.$isLogin(this.path));
      if (this.commentText === '') return;
      this.$toast({
        type: 'loading',
        duration: 0,
      });
      try {
        const res = await artcleAPI.submitComments({
          content: this.commentText,
          article: +this.contentType.id,
          parent: +this.parentId,
        });
        // console.log(res, this.commentList);
        if (res.parent) {
          this.commentList.forEach((item) => {
            if (item.id === res.parent) {
              item.children_comments.unshift(res);
            }
          });
        } else {
          this.commentList.unshift(res);
        }
        this.$toast.clear();
        this.commentText = '';
        this.showComment = false;
      } catch (err) {
        this.$toast.fail(err);
        this.$isLogin(this.path);
      }
      console.log(this.commentText);
    },
    async onLoad() {
      this.start += this.limit;
      // 异步更新数据
      try {
        const dataList = await artcleAPI.getComments(+this.contentType.id,
          { start: this.start, limit: this.limit });
        // console.log(dataList);
        this.total = dataList.total;
        this.commentList.push(...dataList.list);
        // return dataList;
      } catch (err) {
        this.$toast.fail(err);
      }
      // 加载状态结束
      this.loading = false;
      // this.getCommentData();
      console.log(this.total);
      // 数据全部加载完成
      if (this.commentList.length >= this.total) {
        this.finished = true;
      }
    },
    /** 获取内容详情 */
    async getContent() {
      try {
        this.content = await artcleAPI.getContentDatail(this.contentType.type,
          +this.contentType.id);
        // console.log(this.content);
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
