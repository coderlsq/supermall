<template>
  <div class="bottom-bar">
    <div class="check-content">
      <div class="selectAll">
        <CheckButton class="check-button" :isChecked="isSelectAll" @click.native="selectAll"/>
        <span class="selectAll-span">全选</span>
      </div>
    </div>
    <div class="totalPrice">
      <span class="check-span">总价：{{totalPrice}}</span>
    </div>
    <div class="totalPrice calculate" @click="calClick">
      <span class="check-span">去结算:{{calculate}}</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex';

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      selectAll() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = false
          })
        } else {
          this.cartList.forEach(item => {
            item.checked = true
          })
        }
      },
      calClick(){
        let count = 0;
        this.cartList.forEach(item =>{
          if (!item.checked){
            count += 1;
          }
        });
        if(count === this.cartList.length){
          this.$toast.show('请选择购买的商品',2000);
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      calculate() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        // 如果购物车中没有商品，返回false
        if (this.cartList.length === 0) {
          return false
        }

        // 1.使用filter遍历cartList，如果有一个商品的checked为false，返回false
        // return !(this.cartList.filter(item => {
        //   return !(item.checked)
        // }).length)

        // 2.使用find函数
        /*return !(this.cartList.find(item =>{
          return !item.checked
        }))*/

        // 3.使用for循环
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    background-color: #eeeeee;
    height: 40px;
    position: absolute;
    bottom: 50px;
    width: 100%;
    display: flex;
  }

  .check-content, .totalPrice {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100px;
  }

  .selectAll {
    display: flex;
    margin: 0 auto;
  }

  .selectAll-span {
    margin-left: 10px;
  }

  .check-span {
    margin: 0 auto;
  }

  .totalPrice {
    flex: 1;
  }

  .calculate {
    background-color: red;
    color: #eeeeee;
    text-align: center;
  }
</style>
