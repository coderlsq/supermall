<template>
  <div v-if="topImage">
    <swiper class="detailSwiper">
      <swiper-item v-for="item in topImage">
        <img :src="item" alt="" @load.once="imgLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper/";

  export default {
    name: "DetailSwiper",
    props: {
      topImage: {
        default() {
          return null
        }
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    methods: {
      imgLoad() {
        this.$emit("imageLoad")
      },
    }
  }
</script>

<style scoped>
  .detailSwiper{
    width: 100%;
    height: 300px;

    overflow: hidden;
  }
</style>
