<template>
  <div class="my-overlay-container">
    <van-overlay :show="showSharePic" @click="handleClose">
      <div class="wrapper" @click.stop>
        <div class="block">
          <h3>长按图片下载并分享</h3>
          <div class="poster-container">
            <div class="poster-pic">
              <img :src="imgUrl" alt />
            </div>
            <div class="poster-logo">
              <img src="../../assets/login.png" alt />
            </div>
            <div class="poster-qr-code" id="qrcode" ref="qrcode"></div>
            <p>长按识别二维码查看原文</p>
          </div>
        </div>
        <div class="close" @click="handleClose" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';

export default {
  props: {
    showSharePic: {
      type: Boolean,
      default: false,
    },
    imgUrl: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.qrCode(window.location.href);
  },
  methods: {
    // 生成二维码方法
    qrCode(url) {
      document.getElementById('qrcode').innerHTML = '';// 在调用qrCode前使用js原生方法清空元素内容
      const qrcode = new QRCode('qrcode', {
        width: 72, // 图像宽度
        height: 72, // 图像高度
        colorDark: '#000000', // 前景色
        colorLight: '#ffffff', // 背景色
        // typeNumber: 4,
        correctLevel: QRCode.CorrectLevel.H,
      });
      qrcode.clear(); // 清除二维码
      qrcode.makeCode(url); // 生成另一个新的二维码
    },
    handleClose() {
      this.$emit('close', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
