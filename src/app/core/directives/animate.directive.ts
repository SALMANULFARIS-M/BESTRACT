import { Directive, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAnimate]'
})
export class AnimateDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  @HostBinding('class.animate') isVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
