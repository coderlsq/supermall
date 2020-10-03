<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles"
         @click="itemClick(index)"
         :class="{active: index === activeIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        activeIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.activeIndex = index
        this.$emit("tabControlClick",index)
      },
    },
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
  }

  .tab-control-item{
    flex: 1;
    text-align: center;
    height: 44px;
    line-height: 44px;
  }

  .active{
    color: var(--color-high-text);
  }
  .active span{
    padding-bottom: 5px;
    border-bottom: 3px solid var(--color-high-text);
  }

</style>
