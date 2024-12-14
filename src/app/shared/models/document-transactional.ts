
/**************************************************************************
*  Object Name: document-transactional.ts
**************************************************************************/


export interface DocumentTransactional {

    id: number;
    programId: number;
    classType: string;
    classId: number;
    documentLibraryHdrId: number;
    title: string;
    contentType: string;
    sourceFileName: string;
    description: string;
    fileSize: number;
    fileDate: string;
    customerView: string;
    clientView: string;
    documentId: number;
    formTypeId: number;
    formId: number;
    data: string;
}
