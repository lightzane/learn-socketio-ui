import { animate, style, transition, trigger } from "@angular/animations";

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out')
    ]),
    // transition(':leave', [
    //     animate('0.5s ease-out', style({ opacity: 0 }))
    // ])
]);

export const slideIn = trigger('slideIn', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('0.5s ease-out')
    ]),
    // transition(':leave', [
    //     animate('0.5s ease-out', style({ opacity: 0, transform: 'translateX(-100px)' }))
    // ])
]);

export const popIn = trigger('popIn', [
    transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('0.15s cubic-bezier(0, 1.4, 1, 1)')
    ])
]);