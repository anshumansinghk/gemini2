/**************************************************************************
*  Revision History:
**************************************************************************/

import { Injectable } from '@angular/core';
import { Sort } from './../sort/models/sort';
import { Filters } from './../filter/models/filters';
import { Filter } from './../filter/models/filter';
import { FilterDataOptions, FILTER_DATA_CONSTANTS } from './../models/table-utils';

@Injectable( {
    providedIn: 'root'
} )
export class TableUtils{

    constructor() { }

    sortData<T>(data: T[], sort: Sort,isStringCompare:boolean, getItemProperty?: (a: T, b: string) => any ) : T[] {
       
        const tempData = data.slice();
        if ( !sort || !sort.id ) {
            return tempData;
        }
        
        if ( !getItemProperty ) {
            getItemProperty = function ( item:any, id ) {
            return item[id]?.toString()?.toLowerCase();
            }
        }
        
        let id = sort.id;
        let thenBy:any = null;

        if (id.indexOf(",") > 0) {
            let splits = id.split(",");
            id = splits[0].trim();
            thenBy = splits[1].trim();
        }
        // let isStringCompare: boolean = false;
        // let index = tempData.findIndex(x => isNaN(getItemProperty?.(x,id)));
        // if (index > -1) {
        //     isStringCompare = true;
            
        // }
        // console.log(isStringCompare)
        
        
        return tempData.sort((a, b) => {

            let aValue: any = getItemProperty?.( a, id );
            let bValue: any = getItemProperty?.(b, id);
            if (isStringCompare) {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            else {
                aValue = Number(aValue);
                bValue = Number(bValue);
            }

            if (thenBy != null) {
                let aValueThen: any = getItemProperty?.(a, thenBy);
                let bValueThen: any = getItemProperty?.(b, thenBy);

                if (isStringCompare) {
                    aValueThen = aValueThen.toLowerCase();
                    bValueThen = bValueThen.toLowerCase();
                }
                else {
                    aValueThen = Number(aValueThen);
                    bValueThen = Number(bValueThen);
                }

                let result = aValue - bValue || aValueThen - bValueThen ;
                result = result * (sort.asc ? -1 : 1);
                return result;
            }
            else {
                return ( aValue > bValue ? -1 : 1 ) * ( sort.asc ? 1 : -1);
            }

        });
    }




    
    pageData<T>( data: T[], page: number, pageSize: number): T[] {
        let start = ( page - 1 ) * pageSize;
        let end = start + pageSize;

        return data.slice(start, end);
    }

    filterData<T>( data: T[], filters: Filters, getItemProperty?: ( a: T, b: string ) => any, options?: FilterDataOptions ): T[] {
        // // console.log(data);
        // // console.log(filters);
        if ( !options ) {
            options = {
                filterType: FILTER_DATA_CONSTANTS.FILTER_TYPES.EQUAL
            };
        }

        let tempData = data.slice();

        if ( !filters || Object.keys( filters ).length == 0 ) {
            return tempData;
        }

        if ( !getItemProperty ) {
            getItemProperty = function ( item:any, id ) {
                return item[id];
            }
        }

        let value:any;
        for ( var key in filters ) {
            if ( !filters.hasOwnProperty( key ) ) continue;

            value = filters[key].toLowerCase();

            tempData = tempData.filter( item => {
                // // console.log(key);
                // // console.log(item);
                if(getItemProperty?.( item, key )!=null ){
                    var itemValue:any = getItemProperty?.( item, key ).toString().toLowerCase();
                }
                else{
                    var itemValue:any ='';
                }
                    
                    if ( options?.filterType == FILTER_DATA_CONSTANTS.FILTER_TYPES.EQUAL ) {
                        return itemValue == value;
                    }
                    else if ( options?.filterType == FILTER_DATA_CONSTANTS.FILTER_TYPES.STARTS_WITH ) {
                        return itemValue.startsWith( value );
                    }
                    else if ( options?.filterType == FILTER_DATA_CONSTANTS.FILTER_TYPES.CONTAINS ) {
                        return itemValue.indexOf( value ) >= 0;
                    }
                

                return false;
            });
        }

        return tempData;
    }
    
    filterAllRowData(items: any, filter: any, defaultFilter: boolean): any {


        if (!filter){
          return items;
        }
    
        if (!Array.isArray(items)){
          return items;
        }
    
        if (filter && Array.isArray(items)) {
          /* // console.log(items,filter)*/
          let filterKeys = Object.keys(filter);
  // // console.log(filterKeys)
   // // console.log(filter);
          if (defaultFilter) {
            return items.filter(item =>
                filterKeys.reduce((x:any, keyName) =>
                    (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
          }
          else {
            return items.filter(item => {
              return filterKeys.some((keyName) => {
                return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
              });
            });
          }
        }
      }
}
