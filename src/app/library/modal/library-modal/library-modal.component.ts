import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuData } from 'src/app/library/models/library';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'ss-library-modal',
  templateUrl: './library-modal.component.html',
})
export class LibraryModalComponent {
  loading:boolean=true;
  lesson_id:number=0;
  menuData:MenuData[];
  selectedOption = '';

constructor(private route:ActivatedRoute,private modalService:ModalService){
}

ngOnInit(): void {
  this.menuData = JSON.parse(this.route.snapshot.queryParams.data);
  this.selectedOption = this.route.snapshot.queryParams.currentMenuOption;
  
  this.lesson_id = this.route.snapshot.queryParams.lesson_id;
  this.loading=false;
}

routeToLesson(){
  if(this.lesson_id == 0){
    this.closeModal({name:"journey",value:true})
  } else {
    this.closeModal({name:"filterOption",value:this.selectedOption})
  }
}

clearOption(){
  this.closeModal({name:"filterOption",value:this.menuData[0].id})
}

closeModal(value: any) {
  this.modalService.close(value);
}

cancel(){
  this.modalService.close();
}
}
