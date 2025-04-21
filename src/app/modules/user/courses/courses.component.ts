import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/user/header/header.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-courses',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

}
