import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVideoPracticeComponent } from './audio-video-practice.component';

describe('AudioVideoPracticeComponent', () => {
  let component: AudioVideoPracticeComponent;
  let fixture: ComponentFixture<AudioVideoPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVideoPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioVideoPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
