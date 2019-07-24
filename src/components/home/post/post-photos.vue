<template>
  <div>
    <!-- 盛放缩略图的容器 -->
    <div :style="previewBoxStyle">
      <img
        :src="item.src"
        v-for="(item, i) in list"
        :key="i"
        @click="showPreview(i, imgIndexClass)"
        :style="thumbImageStyle"
        :class="[imgIndexClass+'','thumbImg']"
      />
    </div>

    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe.
      It's a separate element as animating opacity is faster than rgba().-->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <!-- Container that holds slides.
        PhotoSwipe keeps only 3 of them in the DOM to save memory.
        Don't modify these 3 pswp__item elements, data is added later on.-->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!-- Controls are self-explanatory. Order can be changed. -->
            <div class="pswp__counter"></div>

            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
// Core JS file
import PhotoSwipe from "photoswipe/dist/photoswipe.js";
import PhotoSwipeUIDefault from "photoswipe/dist/photoswipe-ui-default.min.js";

export default {
  name: "postPhotos",
  data() {
    return {};
  },
  props: {
    // 需要进行预览的图片
    list: {
      // 数据类型
      type: Array,
      required: true,
      default: function () {
        return [

        ];
      }
    },
    // 默认缩略图的样式
    thumbImageStyle: {
      type: Object,
      default: function () {
        return {
          width: "100px",
          height: "100px",
          margin: "10px",
          cursor: "pointer"
        };
      }
    },
    // 默认缩略图容器的样式
    previewBoxStyle: {
      type: Object,
      default: function () {
        return {};
      }
    },
    // 是否允许单击关闭
    tapToClose: {
      type: Boolean,
      default: function () {
        return false;
      }
    },
    //寻找图片位置                            edited by wenchao 2019/5/6
    imgIndexClass: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  methods: {
    // 点击图片显示缩略图
    showPreview(i, imgIndexClass) {
      var pswpElement = document.querySelectorAll(".pswp")[0];

      // define options (if needed)
      var options = {
        // 默认展示第几张图片
        index: i, // start at first slide
        // 点击关闭
        tapToClose: this.tapToClose,
        bgOpacity: 0.75,
        // 实现打开缩略图的动画效果
        getThumbBoundsFn: function (index) {
          // 获取页面上对应点击的图片
          window.console.log(imgIndexClass)
          let indexClass = `.${imgIndexClass}`
          window.console.log(indexClass)
          var thumbnail = document.querySelectorAll(indexClass)[index];

          // 获取到页面已经滚动的距离
          var pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll

          // get position of element relative to viewport
          var rect = thumbnail.getBoundingClientRect();

          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      };

      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUIDefault,
        this.list,
        options
      );
      gallery.init();

      // 即将关闭
      gallery.listen("close", () => {
        this.$emit("close");
      });

      // Gallery unbinds events
      // (triggers before closing animation)
      gallery.listen("unbindEvents", () => {
        // console.log('unbindEvents')
      });

      // 关闭之后清理资源
      gallery.listen("destroy", () => {
        this.$emit("destroy");
      });
    }
  }
};
</script>

<style scoped>
</style>