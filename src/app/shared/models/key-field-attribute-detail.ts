import { DDLBOptionString } from './ddlb-option';

/*******************************************************************************
*
********************************************************************************/

export interface KeyFieldAttributeDetail {
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
    dataTypeDescription: string;
    defaultFields: DDLBOptionString[];
    excludedAccounts: number[];
    selectedAccountIds: number[];
}
