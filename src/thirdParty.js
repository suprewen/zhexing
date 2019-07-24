import Vue from 'vue'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://192.168.43.166:88' //http://192.168.2.116:88

// qs
import qs from 'qs'
Vue.prototype.$qs = qs

// ant-design-vue
import {
  Button,
  Form,
  Input,
  Checkbox,
  Icon,
  Modal,
  Select,
  Cascader,
  Row,
  Tooltip,
  Col,
  Alert,
  Layout,
  Menu,
  Avatar,
  Popover,
  Dropdown,
  Card,
  AutoComplete,
  Spin,
  List,
  BackTop,
  Comment,
  Tabs,
  Badge,
  Radio
} from 'ant-design-vue'
import { message } from 'ant-design-vue'

Vue.prototype.$message = message

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Modal)
Vue.use(Select)
Vue.use(Cascader)
Vue.use(Row)
Vue.use(Tooltip)
Vue.use(Col)
Vue.use(Alert)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(Card)
Vue.use(AutoComplete)
Vue.use(List)
Vue.use(Spin)
Vue.use(BackTop)
Vue.use(Comment)
Vue.use(Tabs)
Vue.use(Badge)
Vue.use(Radio)

// md5
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSearch,
  faAssistiveListeningSystems,
  faShoppingCart,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faAssistiveListeningSystems, faShoppingCart, faAngleDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// vue-chat-scroll
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

// moment
import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.$moment = moment
