import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoadingController } from 'ionic-angular'
import { AlertController } from 'ionic-angular'
import { ToastController } from 'ionic-angular'


@Injectable()
export class MyHttpService {
   baseUrl = "http://localhost:8080/"

    constructor(private toastCtr: ToastController, private alertCtrl: AlertController, private loadCtr: LoadingController, private http: Http) {
        
     }
   
    showToast(msg) {
        this.toastCtr.create({
            message: msg,
            duration: 1500,
            position: 'bottom'
        }).present();
    }
    checkUserLogin() {
        return this.http.get(this.baseUrl+'user/sessiondata', { withCredentials: true })
            .map((response: Response) => response.json());
    }

    sendPostRequest(url,data){
        let myLoad = this.loadCtr.create({
            content: 'loading...',
            spinner: 'bubbles'
        });
        myLoad.present();
        var path = this.baseUrl+url
        return this.http.post(path,data, { withCredentials: true })
            .map((response: Response) => {
                console.log('请求成功');
                myLoad.dismiss();
                console.log(response);
                return response.json()
            })
    }
    sendRequest(obj: any, url: string) {
        let myLoad = this.loadCtr.create({
            content: 'loading...',
            spinner: 'bubbles'
        });
        myLoad.present();
        console.log('准备发起请求,url is ' + url);
        //a-http-get
        var path = this.baseUrl+url
        return this.http.get(path, { withCredentials: true })
            .map((response: Response) => {
                console.log('请求成功');
                myLoad.dismiss();
                console.log(response);
                return response.json()
            })
            .catch((error: any) => {
                //console.log('请求失败', error.json());
                myLoad.dismiss()
                return '请求失败'
            })
            ;
    }

    validInfo(){}

}