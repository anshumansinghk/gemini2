import { Component, Input, OnInit } from '@angular/core';
// import { ToolService } from '../../../tool/tool.service';
import { SeValidators, AlertService } from '../../index';
import { Router } from '@angular/router';
// import { CoursePageResponse } from 'src/app/tool/model/tool.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-mi-accordion',
	templateUrl: './mi-accordion.component.html',
	styleUrls: ['./mi-accordion.component.scss']
})

export class MiAccordionComponent implements OnInit {          
	loading:boolean=false;

	pages: any = {
		'3_ITEMS': 'three-item',
		'2_ITEMS': 'two-item',
		'1_ITEMS': 'one-item',
	};
	@Input() previous_module_detail: any;
	@Input() faq_detail: any;

	isMenuOpen = null;
	constructor(private router: Router, 
		private toolService: ToolService, 
		private alerter: AlertService,
		private translate: TranslateService) { }

	ngOnInit() {
	}

	/**
	 * Allows the accordion state to be toggled (I.e. opened/closed)
	 * @public
	 * @method toggleAccordion
	 * @returns {none}
	 */


	// open close accordion
	toggleAccordion(group: any) {
		if (this.isGroupShown(group)) {
			this.isMenuOpen = null;
		} else {
			this.isMenuOpen = group;
		}
	}


	// check for current community
	isGroupShown(group: any) {
		return this.isMenuOpen === group;
	};

	// redirect to detail page
	// seeDetail(exercise_module_info_id: string) {
	// 	this.router.navigate(["/tool/page-detail/" + exercise_module_info_id]);
	// }



	   
	// getPage(module_section_id:string, module_info_id:string, tool_ex_wk_info_id:any = null, page_id:any = null, template_type:boolean = false) {	
  //   this.toolService.getPagesData({ lesson_id: module_section_id, page_id: page_id, type: 'EXERCISE' }).subscribe((response:CoursePageResponse) => 
  //   {
  //     if(response.status)
  //     {
  //       if (response.data.result!=null) 
  //       {
          
	// 		let pageType:any = template_type;
	// 		if (this.pages.hasOwnProperty(pageType)) {
	// 			if (tool_ex_wk_info_id != null) {
	// 				this.router.navigate(["/tool/" + this.pages[pageType] + "/" + module_section_id + "/" + page_id + '/' + module_info_id + '/' + tool_ex_wk_info_id]);
	// 			} else {
	// 				this.router.navigate(["/tool/" + this.pages[pageType] + "/" + module_section_id + "/" + page_id + '/' + module_info_id]);
	// 			}

	// 		}
  //       } 
  //       else 
  //       {
  //         this.loading=false;
  //         this.alerter.showError(this.translate.instant('tool.noToolPageFound'), true,true,false);
  //       }
  //     }
  //     else
  //     {
  //       this.loading=false;
  //       this.alerter.showError(response.message, true,true,false);
  //     }
      
  //   },
  //   err => {
  //       this.loading = false;
  //   });
	// }

}
