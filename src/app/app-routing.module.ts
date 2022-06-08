import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignuppatientComponent } from './pages/signuppatient/signuppatient.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AlternativesComponent } from './pages/alternatives/alternatives.component';
import { SignuphealerComponent } from './pages/signuphealer/signuphealer.component';
import { HealersComponent } from './pages/healers/healers.component';
import { AboutComponent } from './pages/about/about.component';
import { Page404Component } from './pages/page404/page404.component';
import { MainComponent } from './admin/pages/main/main.component';
import { BookComponent } from './pages/book/book.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilehealerComponent } from './pages/profilehealer/profilehealer.component';
import { ProfilepatientComponent } from './pages/profilepatient/profilepatient.component';
import { VideoComponent } from './pages/video/video.component';
import { InfographicsComponent } from './pages/infographics/infographics.component';
import { BooksComponent } from './pages/books/books.component';
import { VideosComponent } from './pages/videos/videos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: MainComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup/patient',
    component: SignuppatientComponent,
  },
  {
    path: 'signup/healer',
    component: SignuphealerComponent,
  },
  {
    path: 'alternatives',
    component: AlternativesComponent,
  },
  {
    path: 'healers',
    component: HealersComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'book',
    component: BookComponent,
  },
  {
    path: 'book/:id',
    component: BookComponent,
  },
  {
    path: 'video/:id',
    component: VideoComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },

  {
    path: 'healer/:id',
    component: ProfilehealerComponent,
  },
  {
    path: 'infographics',
    component: InfographicsComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'videos',
    component: VideosComponent,
  },

  {
    path: 'patient/:id',
    component: ProfilepatientComponent,
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
