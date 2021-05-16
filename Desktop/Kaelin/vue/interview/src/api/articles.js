import _http from '../utils/request';

/** typeList:technic 面试技巧列表接口 /articles/technic
 * typeList:share 面经分享 /articles/share
 */
function getListData(params, typeList) {
  return _http({
    url: `/articles/${typeList}`,
    method: 'GET',
    params,
  });
}
/** 热门数据 /chart-data/hot  */
function getMarketData() {
  return _http({
    url: '/chart-data/hot',
    method: 'GET',
  });
}
/** 面经热搜 /articles/shareTopSearch
 * 面试技巧热搜 /articles/technicTopSearch
 * shareTopSearch 面经热搜
 * technicTopSearch 面试技巧 */
function getHotSearch(hotSearch) {
  return _http({
    url: `/articles/${hotSearch}`,
  });
}
/** 内容详情
 * contentDetail: /articles/technic/:id 面试技巧详情接口
 * contentDetail: /articles/share/:id 面试经验分享详情接口
 */
function getContentDatail(contentDetail, id) {
  // console.log(contentDetail, id);
  return _http({
    url: `/articles/${contentDetail}/${id}`,
  });
}
/** 面经分享评论接口 /articles/comments/:id  */
function getComments(id, params) {
  return _http({
    url: `/articles/comments/${id}`,
    params,
  });
}
/** 发表评论接口 /articles/comments */
function submitComments(data) {
  return _http({
    url: '/articles/comments',
    method: 'POST',
    data,
    needMKToken: true,
  });
}
/** 收藏:/articles/collect */
function collect(id) {
  return _http({
    url: '/articles/collect',
    method: 'POST',
    data: id,
    needMKToken: true,
  });
}
/* /点赞文章 /articles/star */
function setstar(article) {
  return _http({
    url: '/articles/star',
    method: 'POST',
    data: article,
    needMKToken: true,
  });
}
export default {
  getListData,
  getMarketData,
  getHotSearch,
  getContentDatail,
  getComments,
  submitComments,
  collect,
  setstar,
};
