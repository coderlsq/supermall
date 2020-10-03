<template>
  <div class="goodList">
    <goods-list-item v-for="item in goods" :good-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goodList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
