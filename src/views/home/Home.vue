<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <div class="tab-control2" v-show="isTCShow">
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabControlClick="tabClick"></tab-control>
    </div>
    <scroll class="content"
            ref="content"
            :probe-type="3"
            :pullUpLoad="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImgLoad.once="swiperImgLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <div class="tab-control1">
          <tab-control ref="tabControl1"
                       :titles="['流行','新款','精选']"
                       @tabControlClick="tabClick"></tab-control>
        </div>
        <goods-list :goods="goods[activeGood].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import NavBar from "components/common/navbar/NavBar";
  import tabControl from "components/common/tabControl/tabControl";
  import Scroll from "components/common/scroll/Scroll";

  import GoodsList from "components/content/goods/GoodsList";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {
    getHomeMultidata,
    getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        },
        activeGood: "pop",
        scrPosition: 0,
        tCTop: 0,
        isTCShow: false,
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      tabControl,
      GoodsList,
      Scroll,
    },
    methods: {

      /**
       * 以下方法都是网络请求的方法
       * */
      //请求banners和recommends的数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })

      },

      /**
       * 以下的方法都是监听事件的方法
       * */
      tabClick(index) {
        const type = ['pop', 'new', 'sell']
        this.activeGood = type[index]
        this.$refs.tabControl1.activeIndex = index
        this.$refs.tabControl2.activeIndex = index
      },

      contentScroll(position) {
        this.isShowBackTop = (- position.y > 1000)

        this.isTCShow = (-position.y > this.tCTop)
      },

      loadMore() {
        this.getHomeGoods(this.activeGood)
        this.$refs.content.finishPullUp()
      },

      swiperImgLoad() {
        this.tCTop = this.$refs.tabControl1.$el.offsetTop - 44;
      }
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mixins: [itemListenerMixin, backTopMixin],
    activated() {
      //对组件进行一次刷新,这次刷新要放在前面
      this.$refs.content.refresh()
      this.$refs.content.scrollTo(0, this.scrPosition, 0)
    },
    deactivated() {
      this.scrPosition = this.$refs.content.scroll.y;
      this.$bus.$off('imgLoad', this.itemImgListener)
    },
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }

  #home{
    height: 100vh;
  }

  .tab-control2{
    position: fixed;
    top: 43px;
    right: 0px;
    left: 0px;
    z-index: 99;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 49px);

    overflow: hidden;
  }
</style>
