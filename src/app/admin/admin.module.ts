import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AddbooksComponent } from './components/books/addbooks/addbooks.component';
import { MainComponent } from './pages/main/main.component';
import { FormsModule } from '@angular/forms';
import { VideosComponent } from './pages/videos/videos.component';
import { BooksComponent } from './pages/books/books.component';
import { InfographicsComponent } from './pages/infographics/infographics.component';
import { MaterialModule } from '../ui.module';
import { SubscribersComponent } from './pages/subscribers/subscribers.component';
import { UsersComponent } from './pages/users/users.component';
import { HealersComponent } from './pages/healers/healers.component';
import { EditComponent } from './components/books/edit/edit.component';
import { AddInfographicsComponent } from './components/infographics/add-infographics/add-infographics.component';
import { EditInfogrphicsComponent } from './components/infographics/edit-infogrphics/edit-infogrphics.component';
import { AddvideoComponent } from './components/videos/addvideo/addvideo.component';
import { EditvideoComponent } from './components/videos/editvideo/editvideo.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    NavComponent,
    LoginComponent,
    HomeComponent,
    AddbooksComponent,
    MainComponent,
    VideosComponent,
    BooksComponent,
    InfographicsComponent,
    SubscribersComponent,
    UsersComponent,
    HealersComponent,
    EditComponent,
    AddInfographicsComponent,
    EditInfogrphicsComponent,
    AddvideoComponent,
    EditvideoComponent,
    DropdownComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, MaterialModule],
})
export class AdminModule {}
