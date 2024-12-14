import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
 
@Directive({
  selector: '[ssHorizontalViewScroll]'
})
export class HorizontalScrollViewDirective {
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
 
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'overflow-x', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, '-webkit-overflow-scrolling', 'touch'); // Smooth scrolling for iOS
  }
 
  // Mouse Events
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault(); // Prevent default to avoid text selection
    this.isDown = true;
    const slider = this.el.nativeElement;
    this.startX = event.pageX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;
    this.renderer.addClass(slider, 'h-scroll-active');
    this.disableTextSelection();
  }
 
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const slider = this.el.nativeElement;
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - this.startX) * 1; // Adjust scroll speed
    slider.scrollLeft = this.scrollLeft - walk;
  }
 
  @HostListener('mouseup')
  onMouseUp() {
    this.isDown = false;
    const slider = this.el.nativeElement;
    this.renderer.removeClass(slider, 'h-scroll-active');
    this.enableTextSelection();
  }
 
  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDown = false;
    const slider = this.el.nativeElement;
    this.renderer.removeClass(slider, 'h-scroll-active');
    this.enableTextSelection();
  }
 
  // Touch Events
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.isDown = true;
    const slider = this.el.nativeElement;
    this.startX = event.touches[0].pageX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;
    this.renderer.addClass(slider, 'h-scroll-active');
    this.disableTextSelection();
  }
 
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const slider = this.el.nativeElement;
    const x = event.touches[0].pageX - slider.offsetLeft;
    const walk = (x - this.startX) * 1; // Adjust scroll speed
    slider.scrollLeft = this.scrollLeft - walk;
  }
 
  @HostListener('touchend')
  onTouchEnd() {
    this.isDown = false;
    const slider = this.el.nativeElement;
    this.renderer.removeClass(slider, 'h-scroll-active');
    this.enableTextSelection();
  }
 
  private disableTextSelection() {
    this.renderer.setStyle(document.body, 'user-select', 'none'); // Disable text selection
    this.renderer.setStyle(document.body, '-webkit-user-select', 'none');
  }
 
  private enableTextSelection() {
    this.renderer.removeStyle(document.body, 'user-select'); // Enable text selection
    this.renderer.removeStyle(document.body, '-webkit-user-select');
  }
}
 