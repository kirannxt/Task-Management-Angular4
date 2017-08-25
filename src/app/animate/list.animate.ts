
import {transition, trigger, animate, keyframes, style, state, group, query, stagger} from '@angular/animations';

export const listAnimation = trigger('list', [

    // query the child element, if the query sub element doesnot exist, it needs optional
    transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger(300, [
            animate('1s', style({opacity: 1}))
        ]), {optional: true}),

        query(':leave', style({opacity: 1}), {optional: true}),
        query(':leave', stagger(300, [
            animate('1s', style({opacity: 0}))
        ]), {optional: true})
    ])
    
]);