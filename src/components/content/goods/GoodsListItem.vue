<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodItem.title}}</p>
      <span class="price">{{goodItem.price}}</span>
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodLists",
    props: {
      goodItem: {
        type: Object,
        default() {
          return null
        }
      },
    },
    methods: {
      imgLoad() {
        //第一种方式：利用路由检测应该向那里发送图片完成的事件
        //这种方式是简单易懂，但是降低了复用性
        // if(this.$route.path.indexOf('/home')){
        //   this.$bus.$emit("homeImgLoad")
        // }else if (this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit("detailImgLoad")
        // }
        // 第二种方式：不管三七二十一往外传，但是在接受处设置，当前页面不再是活跃状态时就将处理
        // 这个响应的事件关闭（从而引入了’混入‘）
        this.$bus.$emit("imgLoad")
      },

      itemClick() {
        this.$router.push("/detail/" + this.goodItem.iid)
      }
    },
    computed: {
      showImg() {
        return this.goodItem.image || this.goodItem.show.img
      }
    },
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
