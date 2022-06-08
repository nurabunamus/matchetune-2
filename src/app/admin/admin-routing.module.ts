import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { HealersComponent } from './pages/healers/healers.component';
import { HomeComponent } from './pages/home/home.component';
import { InfographicsComponent } from './pages/infographics/infographics.component';
import { LoginComponent } from './pages/login/login.component';
import { SubscribersComponent } from './pages/subscribers/subscribers.component';
import { UsersComponent } from './pages/users/users.component';
import { VideosComponent } from './pages/videos/videos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'healers',
    component: HealersComponent,
  },
  {
    path: 'videos',
    component: VideosComponent,
  },

  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'infographics',
    component: InfographicsComponent,
  },
  {
    path: 'subscribers',
    component: SubscribersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
