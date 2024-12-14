import { Component,Input } from '@angular/core';

@Component({
  selector: 'ss-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss']
})
export class DarkModeComponent {
   @Input() isDarkMode: boolean = false;
 
   constructor(){
    }

   ngOnInit() {}
 
   toggleMode() {
      this.isDarkMode = !this.isDarkMode;
      const body = (document.querySelector('body') as HTMLElement);
      // (document.querySelector('body') as HTMLElement).style.filter = this.isDarkMode?'grayscale(100%)':'grayscale(0%)';
      // this.isDarkMode?body.classList.add("gray-scale"):body.classList.remove("gray-scale");
      body.classList.toggle("gray-scale");

   }
 }
