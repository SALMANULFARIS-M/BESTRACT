import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../../shared/user/header/header.component';
import { heroAnimations, zoomSlide } from '../../../shared/constants/animation';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../../../shared/user/footer/footer.component';
import { AnimationEvent } from '@angular/animations';

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
    { src: 'https://imageio.forbes.com/specials-images/imageserve/673b3fa4d94f770224891222/Happy-young-business-team-planning-strategy-while-working-at-the-modern-office/960x0.jpg?format=jpg&width=960' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/The_Brave_People_of_Ukraine_-_2022_Sakharov_Prize_laureate_-_52567217363.jpg/1280px-The_Brave_People_of_Ukraine_-_2022_Sakharov_Prize_laureate_-_52567217363.jpg' },
    { src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg' },
    { src: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?cs=srgb&dl=pexels-jopwell-2422290.jpg&fm=jpg' },
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
    }, 6000); // 6 seconds total (5s zoom + 1s fade)
  }
  onAnimationDone() {
    this.isAnimating = false;
  }
}

 