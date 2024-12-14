import { Component } from '@angular/core';
import { ModalService } from 'src/app/shared';

@Component({
  selector: 'ss-skip-modal',
  templateUrl: './skip-modal.component.html',
  styleUrls: ['./skip-modal.component.scss']
})
export class SkipModalComponent {
  constructor(private modalService:ModalService){
  }
  
  
  closeType(type:any){
    this.closeModal(type)
  }
  
  closeModal(value: any) {
    this.modalService.close(value);
  }
  
  cancel(){
    this.modalService.close();
  }
}
