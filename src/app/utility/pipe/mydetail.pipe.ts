import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myDetail'
})

export class MyDetailPipe implements PipeTransform {
    /* <div class="content_tpl">
    <div class="formwork" >
     <div class="formwork_img" >
     <img class="" src= "//img20.360buyimg.com/vc/jfs/t3034/151/748569500/226790/d6cd86a2/57b15612N81dc489d.jpg" > </div></div> <div class="formwork" > <div class="formwork_img" > <img class="" src= "//img20.360buyimg.com/vc/jfs/t2683/60/4222930118/169462/233c7678/57b15616N1e285f09.jpg" > </div></div> <div class="formwork" > <div class="formwork_text" > 技术规格 请前往 www.apple.com / cn / macbook - air / specs.html 查看完整内容。</div></div> </div>"
    */


    transform(value: any, ...args: any[]): any {
        return value + '...'
    }
}