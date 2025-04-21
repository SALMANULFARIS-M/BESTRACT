import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/user/header/header.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
