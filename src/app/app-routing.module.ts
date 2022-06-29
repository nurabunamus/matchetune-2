import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignuppatientComponent } from './pages/signuppatient/signuppatient.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignuphealerComponent } from './pages/signuphealer/signuphealer.component';
import { HealersComponent } from './pages/healers/healers.component';
import { AboutComponent } from './pages/about/about.component';
import { Page404Component } from './pages/page404/page404.component';
import { MainComponent } from './admin/pages/main/main.component';
import { BookComponent } from './pages/book/book.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InfographicsComponent } from './pages/infographics/infographics.component';
import { BooksComponent } from './pages/books/books.component';
import { VideosComponent } from './pages/videos/videos.component';
import { PatientregisterComponent } from './pages/patientregister/patientregister.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DetailspatientComponent } from './pages/detailspatient/detailspatient.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'details',
    component: DetailspatientComponent,
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
    path: 'signup/patient/advanced',
    component: PatientregisterComponent,
  },
  {
    path: 'signup/healer',
    component: SignuphealerComponent,
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
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  // },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard],
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
    path: 'password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'verify',
    component: VerifyEmailComponent,
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
