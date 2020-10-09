import {debounce} from "common/utils";
import BackTop from "components/content/backTop/BackTop";

//混入是vue的高级用法，是用来解决不同vue组件之间存在相同代码，减少代码的书写

export const itemListenerMixin = {
  date() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.content.refresh, 100);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on('imgLoad', this.itemImgListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop,
  },
  data(){
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.content.scrollTo(0, 0, 2000)
    },
  }
}
