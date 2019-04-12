import { Component } from '@angular/core';
import { LoadingController, ViewController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(public viewCtrl: ViewController, private loadCtr: LoadingController, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');

  }

  closeModal(isSuccess) {
    this.viewCtrl.dismiss(isSuccess);
  }

  payOrder() {
    this.loadCtr.create({
      content: '支付中...',
      duration: 1500
    }).present();

    setTimeout(() => {
      this.closeModal(true);
    }, 1500)
  }

}
