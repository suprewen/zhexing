<template>
  <div class="list">
    被举报动态
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      itemLayout="horizontal"
      :dataSource="data"
    >
      <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
      >
        <a-spin v-if="loadingMore"/>
        <a-button v-else @click="onLoadMore">加载更多</a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions">处理</a>
        <a slot="actions">查看</a>
        <a-list-item-meta description="内容">
          <a slot="title" href>{{item.name.last}}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
        <div>举报描述</div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'

export default {
  name: 'postmage',
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    }
  },
  mounted() {
    this.getData((res) => {
      this.loading = false
      this.data = res.results
    })
  },
  methods: {
    getData(callback) {
      this.axios.get(fakeDataUrl)
        .then(res => {
          callback(res.data)
        })
    },
    onLoadMore() {
      this.loadingMore = true
      this.getData((res) => {
        this.data = this.data.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    },
  },
}
</script>
<style>
.demo-loadmore-list {
  min-height: 350px;
}
.list {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
