import { Routes } from '@angular/router';
import {HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { CoursesComponent } from './courses/courses.component';
import { RegisterComponent } from './register/register.component';



export const USER_ROUTES: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage', routeIdx: 0 } },
  { path: 'about', component: AboutComponent, data: { animation: 'AboutPage', routeIdx: 1 } },
  { path: 'courses', component: CoursesComponent, data: { animation: 'CoursesPage', routeIdx: 2 } },
  { path: 'workshop', component: WorkshopComponent, data: { animation: 'WorkshopPage', routeIdx: 3 } },
  { path: 'contact', component: ContactComponent, data: { animation: 'ContactPage', routeIdx: 4 } },
  { path: 'register', component: RegisterComponent,data: { animation: 'RegisterComponent', routeIdx: 5 } },

];

