import {ADD_COUNTER, ADD_TO_CART} from "./mutations_types"

export default {
  addCart(context, payload) {
    // 返回一个Promise，告诉外边是否加入购物车成功
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前商品数量+1")
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve("商品添加成功")
      }
    })
  }
}
