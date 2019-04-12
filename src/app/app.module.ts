import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import {RegisterPage} from '../pages/register/register'

import { MyHttpService } from './utility/service/myhttp.service'
import { MyDetailPipe } from './utility/pipe/mydetail.pipe'

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IndexPage } from '../pages/index/index'
import { DetailPage } from '../pages/detail/detail'
import { CartPage } from '../pages/cart/cart'
import { LoginPage } from '../pages/login/login'
import { OrderConfirmPage } from '../pages/order-confirm/order-confirm'
import { HomePage } from '../pages/home/home'
import { NotFoundPage } from '../pages/not-found/not-found'
import { UserCenterPage } from '../pages/user-center/user-center'
import { PayPage } from '../pages/pay/pay'

@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    DetailPage,
    CartPage,
    LoginPage,
    OrderConfirmPage,
    HomePage,
    MyDetailPipe,
    NotFoundPage,
    UserCenterPage,
    PayPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    DetailPage,
    CartPage,
    LoginPage,
    OrderConfirmPage,
    HomePage,
    NotFoundPage,
    UserCenterPage,
    PayPage,
    RegisterPage
  ],
  providers: [
    MyHttpService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
