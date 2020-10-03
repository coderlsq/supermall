<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <div class="tab-control">
      <tab-control :titles="['流行','新款','精选']"
                    @tabControlClick="tabClick"></tab-control>
    </div>
    <goods-list :goods="goods[activeGood].list"></goods-list>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import tabControl from "components/common/tabControl/tabControl";

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
        activeGood: "pop"
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      tabControl,
      GoodsList,
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 以下方法都是网络请求的方法
       * */
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
       * 一下的方法都是监听事件的方法
       * */
      tabClick(index) {
        const type = ['pop', 'new', 'sell']
        this.activeGood = type[index]
      },
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
  }

  #home{
    padding-top: 44px;
  }

  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 99;
  }
</style>
