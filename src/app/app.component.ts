import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './shared/constants/animation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeAnimations]
})
export class AppComponent {
  title = 'BESTRACT';
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }

}
