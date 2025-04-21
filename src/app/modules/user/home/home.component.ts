import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../../shared/user/header/header.component';
import { heroAnimations, zoomSlide } from '../../../shared/constants/animation';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [heroAnimations,zoomSlide]
})
export class HomeComponent implements OnInit {
  isAnimating = true;
  images = [
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_rG87FS0RX7rSpvj6NW_IDQ90ILO6bTlimee7U_i8PNC3PCIwhg_x-vRr1UpNchYA0Rw&usqp=CAU' },
    { src: 'https://imageio.forbes.com/specials-images/imageserve/673b3fa4d94f770224891222/Happy-young-business-team-planning-strategy-while-working-at-the-modern-office/960x0.jpg?format=jpg&width=960' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScfg59uzk0KQDzivZmiz2QG1TzlxpvPRchagcbnXxCViDUT-yrJzL2nYBzjPQl_t_YPdQ&usqp=CAU' },
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQlkHP-7jX7AWalr78k_JcHAip9bgVM0GFLpQiO_1RVHYLD-xmnd43YeS1TRBNauueXM&usqp=CAU' }
  ];

  animationState: string[] = [];
  private currentIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }
  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      // Initialize all images to 'out' state except first
      this.animationState = this.images.map((_, i) => i === 0 ? 'in' : 'out');
      // Start the slideshow
      this.startSlideshow();
    }
  }

  startSlideshow() {
    setInterval(() => {
      // Transition current image out
      this.animationState[this.currentIndex] = 'out';

      // Move to next image (with wrap-around)
      this.currentIndex = (this.currentIndex + 1) % this.images.length;

      // Transition next image in
      this.animationState[this.currentIndex] = 'in';
    }, 8000); // 8 seconds total (7s zoom + 1s fade)
  }
  onAnimationDone() {
    this.isAnimating = false;
  }
}

