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
  logosPerPage = 4;
  currentLogo = 0;
  logosIntervalId: any;
  visibleLogos: any[] = [];
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
    { name: 'Flyrad', imageUrl: 'https://www.flyrad.in/assets/Flyradnewlogochanges3-BITTFNPt.svg' },
    { name: 'Kovai', imageUrl: 'https://www.kovairawutherbiriyani.com/assets/KovaiLogo2-Db-ZaG1Z.svg' },
    { name: 'Careercafe', imageUrl: 'https://res.cloudinary.com/dwfurekw0/image/upload/v1745667202/Careercafe._logo_isoscw.png' },
    { name: 'Ceo Square', imageUrl: 'https://res.cloudinary.com/dwfurekw0/image/upload/v1745667194/CEO_Square_Logo_a_avfefg.png' },

  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }
  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      // Initialize all images to 'out' state except first
      this.animationState = this.images.map((_, i) => i === 0 ? 'in' : 'out');
      this.startSlideshow();

      // Initial setup for mobile and desktop
      this.setLogosPerPage();
      this.updateVisibleLogos();
      this.startAutoRotation();

      // Update on window resize
      window.addEventListener('resize', () => {
        this.setLogosPerPage();
        this.updateVisibleLogos();
      });
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

  setLogosPerPage() {
    // For mobile (default): show 4 logos total (2x2)
    // For md+: show 8 logos total (4x2)
    const width = window.innerWidth;
    this.logosPerPage = width >= 768 ? 8 : 4;
  }

  updateVisibleLogos() {
    // Get the current set of logos to display
    const endIndex = this.currentLogo + this.logosPerPage;
    this.visibleLogos = this.logos.slice(this.currentLogo, endIndex);

    // If we're at the end, loop back to the beginning
    if (this.currentLogo >= this.logos.length) {
      this.currentLogo = 0;
      this.visibleLogos = this.logos.slice(0, this.logosPerPage);
    }

    // If we don't have enough logos to fill the page, add from beginning
    if (this.visibleLogos.length < this.logosPerPage) {
      const remaining = this.logosPerPage - this.visibleLogos.length;
      this.visibleLogos = [...this.visibleLogos, ...this.logos.slice(0, remaining)];
    }
  }

  nextLogos() {
    this.currentLogo += this.logosPerPage;
    if (this.currentLogo >= this.logos.length) {
      this.currentLogo = 0;
    }
    this.updateVisibleLogos();
  }

  startAutoRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.nextLogos();
    }, 3500); // Rotate every 3.5 seconds
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (isPlatformBrowser(this.platformId)) {

    window.removeEventListener('resize', () => {});
  }
  }
  // removeBlur(event: Event) {
  //   const imgElement = event.target as HTMLImageElement;
  //   imgElement.classList.remove('blur-sm');
  // }

}

