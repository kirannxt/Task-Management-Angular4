
import {trigger, state, transition, style, animate, keyframes} from '@angular/animations';

export const cardAnimation = trigger('card', [
    state('out', style({transform: 'scale(1)', 'border-shadow': 'none'})),
    state('hover', style({transform: 'scale(1.2)', 'border-shadow': '3px 3px 5px 5px #ccc'})),
    transition('out => hover', animate('100ms ease-in')),
    transition('hover => out', animate('100ms ease-out'))
]);
