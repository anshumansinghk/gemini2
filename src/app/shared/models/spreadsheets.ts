//* 02/12/2020 - TS - #TFS12792 - Spreadsheet service enhancement.

export interface Spreadsheets {
    name?: string;
    worksheet: SpreadsheetsWorksheets[];
}


export interface SpreadsheetsWorksheets {
    name?: string;
    columns: SpreadsheetsColumns[];

}

export interface SpreadsheetsColumns {
    name: string;
    header: string;
    type?: string;
    width?: number;
    weight?: string;
    horizontalAlignment?: string;
    numberFormat?: string;
    dataValidation?: SpreadsheetsDataValidation;
}


export interface SpreadsheetsDataValidation {
    type: string;
    formula: string;
    inputMessageTitle: string;
    inputMessage: string;
    errorStyle: string;

}

export interface SpreadsheetRowData {
    [key: string]: any;
}
