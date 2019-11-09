import { Pipe, PipeTransform } from '@angular/core';
// import * as moment from 'moment-timezone';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    // switch (args) {
    //   case 'UTC':
    //     return moment.tz(value, 'Asia/Chongqing').local().format('YYYY-MM-DD HH:mm:ss');
    //   case 'date':
    //     return moment.unix(value).format('YYYY-MM-DD');
    //   default:
    //     return moment.tz(value, 'Asia/Chongqing').local().format('YYYY-MM-DD HH:mm:ss');
    // }
  }
}
