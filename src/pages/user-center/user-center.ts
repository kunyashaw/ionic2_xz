import { Component } from '@angular/core';
import { IonicPage, AlertController,NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'
import {LoginPage} from '../login/login'

/**
 * Generated class for the UserCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  uname = ""
  constructor(private alerCtrl:AlertController,private myHttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.myHttp.checkUserLogin().subscribe((data)=>{
      console.log(data)
      if(data.uname){
          this.uname = data.uname;
      }else{
        this.alerCtrl.create({
          title:'未登录',
          message:'请先登录 再查看信息',
          buttons:[
            {text:'确定登录',handler:()=>{this.navCtrl.push(LoginPage)}},
            {text:'取消',handler:()=>{this.navCtrl.parent.select(0)}}
          ]
        }).present()
        
      }
    })
  }

  logout() {
    this.myHttp
      .sendRequest(this, "user/logout")
      .subscribe((data) => {
        if (data.code == 200) {
          this.myHttp.showToast('退出成功');
          this.uname = ""
          this.navCtrl.parent.select(0);
        }
      })
  }

}
