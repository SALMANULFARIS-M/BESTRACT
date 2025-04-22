import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/user/header/header.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  categories = ['online', 'offline', 'demo'];
  courseOptions: { [key: string]: string[] } = {
    online: [
      'Digital Marketing - 2 Month Online',
      'Communication Management - 3 Month Online',
    ],
    offline: [
      'Branding & Marketing - 2 Month Offline',
      'Corporate Communication - 4 Week Workshop',
    ],
    demo: [
      'Free Demo - Digital Marketing',
      'Free Demo - Communication & Soft Skills',
    ],
  };
  availableCourses: string[] = [];

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      category: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value || '';
    if (value) {
      this.availableCourses = this.courseOptions[value] || [];
      this.registrationForm.get('course')?.reset();    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      // TODO: send to backend
    }
  }
}
