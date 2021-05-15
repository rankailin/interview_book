import _http from '../utils/request';

/** 获取统计信息接口 /chart-data/statistics */
async function getChartData(city, position) {
  const chartData = await _http({
    url: '/chart-data/statistics',
    method: 'GET',
    params: {
      city,
      position,
    },
  });
  return chartData;
}
/** 获取城市信息 */
async function cityList() {
  const city = await _http({
    url: '/chart-data/indexes',
    method: 'GET',
  });
  return city;
}
export default {
  getChartData,
  cityList,
};
