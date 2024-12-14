/**************************************************************************
 *  Revision History:
 *
 **************************************************************************/

 import { Pipe, PipeTransform } from "@angular/core";

 @Pipe({
     name: "seMathAbs",
 })
 export class SeAbsolutePipe implements PipeTransform {
     constructor() {}

     transform(value: number): number {
         if (value == null) value = 0;

         value =  Math.abs(value);

         return value;
     }
 }
