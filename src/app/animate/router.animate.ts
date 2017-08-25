
import {trigger, transition, state, style, animate, keyframes, group} from '@angular/animations';

export const routingAnimation = trigger('routeAnim', [

    // for the different pages switch

    state('void', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
    state('*', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),

    // :enter
    transition('void => *', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        // animate('.5s ease-in-out', style({transform: 'translateX(0)'}))

        //  let one group animation execute together
        group([
            animate('.5s ease-in-out', style({transform: 'translateX(0)'})),
            animate('.3s ease-in', style({opacity: 1}))
        ])
    ]),

    // :leave
    transition('* => void', [
        style({transform: 'translateX(0)', opacity: 1}),
        // animate('.5s ease-in-out', style({transform: 'translateX(100%)'}))
        group([
            animate('.5s ease-in-out', style({transform: 'translateX(100%)'})),
            animate('.3s ease-in', style({opacity: 0}))
        ])
    ])
]);