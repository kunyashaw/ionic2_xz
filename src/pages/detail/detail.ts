import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'

import { NotFoundPage } from '../not-found/not-found'
import { CartPage } from '../cart/cart'
import { LoginPage } from '../login/login'
import { ToastController } from 'ionic-angular'

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  detailInfo: any;
  cart;
  notFound;
  constructor(private toastCtr: ToastController, private myHttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.cart = CartPage;
    this.notFound = NotFoundPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');

    //隐藏tabs,显示自己的footer
    console.log(this);
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    let lid = this.navParams.get('id');
    this.myHttp
      .sendRequest(this, "product/detail?lid=" + lid)
      .subscribe((data) => {
        console.log('details', data);
        this.detailInfo = data.details;
      })
  }

  addToCart() {
    // cart/add.php
    this.myHttp
      .sendRequest(this, "cart/add?lid=" + this.detailInfo.lid + "&buyCount=1")
      .subscribe((result: any) => {
        console.log('addToCart', result);
        if (result) {
          let showToastMsg = "";
          if (result.code == 200) {
            //成功之后，通过提示添加成功
            showToastMsg = "添加成功"
          }
          else if (result.code == 500) {
            showToastMsg = "添加失败"
          }
          else if (result.code == 300) {
            showToastMsg = "未登录，将跳转到登录页面"
            this.navCtrl.push(LoginPage);
          }
          this.toastCtr
            .create({
              message: showToastMsg,
              position: 'top',
              duration: 1500
            })
            .present();
        }
      });


  }

}
