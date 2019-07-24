import Vue from 'vue'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://192.168.2.116:88'

// qs
import qs from 'qs'
Vue.prototype.$qs = qs

// md5
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// moment
import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.$moment = moment

// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// ant-design-vue
import {
  Radio,
  Row,
  Col,
  Layout,
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
  Menu,
  Icon,
  Select,
  List,
  Avatar,
  Spin
} from 'ant-design-vue'
import message from 'ant-design-vue'
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Select)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Spin)
Vue.prototype.$message = message
