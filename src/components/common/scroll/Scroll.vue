<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },
    props: {
      //如果不将这个属性暴露出来，性能就会降低
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //监听滚动的事件
      if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }

      // 监听滚动到底部的事件
      if (this.pullUpLoad === true){
        this.scroll.on('pullingUp', () => {
          this.$emit("pullingUp")
        })
      }
    },

    //在执行方法的时候先检验scroll组件是否存在
    methods: {
      scrollTo(x, y, time = 3000) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },

      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },

      refresh() {
        // console.log("上拉加载更多");
        this.scroll && this.scroll.refresh()
      },
    }
  }
</script>

<style scoped>

</style>
