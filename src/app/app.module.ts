import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { CoreModule } from './core/core.module';

/* Feature Modules */
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClassModule } from './class/class.module';
import { CheckinModule } from './checkin/checkin.module';
import { LibraryModule } from './library/library.module';
import { MoreModule } from './more/more.module';
import { AuthModule } from './auth/auth.module';
import { AudioVideoPracticeModule } from './audio-video-practice/audio-video-practice.module';

import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header/header.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { MessageModule } from './message/message.module';
import { ProgressModule } from './progress/progress.module';
import { CompanionModule } from './companion/companion.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    DashboardModule,
    ClassModule,
    CheckinModule,
    LibraryModule,
    MoreModule,
    MessageModule,
    ProgressModule,
    AudioVideoPracticeModule,
    CompanionModule,

    AuthModule,
    SharedModule.forRoot()
  ],
  providers: [CookieService,HeaderService,BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
