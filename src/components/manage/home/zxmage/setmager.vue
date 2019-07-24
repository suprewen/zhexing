<template>
  <a-layout-content class="layout-content">
    管理员
    <div class="content">
      <a-list itemLayout="horizontal" :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta :description="item.desc">
            <a slot="title" href @click.prevent>{{item.title}}</a>
            <a-avatar slot="avatar" :src="item.avatar"/>
          </a-list-item-meta>
          <a slot="actions">查看</a>
          <a slot="actions">修改</a>
        </a-list-item>
      </a-list>
      <hr style="border: 1px solid #e8e8e8;">
      <a style="font-size: 16px" href @click.prevent>
        <a-avatar icon="plus"/>添加管理员
      </a>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  name: "setmager",
  data() {
    return {
      data: [
        {
          title: 'admin',
          desc: 'zhexing manager',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          title: 'wenchao',
          desc: 'zhexing manager',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          title: 'jianming',
          desc: 'zhexing manager',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        {
          title: 'qianghao',
          desc: 'zhexing manager',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        /*{
          title: '添加管理员',
          desc: '',
          avatar: ''
        }*/
      ]
    }
  }
}
</script>

<style scoped>
.content {
  padding: 50px;
}
</style>