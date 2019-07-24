<template>
  <div class="hotTagListContainer">
    <div>你可能感兴趣</div>
    <ul>
      <li v-for="tag in hotTagList" :key="tag.index">
        <a-row>
          <router-link :to="{name: 'search', query: {search: tag.tname}}">{{tag.tname}}</router-link>
        </a-row>
        <a-row>
          <span>{{tag.dynamics}}条动态</span>
        </a-row>
      </li>
    </ul>
    <div id="emptyList" v-if="hotTagList.length === 0">
      <span>列表空空如也</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hotTagList',
  data() {
    return {
      hotTagList: []
    }
  },
  methods: {
    getHotTagList() {
      this.axios.get('/tag/hotTag')
        .then(res => {
          this.hotTagList = res.data.data
        }, err => {
          window.console.log(err)
        })
    },
  },
  created() {
    this.getHotTagList()
  }
}
</script>

<style lang="less" scoped>
.hotTagListContainer {
  background-color: #ffffff;
  padding: 15px;
  margin-top: 15px;
}
#emptyList {
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  font-weight: bold;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1em 0 0 0;

  li {
    font-size: 14px;

    a:hover {
      text-decoration: underline;
    }

    span {
      font-size: 12px;
      color: #657786;
      font-weight: normal;
    }
  }
}
</style>