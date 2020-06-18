import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes
} from '@angular/animations';

// export const fader=
// trigger('routeAnimations',[
//     transition('* => pendientes',[
//         query(':enter, :leave',[
//             style({
//                 position:'absolute',
//                 left:0,
//                 width:'100%',
//                 transform: 'scale(0) translateY(100%)'
//             })
//         ],{optional: true}),
//         query(':enter',[
//             animate('600ms ease',
//             style({
//                 opacity:1,transform:'scale(1) translateY(0)'
//             }))
//         ],{optional: true})
//     ])
// ]);


export const slideInAnimation =
  trigger('routeAnimations', [
    transition('deslizado1 <=> deslizado2', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ],{optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ],{optional: true})
      ]),
      query(':enter', animateChild(),{optional: true}),
    ]),
    transition('* <=> pendientes', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                                position:'absolute',
                                left:0,
                                width:'100%',
                                transform: 'scale(0) translateY(100%)'
                            })
        ],{optional: true}),
        query(':enter', [
            animate('600ms ease',
            style({
                opacity:1,transform:'scale(1) translateY(0)'
            }))
        ],{optional: true}),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ left: '100%'}))
          ],{optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%'}))
          ],{optional: true})
        ]),
        query(':enter', animateChild(),{optional: true}),   
    ])
  ]);

function slideTo(direction){
    const optional = {optional:true};

    return[
        query(':enter, :leave',[
            style({
                position:'absolute',
                top:0,
                [direction]:0,
                width:'100%'
            })
        ],optional),
        query(':enter',[
            style({[direction]:'-100%'})
        ]),
        group([
            query(':leave',[
                animate('600ms ease',
                style({
                    [direction]:'100%'
                }))
            ],{optional: true}),
            query(':enter',[
                animate('600ms ease',
                style({
                    [direction]:'0'
                }))
            ],{optional: true})
        ])
    ];
}