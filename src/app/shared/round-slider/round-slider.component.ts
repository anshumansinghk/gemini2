import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import * as d3 from 'd3';


@Component({
    selector: 'app-round-slider',
    templateUrl: './round-slider.component.html'
})


export class RoundSliderComponent implements OnInit {
    @Input()
    width: number = 85;

    @Input()
    height: number = 85;

    @Input()
    radius: number = 32;

    @Input()
    max: number = 15000;

    @Input()
    thick: number = 10;

    @Input()
    min: number = 0;

    @Input()
    imageUrl: string = '';

    @Input()
    units: string = '%';

    @Input()
    dotRadius: number = 10;

    @Input()
    isTimer: boolean = false;

    imageSize: number = 340;
    imagePosition: number = 42;

    backgroundSize: number = 75;
    backgroundPositionTop: number = 5;
    backgroundPositionLeft: number = 5;

    private thumb: any;
    private arcForeground: any;
    private arc: any;
    private localAngleValue: number;
    private circleContainer: any;

    private _value = 0;

    private timerInterval:any;

    get value(): number {
        return this._value;
    }

    @Input()
    set value(value: number) {
        this._value = Math.round(value);
        let valueTemp = !this.isTimer ? value : this.max - value;

        this.localAngleValue = this.valueToRadians(Math.round(valueTemp));
        this.updateUI();
    }

    @Output()
    onChangeEnd: Subject<any>;

    constructor(private element: ElementRef) {

        this.localAngleValue = !this.isTimer ? 0 : this.valueToRadians(this.max);
        this._value = this.radiansToValue(Math.PI);
        this.onChangeEnd = new Subject();
    }

    ngOnInit() {
        this.generateRoundSlider();
    }

    generateRoundSlider(){
         // this.imageSize = (this.radius * 2);
        // this.imagePosition = (this.width / 2) - this.radius;
        if (window.innerWidth < 200) {
            this.width = 300;
            this.radius = 110;
            this.backgroundSize = 260;
            this.backgroundPositionTop = 57;
            this.backgroundPositionLeft = 20;
        }

        let host:any = d3.select(this.element.nativeElement);

        host = d3.selectAll('.round-slider-container');

        let drag = d3.drag()
            // .origin(function (d) { return d; })
            .on('start', this.dragStarted())
            .on('drag', this.dragged(this))
            .on('end', this.dragEnded(this));

        let svg = host.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'round-container')
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

        let container = svg.append('g');

        this.circleContainer = container.append('circle')
            .attr('r', this.radius - (this.thick / 2))
            .attr('class', 'circumference');

        let handle = [{
            x: 0,
            y: this.radius
        }];

        // this.arc = d3.arc()
        // .innerRadius(this.radius - (this.thick / 2))
        // .outerRadius(this.radius + (this.thick / 2))
        // .startAngle(Math.PI);
        this.arc = d3.arc()
            .innerRadius(this.radius)
            .outerRadius(this.radius)
            .startAngle(Math.PI);


        //console.log(Math.PI);
        let endAngle = this.isTimer ? -Math.PI : Math.PI;

        this.arcForeground = container.append('path')
            .datum({ endAngle: endAngle })
            .attr('class', 'arc')
            .attr('d', this.arc);

        this.thumb = container.append('g')
            .attr('class', 'dot')
            .selectAll('circle')
            .data(handle)
            .enter()
            .append('circle')
            .attr('r', this.dotRadius)
            .attr('cx', function (d: any) {
                //console.log(d);
                return d.x;
            })
            .attr('cy', function (d: any) {
                //console.log(d);
                return d.y;
            })
            .call(drag);

        // setTimeout(()=>{

        // console.log('call');
        // // this.value-=1;
        // this.onChangeEnd.next(this.value);
        // },100)    
    }

    secondsToTime(max:any) {

        if (!this.isTimer) {
            max = this.max - max;
        }

        if (max <= 0) {
            return "00:00";
        }

        // Hours, minutes and seconds
        var hrs = Math.floor(max / 3600);
        var mins = Math.floor((max % 3600) / 60);
        var secs = Math.floor(max % 60);

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            mins += hrs * 60; //ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;;
    }


    private dragged(instance: any) {
        return function (d: any) {
            // const coord:any = d3.mouse(this);
            // Update code
            const coord :any=  d3.select(instance).on("mouseenter mouseout", function(){});
        
            const dFromOrigin = Math.sqrt(Math.pow(coord[0], 2) + Math.pow(coord[1], 2));
            let alpha = Math.acos(coord[0] / dFromOrigin);
            alpha = coord[1] < 0 ? -alpha : alpha;

            instance.localAngleValue = alpha;
            instance._value = instance.radiansToValue(alpha);
            instance.updateUI();

            d3.select(instance)
                .attr('cx', d.x = instance.radius * Math.cos(alpha))
                .attr('cy', d.y = instance.radius * Math.sin(alpha));
        }
    }

    private dragStarted() {
        return function () {
            // d3.event.sourceEvent.stopPropagation();
            // d3.select(this)
            //     .classed('dragging', true);
        };
    }

    private updateUI() {
        if (this.localAngleValue === undefined || isNaN(this.localAngleValue)) {
            let valueTemp = !this.isTimer ? this.value : this.max;
            this.localAngleValue = this.valueToRadians(Math.round(valueTemp));
        }

        if (this._value === undefined || isNaN(this._value)) {
            this._value = 0;
        }

        if (this.imageUrl && this.circleContainer) {
            this.circleContainer.attr('class', 'circumference transparent');
        }
        const xpos = this.radius * Math.cos(this.localAngleValue);
        const ypos = this.radius * Math.sin(this.localAngleValue);

        if (this.arcForeground) {
            let arcAlpha = this.localAngleValue;
            if (this._value >= this.max && this.isTimer) {
                arcAlpha = this.localAngleValue + (Math.PI / 2);
            }
            else if (this._value == 0) {
                arcAlpha = this.localAngleValue + (Math.PI / 2) + 0.001;
            } else if (xpos <= 0 && ypos >= 0) {
                arcAlpha = this.localAngleValue + (Math.PI / 2);
            } else {
                arcAlpha = (Math.PI * 2) + this.localAngleValue + (Math.PI / 2);
            }

            this.arcForeground.attr('d', this.arc({ endAngle: arcAlpha }));
        }
    }

    private radiansToValue(radians: number): number {
        let value = radians - (Math.PI / 2);
        value = value * 180 / Math.PI;

        if (value < 0) {
            value += 360;
        }

        return Math.round(value / 360 * this.max);
    }

    private valueToRadians(value: number): number {
        let radiansValue = value * 2 * Math.PI / this.max;

        radiansValue = radiansValue + (Math.PI / 2);

        if (radiansValue > Math.PI) {
            radiansValue = -(2 * Math.PI) + radiansValue;
        }

        return radiansValue;
    }

    private dragEnded(instance: any) {
        return function () {
            // Update code
            const coord :any=  d3.select(instance).on("mouseenter mouseout", function(){});

            // const coord = d3.mouse(this);
            const radians = Math.atan2(coord[1], coord[0]);
            let value = instance.radiansToValue(radians);
            value = Math.floor(value);
            instance._value = value;
            instance.onChangeEnd.next(value);
            d3.select(instance)
                .classed('dragging', false);
        };
    }

    public startTimer() {
        clearInterval(this.timerInterval);
        // console.log('start', this.value, this.max);
        if (this.value < this.max) {
            let counter = 1;
            this.timerInterval = setInterval(() => {
                this.value += counter;
                if (this.value >= this.max) {
                    clearInterval(this.timerInterval);
                }

                this.onChangeEnd.next(this.value);
            }, 1000 * counter);
        }
    }

    public timerLast() {
        setTimeout(() => {
            this.value += 0;
        }, 10);
    }

    public pauseTimer() {
        clearInterval(this.timerInterval);
    }

    resetTimer(){
        clearInterval(this.timerInterval);
        this.value = 0;

        // To remove current design of slider.
        let host:any = d3.select(this.element.nativeElement);
        host = d3.selectAll('.round-container');
        host.remove('svg');

        // Re-generate new round slider.
        this.generateRoundSlider();
    }

    ngOnDestroy() {
        clearInterval(this.timerInterval);
    }
}

