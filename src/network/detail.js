import {request} from "./request";

//获取详细的商品的数据
export function getDetail(iid) {
  return request({
    url: 'detail',
    params: {
      iid
    }
  })
}

//获取推荐的商品
export function getRecommend() {
  return request({
    url: 'recommend',
  })
}

//商品的基本信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}

//商家的信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

//商品的尺寸信息
export class GoodsParams {
  constructor(info, rule) {
    this.infos = info.set;
    this.sizes = rule.tables;
    this.image = info.images ? info.images[0] : '';
  }
}


