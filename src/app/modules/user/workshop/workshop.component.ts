import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/user/header/header.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-workshop',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.css'
})
export class WorkshopComponent {

}
