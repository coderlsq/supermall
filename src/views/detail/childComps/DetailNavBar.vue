<template>
  <div>
    <nav-bar>
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" @click="imgClick">
      </div>
      <div  slot="center"  class="center">
        <div v-for="(item,index) in titles"
             class="item-text"
             @click="itemClick(index)" :class="{active : index === currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    props: {
      activeIndex: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        id: "",
        currentIndex: 0,
        isCurrentIndex: false,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit("titleClick", index)
      },
      imgClick() {
        this.$router.go(-1)
      }
    },
    watch: {
      activeIndex(newName, oldName) {
        this.currentIndex = newName
      }
    }
  }
</script>

<style scoped>
  .center{
    display: flex;
    font-size: 13px;
  }

  .item-text{
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }

  img{
    width: 30%;
    height: 30%;
    margin-top: 13px;
  }
</style>
