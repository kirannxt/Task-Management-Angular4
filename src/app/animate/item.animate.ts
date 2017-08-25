
import {trigger, state, transition, style, animate, keyframes} from '@angular/animations';

export const itemAnimation = trigger('item', [
    state('hover', style({'border-left-width': '8px'})),
    state('out', style({'border-left-width': '3px'})),
    transition('out => hover', animate('100ms ease-in')),
    transition('hover => out', animate('100ms ease-out'))
]);