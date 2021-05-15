<template>
  <div class="mine-info-container">
    <MyNavBar @bark="$router.push({name:'Mine'})" title="我的资料" />
    <div class="mine-box" v-if="newUserInfo">
      <van-cell
        @click="toEditMine('avatar')"
        class="mine-info-cell minr-into-top"
        title="头像"
        is-link
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #default>
          <img
            class="mine-info-avatar"
            :src="newUserInfo.avatar ? $store.state.BASEURL + newUserInfo.avatar : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=6965124,2146386350&fm=26&gp=0.jpg'"
          />
        </template>
      </van-cell>
      <van-cell-group class="mine-content">
        <van-cell
          @click="toEditMine('nickname')"
          class="mine-info-cell"
          title="呢称"
          :value="newUserInfo.nickname"
          is-link
        />
        <van-cell
          class="mine-info-cell"
          title="性别"
          :value="genderList[newUserInfo.gender]"
          is-link
          @click="mine_show_gender=true"
        />
        <van-cell
          class="mine-info-cell"
          title="地区"
          :value="areaList.city_list[newUserInfo.area]"
          @click="mine_show_area = true"
          is-link
        />
        <van-cell
          class="mine-info-cell"
          title="个人简介"
          :value="newUserInfo.intro ? newUserInfo.intro :'割麦子去啦'"
          @click="toEditMine('intro')"
          is-link
        />
      </van-cell-group>
      <van-button class="sign-out" plain size="large" round type="primary" @click="logOut">
        退出登录
      </van-button>
    </div>
    <van-action-sheet v-model="mine_show_gender">
      <van-picker
        show-toolbar
        :columns="mine_actions"
        @confirm="mine_gender_confirm"
        @cancel="mine_show_gender = false"
        @change="mine_Change"
        :default-index="newUserInfo.gender"
      />
    </van-action-sheet>
    <van-action-sheet v-model="mine_show_area">
      <van-area
        :area-list="areaList"
        :columns-num="2"
        :value="newUserInfo.area"
        @confirm="mine_area_confirm"
        @cancel="mine_show_area = false"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { loginAPI } from '@/api';
import { areaList } from '@vant/area-data';
import { MKToken } from '@/utils';

export default {
  data() {
    return {
      mine_show_gender: false,
      mine_show_area: false,
      mine_actions: ['未知', '男', '女'],
      areaList,
    };
  },
  computed: {
    ...mapGetters(['newUserInfo', 'genderList']),
  },
  methods: {
    /** 退出登录 */
    logOut() {
      this.$dialog.confirm({
        title: '',
        message: '确定要退出吗?',
      })
        .then(() => {
          // on confirm
          console.log('aaa');
          MKToken.removeMKToken('MKTOKEN');
          this.$router.push({ name: 'Login' });
        })
        .catch(() => {
          // on cancel
        });
    },
    /** 修改城市 */
    async mine_area_confirm(value) {
      // console.log(value);
      this.$toast({
        type: 'loading',
        duration: 0,
      });
      this.mine_show_area = false;
      try {
        await loginAPI.enitUser({ area: value[1].code });
        this.$store.dispatch('setUserInfo');
      } catch (err) {
        console.log(err);
      }
      this.$toast.clear();
    },
    /** 取消修改城市 */
    // mine_area_cancel() {
    //   this.mine_show_area = false;
    // },
    async mine_gender_confirm(value, index) {
      this.$toast({
        type: 'loading',
        duration: 0,
      });
      this.mine_show_gender = false;
      try {
        await loginAPI.enitUser({ gender: index });
        this.$store.dispatch('setUserInfo');
      } catch (err) {
        console.log(err);
        this.$toast(err);
      }
      this.$toast.clear();
    },
    /** 修改取消性别 */
    // mine_gender_cancel() {
    //   this.mine_show_gender = false;
    // },
    /** 选择 */
    mine_Change() {
      // console.log(value, index);
    },
    toEditMine(enitInfo) {
      // console.log(avatar);
      this.$router.push({ name: 'MineEdit', query: { mine_type: enitInfo } });
    },
  },
};
</script>

<style scoped lang="scss">
.mine-info-container {
  height: 100vh;
  background: $gray-3;
  .mine-box {
    padding: 0 15px;
    font-size: 15px;
    .minr-into-top {
      margin-top: 18px;
    }
    .mine-info-cell {
      height: 60px;
      line-height: 60px;
      border-radius: 8px;
      padding: 0 15px;
      .mine-info-avatar {
        width: 40px;
        height: 40px;
        // line-height: 40px;
        transform: translateY(10px);
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .mine-content {
      margin: 13px 0;
      border-radius: 8px;
    }
    ::v-deep.van-icon {
      margin-left: 8px;
      line-height: 60px;
    }
    ::v-deep.van-cell__value {
      width: 170px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .sign-out {
      letter-spacing: 3px;
      color: $orange;
      border: none;
    }
  }
  .mine-action-content {
    .mine-btn-box {
      display: flex;
      justify-content: space-between;
      .mine-btn {
        border: none;
        padding: 15px;
        color: $orange-dark;
      }
    }
    ::v-deep.van-action-sheet__content {
      padding: 23px 0;
      .van-action-sheet__item {
        height: 44px;
        line-height: 44px;
      }
    }
  }
}
</style>
