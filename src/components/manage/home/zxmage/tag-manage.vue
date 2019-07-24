<template>
  <a-layout-content class="layout-content">
    <p>近期热搜动态数变化</p>
    <div class="content">
      <div class="chart-container">
        <div id="tagChart" style="width: 1000px; height: 800px"></div>
      </div>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  name: "tag-manage",
  data() {
    return {

    }
  },
  methods: {
    getRandomNum() {
      let randomNum = []
      for (let i = 0; i < 7; i++) {
        randomNum[i] = parseInt(Math.random() * 40 + (7 - Math.random() * i) * 10)
      }
      return randomNum
    },
    initChart() {

      let dayRange = []

      for (let i = 0; i < 7; i++) {
        dayRange.unshift(this.$moment().subtract(i, 'd').format('YYYY-MM-DD'))
      }
      let startDate = dayRange[0].toString()

      let option = {
        /*title: {
          text: '热搜近期动态数变化'
        },*/
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            ['date', ...dayRange],
            ['复习', 41, 30, 65, 53, 83, 98, 76],
            ['zhexing', 86, 92, 85, 83, 73, 55, 49],
            ['算法', 24, 67, 79, 86, 65, 82, 90],
            ['hello', 55, 67, 69, 72, 53, 39, 58],
            ['海贼王', 50, 60, 71, 65, 67, 55, 62],
            ['船新的话题', 56, 45, 60, 67, 45, 58, 50],
            ['奶茶', 21, 15, 18, 11, 24, 19, 15],
            ['直男', ...this.getRandomNum()],
            ['生活大爆炸', ...this.getRandomNum()],
            ['权力的游戏', ...this.getRandomNum()],
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: [
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
              formatter: `{b}: {@${startDate}}({d}%)`
            },
            encode: {
              itemName: 'date',
              value: startDate,
              tooltip: startDate
            }
          }
        ]
      };

      let myChart = this.$echarts.init(document.getElementById('tagChart'), 'light');
      myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      });

      myChart.setOption(option);

    }
  },
  mounted() {
    this.initChart()
  }
}

</script>

<style scoped>
</style>