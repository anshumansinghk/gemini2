import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgAudioVideoPlayerComponent } from './vg-audio-video-player.component';

describe('VgAudioVideoPlaterComponent', () => {
  let component: VgAudioVideoPlayerComponent;
  let fixture: ComponentFixture<VgAudioVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VgAudioVideoPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VgAudioVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
