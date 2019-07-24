<template>
  <a-layout-content class="layout-content">
    <a-radio-group style="margin-bottom: 15px" v-model="chart" buttonStyle="solid">
      <a-radio-button value="newOption">新增用户</a-radio-button>
      <a-radio-button value="allOption">累积用户</a-radio-button>
    </a-radio-group>
    <div class="content">
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
        <div id="chart" style="width: 1500px; height: 500px"></div>
      </div>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  name: "user-manage",
  data() {
    return {
      data: [],
      chart: 'newOption',
      range: 7,
      newOption: {
        title: {
          text: "近期新增用户"
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ["新增用户"]
        },
        grid: {

        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "新增用户",
            type: "line",
            data: []
          }
        ]
      },
      allOption: {
        title: {
          text: '近期累计用户'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ["累计用户"]
        },
        grid: {

        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "累计用户",
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
      let chart = this.$echarts.init(document.getElementById('chart'), 'light');
      chart.setOption(option)
    },
    setRange(d, option = this.newOption) {
      let dayRange = []
      let data = []
      let start = this.data.length - d
      data[0] = this.data[start]
      for (let i = 1; i < d; i++) {
        dayRange.unshift(this.$moment().subtract(i, 'd').format('YYYY-MM-DD'))
        if (this.chart === 'newOption') {
          data[i] = this.data[start + i]
        } else {
          data[i] = this.data[start + i] + data[i - 1]
        }
      }
      option.xAxis.data = dayRange
      option.series[0].data = data
    }
  },
  watch: {
    range(val) {
      if (this.chart === 'allOption') {
        this.setRange(val, this.allOption)
        this.drawChart(this.allOption)
      } else {
        this.setRange(val)
        this.drawChart()
      }
    },
    chart(val) {
      if (val === 'allOption') {
        this.setRange(this.range, this.allOption)
        this.drawChart(this.allOption)
      } else {
        this.setRange(this.range)
        this.drawChart()
      }
    }
  },
  created() {
    for (let i = 0; i < 30; i++) {
      this.data[i] = parseInt(Math.random() * 100)
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
<style>
.content {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0 0 2px 3px #e8e8e8;
  padding: 15px;
  overflow: hidden;
}
.chart-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout-content {
  overflow: hidden;
  padding: 15px 50px 50px;
}
</style>