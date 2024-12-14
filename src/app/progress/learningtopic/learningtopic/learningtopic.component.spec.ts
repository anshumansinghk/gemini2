import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningtopicComponent } from './learningtopic.component';

describe('LearningtopicComponent', () => {
  let component: LearningtopicComponent;
  let fixture: ComponentFixture<LearningtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningtopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
