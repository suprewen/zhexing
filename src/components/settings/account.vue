<template>
  <div class="content">
    <h3>账号</h3>
    <div class="contentwrap">
      <a-row>
        <a-col :span="5">
          <div class="wrap">
            <div class="card vue-avatar-cropper-demo text-center">
              <div class="card-body">
                <a-avatar
                  :src="$root.user.uAvatar"
                  class="card-img avatar"
                  :size="130"
                >{{$root.user.unickname.substring(0, 1).toUpperCase()}}</a-avatar>
                <div class="card-img-overlay">
                  <a-button type="primary" id="pick-avatar">换头像</a-button>
                </div>
              </div>
              <avatar-cropper
                @uploading="handleUploading"
                @uploaded="handleUploaded"
                @completed="handleCompleted"
                @error="handlerError"
                trigger="#pick-avatar"
                :upload-url="uploadUrl"
                upload-form-name="file1"
              />
            </div>
          </div>
        </a-col>
        <a-col :span="19">
          <account-form></account-form>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'
import accountForm from './account-form.vue'

export default {
  name: "account",
  components: {
    AvatarCropper, accountForm
  },
  data() {
    return {
      message: " ",
      uploadUrl: `http://192.168.43.166:88/uploadIcon?uname=${this.$root.user.uname}`
    }
  },
  methods: {
    handleUploading() {
      this.$message.info('uploading...');
    },
    handleUploaded(response) {
      window.console.log(response)
      // TODO 改头像
      this.$root.user.uAvatar = response.data
      let data = this.$root.user
      this.$root.setChangedUser(data)
      this.$root.$message.success('修改成功')
    },
    handleCompleted() {
      //this.$message.success('upload completed');
    },
    handlerError() {
      this.$message.error('Oops! Something went wrong...');
    }
  },
  created() {

  }
}
</script>

<style scoped>
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}

/* .avatar {
  width: 90%;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
} */

.card-img-overlay {
  display: none;
  transition: all 0.8s;
}

.card-img-overlay .ant-button {
  margin-top: 10vh;
}

.card:hover .card-img-overlay {
  display: block;
}

h3 {
  border-bottom: 1px solid #e8e8e8;
}

.wrap {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.card {
  position: relative;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  -ms-flex: 1 1 auto;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  padding: 1.25rem;
  transition: all 1s;
}
</style>
<style>
.content {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 1px 1px #e8e8e8;
  padding: 20px;
}

.contentwrap {
  width: 100%;
}
</style>