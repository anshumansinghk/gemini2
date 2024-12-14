import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CONSTANTS } from './core/models';

import { AuthGuard, PublicGuard,CompanionGuard } from './core/guards/index';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { IntroComponent } from './intro/intro.component';

// canActivate:[AuthGuard]
const routes: Routes = [
      { path:'' , canActivate:[AuthGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path:'intro',canActivate:[PublicGuard], component:IntroComponent},
      { path:'auth', canActivate:[PublicGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
      { path:'class', canActivate:[AuthGuard], loadChildren: () => import('./class/class.module').then(m => m.ClassModule)},
      { path:'checkin', canActivate:[AuthGuard], loadChildren: () => import('./checkin/checkin.module').then(m => m.CheckinModule)},
      { path:'library', canActivate:[AuthGuard], loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)},
      { path:'more', canActivate:[AuthGuard], loadChildren: () => import('./more/more.module').then(m => m.MoreModule)},
      { path: 'message',canActivate:[AuthGuard], loadChildren: () => import('./message/message.module').then(m => m.MessageModule) },
      { path:'journal', canActivate:[AuthGuard], loadChildren: () => import('./journal/journal.module').then(m => m.JournalModule)},
      { path:'writtenpractice', canActivate:[AuthGuard], loadChildren: () => import('./writtenpractice/writtenpractice.module').then(m => m.WrittenpracticeModule)},
      {
        path : 'audio-video-practice', canActivate:[AuthGuard], loadChildren: () => import('./audio-video-practice/audio-video-practice.module').then(m=>m.AudioVideoPracticeModule)
      },
      {
        path : 'companion', canActivate:[CompanionGuard], loadChildren: () => import('./companion/companion.module').then(m=>m.CompanionModule)
      },
      { path:'community', canActivate:[AuthGuard], loadChildren: () => import('./community/community.module').then(m => m.CommunityModule)},
     
      { path: '**' ,component: PageNotFoundComponent},
      { path: 'Invalid',component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
