import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appTabTracker]',
  exportAs: 'appTabTracker' 
})
export class TabTrackerDirective implements AfterViewInit {
  private tabsName: string[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const tabs = this.el.nativeElement.querySelectorAll('.nav-link');

      const saveTab = (event: Event) => {
        const anchor = (event.target as HTMLElement).getAttribute('href');
        if (anchor) {
          this.tabsName.push(anchor);
          localStorage.setItem('tabs', JSON.stringify(this.tabsName));
        }
      };

      tabs.forEach((tab: Element) => {
        this.renderer.listen(tab, 'click', saveTab);
      });

    }, 1200); //1200 = 1.2 second
  }

  moveToTab(): void {
    setTimeout(() => {
        const openTabs = JSON.parse(localStorage.getItem('tabs') || '[]').reverse();
        let currentTabs:Array<any>=[]; let stopTo=false;
        openTabs.forEach((tab: string) => {
          const targetTab = document.querySelector(`a[href="${tab}"]`) as HTMLElement;
          if (targetTab && !stopTo) {
            currentTabs.push(tab);
            stopTo=true;
            targetTab.click();

          }
        });
        localStorage.setItem('tabs', JSON.stringify(currentTabs));
     }, 600); //600 = 0.6 second

  }
}