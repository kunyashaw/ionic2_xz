import { Component } from '@angular/core';
import { ViewController,ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPage } from '../pay/pay'
import { MyHttpService } from '../../app/utility/service/myhttp.service'

/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
  // styleUrls: ['../assets/css/order_confirm.css']
})
export class OrderConfirmPage {
  productList = []
  constructor(private viewCtrl:ViewController,private myHttp: MyHttpService,public modalCtr: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    this.myHttp
      .sendRequest(this, "cart/list")
      .subscribe((result) => {
        if (result.code == 200) {
          this.productList = result.data;
        }
      })
  }

  pay() {
    let myWidnow = this.modalCtr.create(PayPage);
    console.log('准备显示');
    myWidnow.present();
    myWidnow.onDidDismiss((data)=>{
      console.log(data)
      if(data){
        console.log(this.navCtrl.parent)
        //清空购物
        this.viewCtrl.dismiss()
        this.navCtrl.parent.select(0)
      }else{
        this.myHttp.showToast('用户取消支付了！')
      }
    })
  }

}
