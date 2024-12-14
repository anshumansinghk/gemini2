import { AnimationTriggerMetadata, animate, state, style, transition, trigger ,keyframes} from "@angular/animations";


export class Animations {
  static divExpand = Animations.getDivExpand();
  static tableRowExpand = Animations.getTableRowExpand();
  static fade = Animations.getFade();

  static getFade() {
    return trigger('fade', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate('150ms')),
    ])
  }
  static getTableRowExpand(): AnimationTriggerMetadata {
    return trigger('tableRowExpand',
      [
        state('open',
          style({ height: '*', opacity: 1, display: '', overflow: 'auto' })),
        transition('collapsed => open', [
          animate('150ms ease-in', keyframes([
            style({ height: '0px', display: '', overflow: 'hidden', opacity: 0, offset: 0 }),
            style({ height: '*',  offset: 1.0 })
          ]))
        ]),

        state('collapsed',
          style({ height: '0px', display: 'none', overflow: 'auto' })),
        transition('open => collapsed', [
          animate('150ms ease-out', keyframes([
            style({ height: '*', overflow: 'hidden', offset: 0 }),
            style({ height: '0px', offset: 1 }),
          ]))
        ])
      ])
  }

  static getDivExpand(): AnimationTriggerMetadata {
    return trigger('divExpand',
      [
        state('open',
          style({ height: '*', opacity: 1, display: '', overflow: 'auto'})),
        transition('collapsed => open', [
          animate('250ms ease-in', keyframes([
            style({ height: '0px', display: '', overflow: 'hidden', opacity: 0, offset: 0 }),
            style({ height: '*',  offset: 1.0 })
          ]))
        ]),

        state('collapsed',
          style({ height: '0px', display: 'none', overflow: 'auto'})),
        transition('open => collapsed', [
          animate('250ms ease-out', keyframes([
            style({ height: '*', overflow: 'hidden', offset: 0 }),
            style({ height: '0px', offset: 1 }),
          ]))
        ])
      ])
  }
}
