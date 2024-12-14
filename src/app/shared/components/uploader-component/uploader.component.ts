/**************************************************************************
*  Object Name: uploader.component.ts
**************************************************************************/

import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, SecurityContext } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UploaderService } from './uploader.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CONSTANTS } from '../../../core/models';
import { ConfirmService, ConfirmResponse } from '../../confirm';
import { ModalService } from '../../services/modal.service';


@Component({
    selector: 'uploader-component',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.css']
})


export class UploaderComponent implements OnInit {
    imgOverlay:boolean = false;
    @Output('close') close = new EventEmitter<boolean>();
    @Output('uploadedFiles') uploadedFiles = new EventEmitter<any>();
    @ViewChild('el') el!: ElementRef;
    @Input('quickAdd') quickAdd: boolean = true;
    @Input('isMobile') isMobile: boolean = false;
    @Input('canClose') canClose: boolean = true;
    public uploader!: FileUploader |any;
    uploadResponse: any | any[] = [] ;
    uploadPercent: number[] | any  = [];
    fileToUpload!: File | null;
    uploadingFinishedLength: number = 0; 
    index: number = 0;
    uploaded: boolean = false;
    zoomFlag: boolean = false;
    fileName!: string;
    constructor(private service: UploaderService, private _sanitizer: DomSanitizer, private confirmService: ConfirmService, private modalService: ModalService) { }

    ngOnInit(): void {
        this.uploader = new FileUploader({});
    }

    closeUploaderOverlay() {
        this.close.emit(true);
    }

    fileOver(event: any) {

    }

    onFileDrop(event: any, changeEvent = false) {
        let files = this.uploader?.queue;
        
            for (let i = 0; i < files.length; i++) {
                if (files.length !== this.index) {
                    this.fileUpload(files[this.index], this.index);
                    this.index = this.index + 1;
                }
            }   
    }

    fileUpload(item: any, index: number) {
        // console.log('upload started: ' + index)

        const fileRawData = item.file.rawFile;
        let type = '';
        // const fileRawData = item;
        if (!fileRawData.type) {
            type = CONSTANTS.CONTENT_TYPE.OFFICE;
        }
        
        this.uploadBase64Data(fileRawData,fileRawData.name, index, type);
    }

    uploadBase64Data(fileRawData: Blob,name:any, index: number, content = '') {
        let reader = new FileReader();
        reader.readAsDataURL(fileRawData);
        this.uploaded = false;
        reader.onload = () => {
            this.uploadPercent[index] = 0;

            let reqBody = {
                fileName: name,
                contentType: fileRawData.type.length === 0 ? content : fileRawData.type,
                data: (reader.result as string).split(',')[1]
            };
            this.fileName = reqBody.fileName;
            if(this.isMobile){
                this.setFileNameOnScreen();
            }
            this.service.uploadFile(reqBody)
                .subscribe((data: any) => {

                    if (data.status === 'download') { }
                    if (data.status === 'headers') { }

                    if (data.status === 'progress') {
                        this.uploadPercent[index] = data.message;
                    }

                    if (data.status === 'response') {
                        this.uploadResponse[index] = data;
                        this.uploadPercent[index] = null;

                        this.uploadResponse[index].message.documentImage = this._sanitizer
                            .sanitize(SecurityContext.URL,'data:image/jpeg;base64,' + this.uploadResponse[index].message.documentImage);
                        this.uploadResponse[index].message.description = '';
                        this.uploadingFinishedLength = this.uploadingFinishedLength + 1;
                    }

                    this.uploaded = true;
                    
                }, error => {});
        }
    }

    saveDocumentsToTransactional() {
        this.closeUploaderOverlay();
        let length = this.uploadResponse.length;
        this.uploadResponse.forEach((doc:any) => {
            doc.message.totalDocs = length
            this.uploadedFiles.emit(doc.message);
        });

        this.uploadedFiles.complete();
    }

    capture(){
        var defaultSelectText = 'Capture/Select Receipt'
        var uploadObject:any = document.getElementById("file-upload");
        uploadObject.addEventListener("change", (e:any) => {});
    }

    setFileNameOnScreen(){
        var defaultSelectText = 'Capture/Select Receipt';
        var maxLength = 20;
        var fileName = this.fileName;
        if (fileName) {
            var extension = fileName.split('.').pop();
             if (fileName.length > maxLength)
             {
                 fileName = fileName.replace('.' + extension, '');
                 var newFileName = fileName.substr(0, (maxLength/2)) + '...';
                 newFileName += fileName.substr(fileName.length - (maxLength / 2), (maxLength / 2));
                 newFileName += '.' + extension;
                 fileName = newFileName;
             }

             (document.getElementById('uploadText')  as any).innerHTML = fileName;
             (document.getElementById('uploadButton') as HTMLButtonElement).disabled = false;
         }
         else
         {
             (document.getElementById('uploadText') as any).innerHTML = defaultSelectText;
             (document.getElementById('uploadButton') as HTMLButtonElement).disabled = true;
         }
    }

    mobileUpload(){
        this.saveDocumentsToTransactional();
    }

    viewReceiptImage(){
        this.imgOverlay = true;
        this.turnOnOverLay();
    }

    turnOnOverLay(){
        (document.getElementById('myoverlay') as any).style.display = 'flex';
    }

    turnOffOverlay(){
        (document.getElementById('myoverlay') as any).style.display = 'none';
        this.imgOverlay = false;
    }
}
