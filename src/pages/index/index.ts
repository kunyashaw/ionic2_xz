import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyHttpService } from '../../app/utility/service/myhttp.service'
import { DetailPage } from '../detail/detail'
import {ViewChild} from '@angular/core'
import { Slides } from 'ionic-angular'
/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  @ViewChild('mySlides') mySlides:Slides;
  //轮播商品
  carouselItems: Array<any> = [];
  //保存的推荐商品的对象数组
  recommendedItems: Array<any> = [];
  //跳转到详情需要的detail
  detail;
  constructor(private myHttp: MyHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.detail = DetailPage;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    //this.loadData();
   
  }

  ionViewWillEnter() {
    this.loadData();
    console.log("--will enter",this.mySlides); 
    if(this.mySlides){
      // this.mySlides.startAutoplay();
      
    }
  }

  ionViewDidEnter(){
    
  }

  ionViewWillLeave(){
    console.log("--will leave:",this.mySlides);
    if(this.mySlides){
      // this.mySlides.stopAutoplay();
    }
  }

  //初始化数据
  //"https://jsonplaceholder.typicode.com/posts"
  loadData() {
    this.myHttp
      .sendRequest(this, "index")
      .subscribe((data: any) => {
        console.log(data);
        if (data && data.carouselItems) {
          //轮播图，使用slides进行autoplay
          this.carouselItems = data.carouselItems;
          this.recommendedItems = data.recommendedItems;
          this.getId(this.carouselItems)
          this.getId(this.recommendedItems)
        }
      })
  }

  getId(list){
    for(var i=0;i<list.length;i++){
      var str = list[i].href
      console.log(str)
      var id = str.slice(str.indexOf('=')+1)
      list[i].lid = id
    }
  }
}
