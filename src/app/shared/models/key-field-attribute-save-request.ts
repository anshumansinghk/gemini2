
/*******************************************************************************
* 
********************************************************************************/

export interface KeyFieldAttributeSaveRequest {
    id: number;
    formTypeId: number;
    fieldName: string;
    formFieldName: string;
    tableName: string;
    fieldDisplayName: string;
    fieldDesc: string;
    acctId: number;
    dataType: string;
    planFieldFlag: boolean;
    planFieldActualId: number;
    codeType: string;
    defaultValueField: string;
    fieldRequired: boolean;
    fieldIncludeInSummary: boolean;
    popOnNegative: boolean;
    showOnCalendar: boolean;
    keyFieldAccounts: number[];
}
