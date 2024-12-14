/**************************************************************************
*  Revision History:
**************************************************************************/


export class SHARED_CONSTANTS {
    static readonly DROPLIST_PRESETS = [
        {
            name: "CURRENCY",
            settings: {
                codeType: "CURNCY",
                codeSubType: "",
                displayMode: "valuefirst",
                displaySeperator: " - ",
                displayPrefix: "",
                displaySuffix: "",
                sortByValue: false,
                sortByOrder: false,
            },
        },
        {
            name: "COUNTRY",
            settings: {
                codeType: "COUNTR",
                codeSubType: "",
                displayMode: "description",
                displaySeperator: " ",
                displayPrefix: "",
                displaySuffix: "",
                sortByValue: false,
                sortByOrder: false,
            },
        },
        {
            name: "YESNO",
            settings: {
                codeType: "YESNO",
                codeSubType: "",
                displayMode: "description",
                displaySeperator: "",
                displayPrefix: "",
                displaySuffix: "",
                sortByValue: false,
                sortByOrder: false,
            },
        },
    ];

    static readonly ROUTE_TYPE = {
        BUSINESS_ADMINISTRATION: "BUSINESS_ADMIN",
        TECHNICAL_ADMINISTRATION: "TECHNICAL_ADMIN",
        FINANCIAL_ADMINISTRATION: "FINANCIAL_ADMIN",
        CUSTOMER: "CUSTOMER",
        ORGANIZATION: "ORGANIZATION",
        WORKFLOW_FORM: "WORKFLOW_FORM",
        PREVIEW_FORM: "PREVIEW_FORM",
        FORM_KEY_FIELDS: "FORM_KEY_FIELDS",
        MATRIX_FORMULA: "FORMULA",
        RECONCILIATION_TYPE_YTD: "YTD",
        SYSTEM_LEVEL: "SYSTEM",
        GADGET: "GADGET",
    };

    static readonly MASTERFIELD_INPUT_TYPE = {
        INPUT: "INPUT",
        CHKBOX: "CHKBOX",
        DDLB: "DDLB",
        RADIO: "RADIO",
        INPUT_TYPE_VALIDATOR_TEXT: "TEXT",
        INPUT_TYPE_VALIDATOR_NUMBER: "NUMBER",
    };

    static readonly KPMGDataType = {
        CODE_TYPE : "KPMGDT",
        CHECK_BOX : "CHKBOX",
        DROP_LIST : "DDLB",
        MONEY : "MONEY",
        NUMBER : "NUMBER",
        SELECT_LIST : "SELLST",
        TAX_RATE : "TXRATE",
    };
}

