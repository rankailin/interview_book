<template>
  <div class="chart-data-container">
    <div class="data-title">
      <MyNavBar title="市场数据" @bark="$router.back()" />
    </div>
    <div>
      <van-dropdown-menu active-color="#ff976a">
        <van-dropdown-item :title="value" v-model="value" @change="selectCity">
          <template #default>
            <van-index-bar>
              <div v-for="(city, i) in options" :key="i">
                <van-index-anchor :index="city.value" />
                <van-cell
                  @click="selectCity(item)"
                  v-for="(item,i) in city.text"
                  :key="i"
                  :title="item[0]"
                />
              </div>
            </van-index-bar>
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="筛选">
          <template #default>
            <van-index-bar>
              <van-cell title="文本" />
            </van-index-bar>
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="wage-income">
      <h5>工资收入</h5>
      <canvas id="myChart" style="height:190px widht:190px"></canvas>
    </div>
  </div>
</template>

<script>
import { chartDataAPI } from '@/api';

export default {
  data() {
    return {
      value: '北京',
      options: [],
      cityInfo: null,
      data: [{
        assetType: '债券资产',
        percent: 73.76,
        const: 'const',
      }, {
        assetType: '其他资产',
        percent: 22.11,
        const: 'const',
      }, {
        assetType: '股票资产',
        percent: 2.20,
        const: 'const',
      }, {
        assetType: '现金资产',
        percent: 1.93,
        const: 'const',
      }],
    };
  },
  methods: {
    selectCity(item) {
      // eslint-disable-next-line prefer-destructuring
      this.value = item[0];
      console.log(item, this.cityInfo);
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    drawChart() {
      const colorMap = {
        债券资产: '#1890FF',
        其他资产: '#2FC25B',
        股票资产: '#FACC14',
        现金资产: '#F04864',
      };
      // 设置图例项的内容
      const legendItems = [];
      this.data.forEach((obj) => {
        const item = {
          name: obj.assetType,
          // eslint-disable-next-line prefer-template
          value: '    ' + obj.percent + '%',
          marker: {
            symbol: 'square',
            fill: colorMap[obj.assetType],
            radius: 4,
          },
        };
        legendItems.push(item);
      });
      // Step 1: 创建 Chart 对象
      const chart = new this.$F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio, // 指定分辨率
      });

      // Step 2: 载入数据源
      console.log(this.data);
      chart.source(this.data, {
        percent: {
          formatter: function formatter(val) {
            // eslint-disable-next-line prefer-template
            return val + '%';
          },
        },
      });
      chart.coord('polar', {
        transposed: true,
        radius: 0.85,
      });
      chart.legend({
        position: 'right',
        custom: true,
        items: legendItems,
        nameStyle: {
          fill: '#808080',
        }, // 图例项 key 值文本样式
        valueStyle: {
          fill: '#333',
          fontWeight: 'bold', // 图例项 value 值文本样式
        },
      });
      chart.axis(false);
      chart.interval()
        .position('const*percent')
        // eslint-disable-next-line prefer-arrow-callback
        .color('assetType', function (val) {
          // eslint-disable-next-line no-undef
          return colorMap[val];
        })
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
        });

      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.interval().position('genre*sold').color('genre');

      // Step 4: 渲染图表
      chart.render();
    },
  },
  mounted() {
    const v = this;
    this.$nextTick(() => {
      v.drawChart();
    });
  },
  async created() {
    this.cityInfo = await chartDataAPI.cityList();

    this.options = Object.keys(this.cityInfo).map((item) => ({
      value: item,
      text: this.cityInfo[item],
    }));
    console.log(this.options);
  },
};
</script>

<style>
</style>
