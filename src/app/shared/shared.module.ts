/**************************************************************************
*  Revision History:
*
**************************************************************************/


import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TranslateModule } from "@ngx-translate/core";
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


// import { MaterialModule } from './material/material.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FileUploadModule } from "ng2-file-upload";
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SsDateComponent } from './components/ss-date.component';
import { SsCodeDropListFormatDisplayPipe } from './pipes/ss-code-format-display.pipe';
import { DateAsAgoPipe } from './pipes/date-as-ago.pipe'
import { KeyPipe } from './pipes/key.pipe'
import { DurationUTCPipe } from './pipes/durationUTC.pipe'
import { LoadingComponent } from './components/loading.component';
import { SsPagerComponent } from './components/ss-pager.component';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { FormErrorsComponent } from './components/form-errors.component';
import { UploaderComponent } from './components/uploader-component/uploader.component';
import { SsNumberComponent } from './components/ss-number.component';
import { SteppedProgress } from './components/stepped-progress/stepped-progress.component';
import { ModalComponent } from './components/modal/modal.component';
import { CollapsibleComponent } from './components/collapsible.component';
import { SsCodeDropList } from './components/ss-code-droplist.component';
import { SortModule } from './sort/sort.module';
import { AlertComponent } from './alert/alert.component';
import { FilterModule } from './filter/filter.module';


import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';

// import { MiAccordionComponent } from '../shared/widgets/mi-accordion/mi-accordion.component';
import { RoundSliderComponent } from './round-slider/round-slider.component';


//Import Pipe
import { IsoDatePipe } from './pipes/isoDate.pipe';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { MaskDirective } from './directives/mask.directive';
import { TabTrackerDirective } from './directives/tab-tracker.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { FillArrPipe } from './pipes/fillArr.pipe';
import { PluralPipe } from './pipes/plural.pipe';
import { SubstitutePipe } from './pipes/substitute.pipe';
import { SiteSettingPipe } from './pipes/site-setting.pipe';
import { DarkModeComponent } from './components/dark-mode/dark-mode.component';
import { LibraryService } from '../library/services/library.service';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { VgAudioVideoPlayerComponent } from './components/vg-audio-video-player/vg-audio-video-player.component';
//Derictive
import { HorizontalScrollDirective } from './pipes/scrollMouse.pipe'


import { HorizontalScrollViewDirective } from './directives/horizontal-scroll.directive';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        ScrollToModule.forRoot(),
        BsDatepickerModule.forRoot(),
        AngularMultiSelectModule,
        FormsModule,
        FileUploadModule,
        PopoverModule.forRoot(),
        BootstrapModule,
        SortModule,
        FilterModule,
        FormsModule,
        VgCoreModule,
        VgControlsModule,
        // YouTubePlayerModule,
        NgxYoutubePlayerModule,
        NgCircleProgressModule.forRoot({
        // set defaults here
          // radius: 100,
          // outerStrokeWidth: 16,
          // innerStrokeWidth: 8,
          // outerStrokeColor: "#78C000",
          // innerStrokeColor: "#C7E596",
          // animationDuration: 300,
        }),
    ],
    declarations: [
        PageNotFoundComponent,
        SsDateComponent,
        SsCodeDropListFormatDisplayPipe,
        DateAsAgoPipe,
        KeyPipe,
        DurationUTCPipe,
        LoadingComponent,
        SsPagerComponent,
        FormErrorsComponent,
        UploaderComponent,
        SsNumberComponent,
        SteppedProgress,
        ModalComponent,
        CollapsibleComponent,
        SsCodeDropList,
        AlertComponent,
        // ModalAlertComponent,
        IsoDatePipe,
        SafeHtmlPipe,
        FillArrPipe,
        MaskDirective,
        TooltipDirective,
        TabTrackerDirective,
        PluralPipe,
        SubstitutePipe,
        SiteSettingPipe,
        // MiAccordionComponent,
        RoundSliderComponent,
        DarkModeComponent,
        VgAudioVideoPlayerComponent,
        HorizontalScrollViewDirective
    ],
    exports: [
        FormsModule,
        HorizontalScrollViewDirective,
        ReactiveFormsModule,
        TranslateModule,
        ScrollToModule,
        SsDateComponent,
        SsCodeDropListFormatDisplayPipe,
        DateAsAgoPipe,
        KeyPipe,
        DurationUTCPipe,
        LoadingComponent,
        SsPagerComponent,
        BootstrapModule,
        FormErrorsComponent,
        UploaderComponent,
        SsNumberComponent,
        SteppedProgress,
        ModalComponent,
        CollapsibleComponent,
        SsCodeDropList,
        SortModule,
        AlertComponent,
        // ModalAlertComponent,
        FilterModule,
        IsoDatePipe,
        SafeHtmlPipe,
        FillArrPipe,
        PageNotFoundComponent,
        MaskDirective,
        TooltipDirective,
        TabTrackerDirective,
        PluralPipe,
        SubstitutePipe,
        SiteSettingPipe,
        // MiAccordionComponent,
        RoundSliderComponent,
        DarkModeComponent,
        VgAudioVideoPlayerComponent,
	NgCircleProgressModule
    ],
    providers: [
        DatePipe,
        DecimalPipe,
        IsoDatePipe,
        SafeHtmlPipe,LibraryService
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule
        };
    }
}
