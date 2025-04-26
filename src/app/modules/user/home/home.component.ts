import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../../shared/user/header/header.component';
import { heroAnimations, zoomSlide } from '../../../shared/constants/animation';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../../../shared/user/footer/footer.component';
import { FloatingSocialComponent } from '../../../shared/user/floating-social/floating-social.component';
import { PartnerLogo } from '../../../shared/constants/logo.interface';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, CommonModule, FloatingSocialComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [heroAnimations, zoomSlide]
})
export class HomeComponent implements OnInit, OnDestroy {
  isAnimating = true;
  images = [
    { src: 'https://imageio.forbes.com/specials-images/imageserve/673b3fa4d94f770224891222/Happy-young-business-team-planning-strategy-while-working-at-the-modern-office/960x0.jpg?format=jpg&width=960' },
    { src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg' },
    { src: 'https://images.pexels.com/photos/8761345/pexels-photo-8761345.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8761345.jpg&fm=jpg' },
    { src: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?cs=srgb&dl=pexels-bertellifotografia-2608517.jpg&fm=jpg' },
  ];
  animationState: string[] = [];
  private currentIndex = 0;
  visibleLogos: any[] = [];
  currentLogo = 0;
  intervalId: any;

  logos: PartnerLogo[] = [
    { name: 'Castle', imageUrl: 'https://bestract.com/user/partners/Castle.png' },
    { name: 'IZee Bschool', imageUrl: 'https://bestract.com/user/partners/IZee%20Bschool%20Logo.png' },
    { name: 'Iaeknir2', imageUrl: 'https://bestract.com/user/partners/Iaeknir2.jpg' },
    { name: 'Lulu', imageUrl: 'https://bestract.com/user/partners/Lulu.png' },
    { name: 'Mibo', imageUrl: 'https://bestract.com/user/partners/Mibo%20-%20Logo.png' },
    { name: 'Nahadhi Mandhi', imageUrl: 'https://bestract.com/user/partners/NahadhiMandhi.jpg' },
    { name: 'OFCJNS', imageUrl: 'https://bestract.com/user/partners/OFCJNS.jpg' },
    { name: 'Study in Bengaluru', imageUrl: 'https://studyinbengaluru.com/sib-violet.png' },
    { name: 'Soofi Mandhi', imageUrl: 'https://bestract.com/user/partners/SoofiMandhi.jpg' },
    { name: 'Subz', imageUrl: 'https://bestract.com/user/partners/Subz.png' },
    { name: 'Team Lease', imageUrl: 'https://d3isa0ssinyrxx.cloudfront.net/teamlease-content/2020/09/01/TeamleaseLogo_1598946933-1598946934-53943.jpeg' },
    { name: 'First Source', imageUrl: 'https://www.firstsource.com/themes/custom/first_source/images/Firstsource-logo.svg' },

  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }
  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      // Initialize all images to 'out' state except first
      this.animationState = this.images.map((_, i) => i === 0 ? 'in' : 'out');
      // Start the slideshow
      this.startSlideshow();
      this.updateVisibleLogos();
      this.intervalId = setInterval(() => {
        this.nextLogos();
      }, 3000);
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

  updateVisibleLogos() {
    this.visibleLogos = this.logos.slice(this.currentLogo, this.currentLogo + 4);
  }

  nextLogos() {
    this.currentLogo += 4;
    if (this.currentLogo >= this.logos.length) {
      this.currentLogo = 0;
    }
    this.updateVisibleLogos();
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}

