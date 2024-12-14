
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'fillArr'
})
export class FillArrPipe implements PipeTransform {
  transform(value:number) {
    return (new Array(value)).fill(1);
  }
}