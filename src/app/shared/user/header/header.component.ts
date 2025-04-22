import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { headerReveal, menuSlide, slideInOutPanel } from "../../constants/animation";


@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [menuSlide, slideInOutPanel, headerReveal]
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  animationDone = false;

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/courses', label: 'Courses' },
    { path: '/workshop', label: 'Workshops' },
    { path: '/contact', label: 'Contact' }
  ];
  constructor(private router: Router) { }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onHeaderRevealDone() {
    this.animationDone = true;
  }
  openRegisterModal() {
    this.router.navigate(['/register']);
  }
}
