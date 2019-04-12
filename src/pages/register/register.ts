import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {MyHttpService} from '../../app/utility/service/myhttp.service'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  uname = ""
  isuNameValid = false
  uNameControl = new FormControl();

  upwd = ""
  isuPwdValid = false
  uPwdControler = new FormControl()

  rupwd = ""
  isrupwdValid = false
  ruPwdControler = new FormControl()

  uphone = ""
  isuphoneValid = false
  uPhoneControler = new FormControl()

  uemail = ""
  isuemailValid = false
  uEmailControler = new FormControl()
  

  constructor(private myService:MyHttpService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    var list = [this.uNameControl,this.uPwdControler,this.ruPwdControler,this.uPhoneControler,this.uEmailControler]

    var handlerList = [this.handleName,this.handlePwd,this.handlerPwd,this.handlePhone,this.handleEmail]


    this.uNameControl.valueChanges
    .debounceTime(1000)
    .subscribe((newValue)=> {
      this.handleName(newValue)
    });
    
    this.uPwdControler.valueChanges
    .debounceTime(1000)
    .subscribe((newValue)=> {
      this.handlePwd(newValue)
    });

    this.ruPwdControler.valueChanges
    .debounceTime(1000)
    .subscribe((newValue)=> {
      this.handlerPwd(newValue)
    });

    this.uPhoneControler.valueChanges
    .debounceTime(1000)
    .subscribe((newValue)=> {
      this.handlePhone(newValue)
    });
    this.uEmailControler.valueChanges
    .debounceTime(1000)
    .subscribe((newValue)=> {
      this.handleEmail(newValue)
    });


  }
// http://127.0.0.1:8080/user/checkemail?email=ya@qq.com
// http://127.0.0.1:8080/user/checkphone?phone=18111111111
// http://127.0.0.1:8080/user/checkuname?uname=jing
  handleName(data){
    this.myService.sendRequest(this,'user/checkuname?uname='+data).subscribe((result)=>{
      if(result.code == 200){
        this.isuNameValid = true
      }else{
        this.isuNameValid = false
      }
    })
  }
  handlePwd(data){
    this.upwd = data
    if(this.rupwd == this.upwd && this.upwd.length != 0){
      this.isuPwdValid = true
      this.isrupwdValid = true
    }else{
      this.isuPwdValid = false
      this.isrupwdValid = false
    }
  }
  handlerPwd(data){
    this.rupwd = data
    if(this.rupwd == this.upwd && this.upwd.length != 0){
      this.isuPwdValid = true
      this.isrupwdValid = true
    }else{
      this.isuPwdValid = false
      this.isrupwdValid = false
    }
  }
  handlePhone(data){
    if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(data)){
      // this.myService.showToast('手机号格式不对')
      this.isuphoneValid = false
      return
    }
    this.myService.sendRequest(this,'user/checkphone?phone='+data).subscribe((result)=>{
      if(result.code == 200){
        this.isuphoneValid = true
      }else{
        this.isuphoneValid = false
      }
    })
  }
  handleEmail(data){
    if(!/^\S+@\S+\.\S+$/.test(data)){
      this.isuemailValid = false
      return
    }
    this.myService.sendRequest(this,'user/checkemail?email='+data).subscribe((result)=>{
      if(result.code == 200){
        this.isuemailValid = true
      }else{
        this.isuemailValid = false
      }
    })
  }

  doRegister(){
    if(this.isrupwdValid && this.isuPwdValid && this.isuNameValid && this.isuphoneValid && this.isuemailValid){
      this.myService.sendPostRequest('user/register',{uname:this.uname,upwd:this.upwd,phone:this.uphone,email:this.uemail}).subscribe((data)=>{
        console.log(data)
        if(data.code == 200){
          this.navCtrl.pop()
        } else{
          this.myService.showToast('请完善注册信息')
        }
      })
    }else{
      this.myService.showToast('请完善注册信息')
    }
  }

}
