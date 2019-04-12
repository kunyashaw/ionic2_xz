import { ViewChild, Component } from '@angular/core';
import { IonicPage, Tabs, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'

import { IndexPage } from '../index/index'
import { OrderConfirmPage } from '../order-confirm/order-confirm'
import { LoginPage } from '../login/login'

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  productList: Array<any> = [];
  totalPrice = 0;
  index;
  orderConfirm;
  isLogin: boolean = false;
  isAllSelected = false
  @ViewChild("myTabs") myTabs: Tabs;



  constructor(private myHttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.index = IndexPage;
    this.orderConfirm = OrderConfirmPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }



  ionViewDidEnter() {
    this.isAllSelected = false
    this.guard();
    this.loadData();
  }

  loadData() {
    this.myHttp
      .sendRequest(this, "cart/list")
      .subscribe((result) => {
        console.log('cart', result);
        if (result.code == 200) {
          this.productList = result.data;
          for(var i=0;i<this.productList.length;i++){
            this.productList[i].isSelected = false
          }
        }
      })
  }
  selectAll(){
    for(var i=0;i<this.productList.length;i++){
      this.productList[i].isSelected = this.isAllSelected
    }
  }
  selectOne(){
    var result = true
    for(var i=0;i<this.productList.length;i++){
      result = result && this.productList[i].isSelected
    }
    this.isAllSelected = result
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (var i = 0; i < this.productList.length; i++) {
      if(this.productList[i].isSelected)
        this.totalPrice += (this.productList[i].count * this.productList[i].price);
    }
    console.log("计算后的总价格信息为", this.totalPrice);
    return this.totalPrice;
  }

  //从购物车中移除
  deleteFromList(index) {
    this.myHttp.sendRequest(this, "cart/del?iid=" + this.productList[index].iid)
      .subscribe((result: any) => {
        if (result && result.code == 200) {
          this.productList.splice(index, 1);
        }
      })
  }

  //修改购物车数量
  modifyCount(isMinux: boolean, index: number) {

    let readyModifyCount = this.productList[index].count;
    console.log('修改前是:' + readyModifyCount);
    // http://127.0.0.1:8080/cart/updatecount?iid=1&count=2

    if (isMinux) {
      readyModifyCount--;
      if (readyModifyCount == 0) {
        return;
      }
    }
    else {
      readyModifyCount++;
    }
    this.myHttp.sendRequest(this,'cart/updatecount?iid='+this.productList[index].iid+"&count="+readyModifyCount).subscribe((data)=>{
      if(data.code == 200){
          this.productList[index].count = readyModifyCount;
      }
    })
    
    

  }

  jumpToTabIndex() {
    this.navCtrl.parent.select(0);
  }
  jumpToLogin() {
    this.myHttp.showToast('准备跳转到登录页面');
    this.navCtrl.push(LoginPage);
  }

  jumpToPay(){
    if(this.getTotalPrice()>0){
      this.navCtrl.push(OrderConfirmPage)
    }else{
      this.myHttp.showToast('您未选中商品！')
    }
  }

  //守卫
  guard() {
    this.myHttp.checkUserLogin().subscribe((data) => {
      console.log('login', data);
      if (data.uid) {
        this.isLogin = true;
        return true;
      }
      else {
        this.isLogin = false;
        if (this.navCtrl.parent.getSelected().index != 1) {
          this.myHttp.showToast('未登录，准备跳转到登录页面');
          this.navCtrl.push(LoginPage);
        }
        //if ()

        return false;
      }
    })
    return false;
  }
}
