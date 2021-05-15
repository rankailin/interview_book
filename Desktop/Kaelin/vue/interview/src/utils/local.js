// eslint-disable-next-line no-underscore-dangle
// const _KEY = 'MKTOKEN';

/** 获取token */
function getMKToken(KEY) {
  return window.localStorage.getItem(KEY);
}
/** 设置token */
function setMKToken(KEY, token) {
  window.localStorage.setItem(KEY, token);
}
/** 删除token */
function removeMKToken(KEY) {
  window.localStorage.removeItem(KEY);
}
export default {
  getMKToken,
  setMKToken,
  removeMKToken,
};
