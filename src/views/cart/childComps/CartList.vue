<template>
  <div class="cartList">
    <scroll class="content" ref="content">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index"
                      :item-info="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import { mapGetters } from "vuex"
  export default {
    name: "CartList",
    props: {

    },
    components: {
      Scroll,
      CartListItem,
    },
    computed: {
      ...mapGetters(["cartList"])
    },
    activated() {
      this.$refs.content.refresh()
    }
  }
</script>

<style scoped>
  .content{
    height: calc(100vh - 133px);
    overflow: hidden;
  }
</style>
