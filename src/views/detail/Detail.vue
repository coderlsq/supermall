<template>
  <div id="detail">
    <detail-nav-bar class="detailNavBar" @titleClick="titleClick" :activeIndex="navBarIndex"></detail-nav-bar>
    <scroll class="content" ref="content" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-image="topImage" @imageLoad="imageLoad" ref="swiper"></detail-swiper>
      <detail-base-info :baseInfo="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import {getDetail, Goods, Shop, GoodsParams} from "network/detail"
  import {getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";

  export default {
    name: "Detail",
    data() {
      return {
        id: 0,
        topImage: {
          type: Array,
          default() {
            return ['','']
          }
        },
        goods: null,
        shop: null,
        detailInfo: null,
        paramInfo: null,
        commentInfo: null,
        recommends: null,
        themeTopY: [],
        navBarIndex: 0,
      }
    },
    components: {
      DetailParamInfo,
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
    },
    methods: {
      imageLoad() {
        this.$refs.content.refresh()
        this.getThemeTopY()
      },

      titleClick(index) {
        if (this.themeTopY[index]){
          this.$refs.content.scrollTo(0, -this.themeTopY[index] + 44, 1000)
        }
      },

      getThemeTopY() {
      },

      contentScroll(position) {
        position = -position.y + 44
        for (let i in this.themeTopY){
          //转化为数字
          i = i * 1
          if (position >= this.themeTopY [i] && position < this.themeTopY[i + 1]){
            this.navBarIndex = i
          }else if (i === this.themeTopY.length-1 && position > this.themeTopY[i]){
            this.navBarIndex = i
          }
        }

        //监听滚动的距离是否超过backTop显示的距离
        this.isShowBackTop = (position > 1000)
      },

      addCart() {
        const product = {};
        product.img = this.topImage[0];
        product.title = this.goods.title;
        product.price = this.goods.realPrice;
        product.desc = this.goods.desc;
        product.iid = this.id;
        product.checked = true
        this.$store.dispatch("addCart", product)
      }
    },
    created() {
      this.id = this.$route.params.id

      //根据商品的id获取数据
      getDetail(this.id).then((result) => {
        const data = result.result

        //获取轮播图数据
        this.topImage = data.itemInfo.topImages

        //获取商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //获取商家信息
        this.shop = new Shop(data.shopInfo)

        //获取商品的详细信息
        this.detailInfo = data.detailInfo

        //获取商品的尺寸信息
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

        //获取商品的评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //获取推荐数据
      getRecommend().then((result) => {
        this.recommends = result.data.list
      })

      //在DOM渲染完之后执行下列的代码（但是图片还没有加载完），这个方法和update类似
      // this.$nextTick(() => {
      // })

      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(this.$refs.swiper.$el.offsetTop)
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      })
    },
    mixins: [itemListenerMixin, backTopMixin],
    destroyed() {
      this.$bus.$off('imgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 101;
    background-color: #fff;
  }

  .detailNavBar{
    position: relative;
    z-index: 102;
    background-color: #fff;
  }

  .content{
    height: calc(100vh - 44px - 49px);
  }
</style>
