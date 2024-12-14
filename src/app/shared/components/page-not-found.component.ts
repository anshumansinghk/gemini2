import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ss-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {

  @Input() pageNotFoundMessage:string="Unauthorized: Access is denied due to invalid credentials.";
  @Input() pageNotFoundImageName:string="cross.svg"; //cross.svg,no_page_found.svg
  constructor() { }

  ngOnInit(): void {
  }

}
