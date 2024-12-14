export default class Utils {
    static isempty(val: any) { 
        // console.log(val != undefined,val != null,val != '',Array.isArray(val) && val.length === 0,typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0);
        
        let emptyC1 = (val == undefined || val == null || val == '');
        let emptyC2 = true;
        let emptyC3 = true;
        
        if(!emptyC1){
            emptyC2 = (Array.isArray(val) && val.length === 0);
            emptyC3 = (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0);
        }
        // console.log(emptyC1 , emptyC2 , emptyC3, emptyC1 , emptyC2 || emptyC3);
        return emptyC1 || emptyC2 ||  emptyC3 ;
    }

    static cl(val:any) { 
        console.log('<<>>',val);
    }

    static objToStr(obj:object={}){
        return Object.values(obj).reduce((s,v) => s+v,'');
    }

}