// src/app/shared/components/list/table-animations.ts
import { animate, state, style, transition, trigger } from '@angular/animations';

export const rowExpandAnimation = [
  trigger('detailExpand', [
    state('collapsed', style({ height: '0px', opacity: 0, padding: '0 24px' })),
    state('expanded', style({ height: '*', opacity: 1, padding: '16px 24px 20px' })),
    transition('collapsed <=> expanded', animate('220ms cubic-bezier(0.4,0,0.2,1)')),
  ])
];

export const fadeInAnimation = [
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(4px)' }),
      animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ])
];

export const tableAnimations = [
  ...rowExpandAnimation,
  ...fadeInAnimation
];
