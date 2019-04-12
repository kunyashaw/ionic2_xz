import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service';
import { RegisterPage } from '../register/register'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname = "";
  upwd = "";
  constructor(private myhttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    this.myhttp
      .sendPostRequest("user/login",{uname:this.uname , upwd:this.upwd})
      .subscribe((data) => {
        console.log(data)
        if (data) {
          if (data.code == 200) {
            console.log('all', this.navCtrl.getAllChildNavs());
            this.navCtrl.pop();
            this.myhttp.showToast('登录成功');
          }
          else if (data.code == 401) {
            this.myhttp.showToast('请输入用户名');
          }
          else if (data.code == 402) {
            this.myhttp.showToast('请输入密码');
          }
          else if (data.code == 301) {
            this.myhttp.showToast('用户名或者密码错误');
          }
        }
      })
  }
  doRegister(){
    this.navCtrl.push(RegisterPage)
  }
}
