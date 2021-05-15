export default {
  data() {
    return {
      // 加载完成的数据
      dataList: [],
      // 是否处于加载中
      loading: false,
      // 是否所有的数据以全部加载完毕
      finished: false,
      // 从哪一位数字开始加载
      start: -3,
      // 每一次加载的条数
      limit: 3,
      // 总的数据条数
      total: -1,
    };
  },
  methods: {
    /** 开始加载数据啦 */
    async  onLoad() {
      // 异步更新数据
      this.start += this.limit;
      const loadInfo = {
        start: this.start,
        limit: this.limit,
        q: '',
      };
      // 场景中一般为 ajax 请求
      const refLoad = await this.loadData(loadInfo);
      this.total = refLoad.total;
      this.dataList.push(...refLoad.list);
      console.log(this.dataList, this.total);
      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.dataList.length === this.total) {
        this.finished = true;
      }
    },
  },
};
