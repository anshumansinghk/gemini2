import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[magnifyImage]',
})
export class MagnifyLensDirective {
    @Input('imgId') imgId: string;
    @Input('lensClass') lensClass: string = "img-zoom-lens";
    @Input('resultId') resultId: string;
    @Input('index') index: number;
    @Output('zoomFlagEmitter') zoomFlagEmitter = new EventEmitter<boolean>();

    zooomFlag: boolean = false;
    constructor(){}

    @HostListener('mouseenter') onMouseEnter() {
        this.zooomFlag = true;
        this.zoomFlagEmitter.emit(this.zooomFlag);
        let img, lens, result, cx, cy;
        let imageId;
        var me = this;

        if(this.zooomFlag){
            if(this.index !== null && this.index !== undefined){
                imageId = this.imgId+this.index;
            } else {
                imageId = this.imgId;
            }
            img = document.getElementById(imageId);

            // insert lens
            result = document.getElementById(this.resultId);

            // create lens
            lens = document.createElement("DIV");
            lens.setAttribute("class", this.lensClass);
            lens.setAttribute("id", "zoomLens");
            img.parentElement.insertBefore(lens, img);

            setTimeout(function () { setupZoom() }, 1);
        }

        function setupZoom() {
            if (me.zooomFlag == false) { return };

            if (result.offsetHeight == 0) {
                setTimeout(function () { setupZoom() }, 10);
                return;
            }

            // calculate the ratio between the result div and lens
             cx = result.offsetWidth / lens.offsetWidth;
             cy = result.offsetHeight / lens.offsetHeight;


            //cx = 13.7; cy= 9.8;

            // set background properties for the result DIV
            result.style.backgroundImage = "url('" + img.src + "')";
            result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

            lens.addEventListener("mousemove", moveLens);
            img.addEventListener("mousemove", moveLens);
            /*and also for touch screens:*/
            lens.addEventListener("touchmove", moveLens);
            img.addEventListener("touchmove", moveLens);
        }


        function moveLens(e) {
            var pos, x, y;
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/
            pos = getCursorPos(e);
            /*calculate the position of the lens:*/
            x = pos.x - (lens.offsetWidth / 2);
            y = pos.y - (lens.offsetHeight / 2);

            /*prevent the lens from being positioned outside the image:*/
            if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
            if (x < 0) { x = 0; }
            if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
            if (y < 0) { y = 0; }

            /*set the position of the lens:*/
            lens.style.left = x + "px";
            lens.style.top = y + "px";
            /*display what the lens "sees":*/
            result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
          }

          function getCursorPos(e) {
            var a, x = 0, y = 0;
            e = e || window.event;
            /*get the x and y positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
          }
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.zooomFlag = false;
        this.zoomFlagEmitter.emit(this.zooomFlag);
        var element = document.getElementById("zoomLens");
        if(element){
            element.parentNode.removeChild(element);
        }
    }
}
