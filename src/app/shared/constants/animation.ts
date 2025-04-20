import {
  trigger,
  style,
  transition,
  animate,
  query,
  stagger,
  group,
  state
} from '@angular/animations';

export const menuSlide = trigger('menuSlide', [
  transition(':enter', [
    query(
      '.menu-item',
      [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        stagger(100, [
          animate(
            '400ms ease-out',
            style({ transform: 'translateX(0)', opacity: 1 })
          )
        ])
      ],
      { optional: true } // Prevent errors if no elements are found
    )
  ])
]);

export const slideInOutPanel = trigger('slideInOutPanel', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('300ms ease-out', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
  ])
]);

export const headerReveal = trigger('headerReveal', [
  transition(':enter', [
    // Slide down the header
    style({ transform: 'translateY(-100%)' }),
    animate('400ms ease-out', style({ transform: 'translateY(0)' })),

    // Set initial styles to header items
    query('.header-item',
      style({ transform: 'translateY(-20px)', opacity: 0 }),
      { optional: true }
    ),

    // Animate header items with stagger
    query('.header-item',
      stagger('150ms', [
        animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      { optional: true }
    )
  ]),

  // On leave, keep opacity 1 (avoids flicker if reused)
  transition(':leave', [
    animate(0, style({ opacity: 1 }))
  ])
]);


export const heroAnimations = [
  trigger('heroStaggeredAnimation', [
    transition(':enter', [
      // Title (h2) - First element to appear
      query('h2', [
        style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }),
        animate('0.4s ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ], { optional: true }),

      // First span (Learn) - Appears after 0.2s delay
      query('h1 span:nth-child(1)', [
        style({
          opacity: 0,
          transform: 'translateY(20px)'
        }),
        animate('0.4s 0.2s ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ], { optional: true }),

      // Middle dot separator - Slight delay from first span
      query('h1 span:nth-child(2)', [
        style({
          opacity: 0,
          transform: 'scale(0.5)'
        }),
        animate('0.3s 0.3s ease-out',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        )
      ], { optional: true }),

      // Second span (Grow) - Appears after 0.4s delay
      query('h1 span:nth-child(3)', [
        style({
          opacity: 0,
          transform: 'translateY(20px)'
        }),
        animate('0.4s 0.4s ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ], { optional: true }),

      // Second dot separator
      query('h1 span:nth-child(4)', [
        style({
          opacity: 0,
          transform: 'scale(0.5)'
        }),
        animate('0.3s 0.5s ease-out',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        )
      ], { optional: true }),

      // Third span (Lead) - Appears after 0.6s delay
      query('h1 span:nth-child(5)', [
        style({
          opacity: 0,
          transform: 'translateY(20px)'
        }),
        animate('0.4s 0.6s ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ], { optional: true }),

      // Description paragraph - Appears after 0.8s delay
      query('p', [
        style({
          opacity: 0,
          transform: 'translateY(30px)'
        }),
        animate('0.5s 0.8s ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        )
      ], { optional: true }),

      // Buttons - Now starting at 0.9s (just after paragraph)
      query('.btn-drain', [
        style({
          opacity: 0,
          transform: 'translateX(-40px) scale(0.9)'
        }),
        animate('0.4s 0.8s ease-out', // Faster animation (0.4s) starting at 0.9s
          style({
            opacity: 1,
            transform: 'translateX(0) scale(1)'
          })
        )
      ], { optional: true }),

      query('.btn-drain-reverse', [
        style({
          opacity: 0,
          transform: 'translateX(40px) scale(0.9)'
        }),
        animate('0.4s 0.8s ease-out', // Same timing as first button
          style({
            opacity: 1,
            transform: 'translateX(0) scale(1)'
          })
        )
      ], { optional: true })
    ])
  ])
];
export const zoomSlide=trigger('zoomSlide', [
  state('in', style({
    opacity: 1,
    transform: 'scale(1.1)'
  })),
  state('out', style({
    opacity: 0,
    transform: 'scale(1)'
  })),
  transition('out => in', [
    animate('8s ease-in-out')
  ]),
  transition('in => out', [
    animate('1s ease-in-out')
  ])
])

export const routeAnimations = trigger('routeAnimations', [
  transition('HomePage => AboutPage, AboutPage => CoursesPage, CoursesPage => WorkshopPage, WorkshopPage => ContactPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
      })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('0.5s ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ], { optional: true })
    ])
  ]),

  transition('ContactPage => WorkshopPage, WorkshopPage => CoursesPage, CoursesPage => AboutPage, AboutPage => HomePage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
      })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('0.5s ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('0.5s ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ], { optional: true })
    ])
  ]),

  // fallback: fade in/out
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('0.3s ease-out', style({ opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s ease-out', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);

