<template>
  <a-layout-content class="layout-content">
    <a-radio-group style="margin-bottom: 15px" v-model="pane" buttonStyle="solid">
      <a-radio-button value="postInfo">动态数据</a-radio-button>
      <a-radio-button value="postmage">动态管理</a-radio-button>
    </a-radio-group>
    <div class="content" v-show="pane === 'postInfo'">
      <a-select
        style="float: right;"
        labelInValue
        :defaultValue="{key: '7'}"
        @change="handleSelectChange"
      >
        <a-select-option value="7">最近7天</a-select-option>
        <a-select-option value="15">最近15天</a-select-option>
        <a-select-option value="30">最近30天</a-select-option>
      </a-select>
      <div class="chart-container">
        <div id="postChart" style="width: 1500px; height: 500px"></div>
      </div>
    </div>
    <div v-show="pane === 'postmage'" class="content">
      <postmage></postmage>
    </div>
  </a-layout-content>
</template>

<script>
import postmage from './postmage'

export default {
  name: "post-manage",
  components: {
    postmage
  },
  data() {
    return {
      data: [],
      pane: 'postInfo',
      range: 7,
      newOption: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ["新增动态", '累计动态']
        },
        grid: {
          /*x: 30,
          y: 30,
          x2: 30,
          y2: 30,*/
          /*left: 65,*/
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "新增动态",
            type: "line",
            data: []
          },
          {
            name: "累计动态",
            type: "line",
            data: []
          }
        ]
      },
    }
  },
  methods: {
    handleSelectChange(e) {
      this.range = parseInt(e.key)
    },
    drawChart(option = this.newOption) {
      let chart = this.$echarts.init(document.getElementById('postChart'), 'light');
      chart.setOption(option)
    },
    setRange(d, option = this.newOption) {
      let dayRange = []
      let newdata = []
      let alldata = []
      let start = this.data.length - d
      newdata[0] = this.data[start]
      alldata[0] = this.data[start]
      for (let i = 1; i < d; i++) {
        dayRange.unshift(this.$moment().subtract(i, 'd').format('YYYY-MM-DD'))
        newdata[i] = this.data[start + i]
        alldata[i] = this.data[start + i] + alldata[i - 1]
      }
      option.xAxis.data = dayRange
      option.series[0].data = newdata
      option.series[1].data = alldata
    }
  },
  watch: {
    range(val) {
      this.setRange(val)
      this.drawChart()
    }
  },
  created() {
    for (let i = 0; i < 30; i++) {
      this.data[i] = parseInt(Math.random() * 300)
    }
    this.setRange(this.range)
  },
  mounted() {
    this.drawChart()
  }
}
</script>

<style scoped>
</style>