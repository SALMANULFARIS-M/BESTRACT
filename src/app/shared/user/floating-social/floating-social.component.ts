import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-social',
  imports: [CommonModule],
  templateUrl: './floating-social.component.html',
  styleUrl: './floating-social.component.css'
})
export class FloatingSocialComponent {
  isOpen = true;

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
