import _http from '../utils/request';

/** 面试技巧列表接口 /articles/techni */
function getTechnicData(params) {
  return _http({
    url: '/articles/technic',
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
/** 面经分享 /articles/share */
function getShareData(params) {
  return _http({
    url: '/articles/share',
    method: 'GET',
    params,
  });
}
/** 面经热搜 /articles/shareTopSearch 面试技巧热搜 /articles/technicTopSearch */
function getHotSearch(hotSearch) {
  return _http({
    url: `/articles/${hotSearch}`,
  });
}
export default {
  getTechnicData,
  getMarketData,
  getShareData,
  getHotSearch,
};
