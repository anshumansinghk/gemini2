import { Component } from '@angular/core';
import { LibraryService } from './services/library.service';
import { FilterSortByData, ListData, MenuData } from './models/library';
import { SubscriptionLike } from 'rxjs';
import { ModalService } from '../shared/services/modal.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'ss-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {

  menuData:MenuData[];
  filterData:FilterSortByData[];
  sortByData:FilterSortByData[];
  LibraryList:ListData[];

  currentMenuOption:string = '';
  currentSortByOption:string;
  currentSortByOptionTitle:string = '';
  sortBtnFlag:boolean = false;
  loading: boolean = false;

  preId = history.state;

  private modalCloseSubscription!: SubscriptionLike;
  
  constructor(
    private headerService:HeaderService,private modalService: ModalService,private libraryService:LibraryService,private route:Router
  ) {
    // this.currentMenuOption = this.id;
  }
  
  ngOnInit(){

    this.headerService.setTitle('Library');
    this.getLibraryFilterMenu();
  }

  getLibraryFilterMenu(){

    this.loading = true;
    this.libraryService.getLibraryFilterMenu().subscribe(
      response =>  { 
        if(response.status_code == 200){
          this.menuData = response.data.menu
          this.filterData = response.data.filter;
          this.sortByData = response.data.sort_by;
        
          
          if(this.preId.id){
            this.currentMenuOption = this.preId.id;
          }
          else{
            this.currentMenuOption = response.data.menu ? response.data.menu[0].id : '';
          }
          this.libraryList(null,this.currentMenuOption,"")
        }
        this.loading = false;
      },
      error => { }
    )
  }

  libraryList(sortBy:string|null,menuId:string,filter:string){

    this.loading = true;
    
    this.libraryService.getLibraryList({sort_by:sortBy,menu:menuId,filter}).subscribe(
      response => {
        if(response.status_code == 200){
          this.LibraryList = response.data.list;
        }
        this.loading = false;
      },
      error => {}
    );
  }

  filter(){
    this.modalService.open(['library-filter'], {
      data: JSON.stringify(this.menuData),
      currentMenuOption : this.currentMenuOption
    });

    this.modalCloseSubscription = this.modalService.onClose.subscribe(
      (closeData) => {
        this.currentMenuOption = closeData.data.value;
        
        this.modalCloseSubscription.unsubscribe();
        this.libraryList(null,this.currentMenuOption,"")
      }
    );
  }

  onSortChange(id:string,title:string){  
    this.sortBtnFlag = !this.sortBtnFlag;
    
    this.currentSortByOption = id;
    this.currentSortByOptionTitle = title;
    this.libraryList(this.currentSortByOption,this.currentMenuOption,"");
  }

  openLibraryDetail(data:any){

    let req = {};

    if(data.type == 'homework_assignment'){
      req = {
        content_id:data.id,
        type:data.type
      };
    }else if(data.type == 'goal_planning'){
      req = {
        content_id:data.id,
        type:data.type
      };
    }
    else{
      req = {resource_id:data.id};
    }
    this.loading = true;
    this.libraryService.openLibrarayContent(req).subscribe(
      response => {
        this.loading = false;
         if(response.status_code == 200){
            let libraryData;
            if (data.type == 'homework_assignment' || data.type == 'goal_planning'){
              response.data.content['type'] = data.type;
              response.data.content['title'] = data.title;
              response.data.content['preId'] = this.currentMenuOption;
              this.route.navigate(['/library/library-detail'], {
                state: response.data.content
              });
            }
            else{
              if(response.data.cotnent.length > 0){ 
                // response.data.content[0]['preId'] = this.currentMenuOption;
                libraryData = response.data.cotnent[0];
                libraryData.preId = this.currentMenuOption
                if(libraryData['type'] == 'WEBSITE' || libraryData['type'] == 'ARTICLE'){
                  if(libraryData['url']){
                    window.open(libraryData['url'], '_blank');
                  }
                }
                else{
                  // libraryData['preId'] = this.currentMenuOption;
                  this.route.navigate(['/library/library-detail'],{
                    state:libraryData
                  });
                }
              }
            }
         }
      },
      error => {
        this.loading = false;
      }
    );
  }

  addFavourate(event:any,id:string){
    event.stopPropagation();
    this.libraryService.addFavourate({'resource_id':id}).subscribe(
      response=>{
        if(response.status_code == 200){
          this.libraryList(this.currentSortByOption,this.currentMenuOption,"")
        }
      },
      error=>{}
    )
  }

  openMenu(id:string){
    this.currentMenuOption = id;
    this.libraryList(null,id,"")
  }

  toggleSortBtn(){
    this.sortBtnFlag = !this.sortBtnFlag;
  }

  getLibraryDetailId(list: any): any {
    if (list.id) {
      return {id:list.id,type:list.type,title:list.title};
    } 
    if (list.goal_planning_id) {
      return {id:list.goal_planning_id,type:list.type,title:list.title};
    } 
    if (list.session_number) {
      return {id:list.homework_assignment_id,type:list.type,title:list.title};
    }
    return '';
  }
}
