import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IndexPage } from '../index/index'
import { CartPage } from '../cart/cart'
import { OrderConfirmPage } from '../order-confirm/order-confirm'
import { UserCenterPage } from '../user-center/user-center'
import {NotFoundPage} from '../not-found/not-found'

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  index;
  cart;
  orderConfirm;
  userCenter;
  notfound = NotFoundPage
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.index = IndexPage;
    this.cart = CartPage;
    this.orderConfirm = OrderConfirmPage;
    this.userCenter = UserCenterPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
