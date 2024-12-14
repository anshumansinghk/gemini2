/**************************************************************************************
* 
***************************************************************************************/
export interface DDLBOption {

    value: number,
    label: string,
    inUse: boolean
}

export interface DDLBOptionString {

    value: string,
    label: string,
    inUse: boolean

}

export interface DDLBOptionWithDate {

    value: string,
    valueDate: Date,
    label: string,
    inUse: boolean
}

export interface DDLBDateOption {

    value: string,
    label: Date,
    inUse: boolean
}
