<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div class="item-text" :class="{active : isActive}" :style="{color : activeStyle}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      textColor: {
        type: String,
        default: "#ff5777"
      }
    },
    methods: {
      itemClick() {
        if (this.$route.path != this.path){
          this.$router.push(this.path)
        }
      },

    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? this.textColor : '#333'
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 12px;

  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }
</style>
