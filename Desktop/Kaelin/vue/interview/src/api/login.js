import _http from '../utils/request';

/** 获取登录验证码  */
async function getCode(mobile) {
  const code = await _http({
    url: '/au/code',
    method: 'POST',
    data: { mobile },
  });
  if (code.code === 200) {
    return code.data;
  }
  return code;
}
/** 用户登录 */
async function userLogin(info) {
  const login = await _http({
    url: '/au/login',
    method: 'POST',
    data: info,
  });
  if (login.code === 200) {
    return login.data;
  }
  return login;
}
/** 获取用户信息 */
async function getUserInfo() {
  const userInfo = await _http({
    url: '/au/info',
    method: 'GET',
    needMKToken: true,
  });
  return userInfo;
}
/** 文件上传 /upload */
async function fileUpload(file) {
  console.log(file);
  const fd = new FormData();
  fd.append('files', file);
  const fileinfo = await _http({
    url: '/upload',
    method: 'POST',
    data: fd,
    needMKToken: true,
  });
  return fileinfo;
}
/** 修改用户信息 /au/edit */
async function enitUser(editInfo) {
  // console.log(editInfo);
  const user = await _http({
    url: '/au/edit',
    method: 'POST',
    data: editInfo,
    needMKToken: true,
  });
  return user;
}
export default {
  getCode, userLogin, getUserInfo, enitUser, fileUpload,
};
