<template>
  <div class="mine-edit-container">
    <MyNavBar
      :title="mineType"
      @bark="$router.back()"
      @hold="holdInfo"
      :nav_bar_right="newUserInfo[mine_info] !== edit_content"
    />
    <div class="mine-content">
      <van-uploader
        v-if="mineType=== '修改头像'"
        class="edit-uploader-avatar"
        multiple
        :max-count="1"
        preview-size="200px"
        v-model="avatarList"
        :after-read="afterRead"
        :before-read="beforeRead"
      />
      <van-field
        v-else
        v-model="edit_content"
         rows="1"
        autosize
        type="textarea"
        placeholder="请输入留言"
        class="edit-field"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { loginAPI } from '@/api';

export default {
  name: 'MineEdit',
  data() {
    return {
      mine_info: this.$route.query.mine_type,
      avatarList: [],
      edit_content: null,
    };
  },
  mounted() {
    this.getUserInfo();
    this.showAvatar();
  },
  computed: {
    ...mapGetters(['newUserInfo']),
    mineType() {
      let editType = null;
      if (this.mine_info === 'avatar') {
        editType = '修改头像';
      } else if (this.mine_info === 'nickname') {
        editType = '修改呢称';
      } else if (this.mine_info === 'intro') {
        editType = '修改个性签名';
      } else if (this.mine_info === 'position') {
        editType = '更新岗位';
      }
      return editType;
    },
  },
  methods: {
    async afterRead(file) {
      this.$toast({
        type: 'loading',
        message: '上传中...',
        duration: 0,
      });
      try {
        const resAvatar = await loginAPI.fileUpload(file.file);
        this.edit_content = resAvatar[0].id;
        this.$toast.clear();
        console.log(resAvatar[0]);
      } catch (err) {
        this.$toast(err);
      }
    },
    beforeRead(file) {
      // 上传之前校验
      const avatarFormat = file.type === 'image/jpeg' || file.type === 'image/png';
      const avatarSize = file.size / 1024 / 1024 < 2;
      console.log(file, avatarFormat, avatarSize);
      if (!avatarFormat) {
        this.$toast('只允许上传jpg|png格式的图片！');
      }
      if (!avatarSize) {
        this.$toast('图片文件太大~~');
      }
      return avatarFormat && avatarSize;
    },
    /** 修改信息 */
    async holdInfo() {
      this.$toast({
        type: 'loading',
        duration: 0,
      });
      try {
        await loginAPI.enitUser({ [this.mine_info]: this.edit_content });
        this.$store.dispatch('setUserInfo');
        this.$router.back();
        this.$toast.clear();
      } catch (err) {
        console.log(err);
      }
    },
    /** 初识化修改框内容 */
    getUserInfo() {
      this.edit_content = this.newUserInfo[this.mine_info];
    },
    /** 初始化头像显示 */
    showAvatar() {
      this.avatarList.push({ url: this.$store.state.BASEURL + this.newUserInfo[this.mine_info] });
    },
  },
};
</script>

<style lang="scss" scoped>
.mine-edit-container {
  .edit-uploader-avatar {
    margin: 23px 0;
    ::v-deep.van-uploader__wrapper {
      transform: translateX(50%);

      .van-uploader__upload {
        border-radius: 8px;
        border-radius: 50%;
      }
    }
    ::v-deep.van-image__img {
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .mine-content {
    margin: 15px;
    .edit-field {
      background: $gray-2;
      padding: 8px;
      border-radius: 8px;
    }
  }
}
</style>
