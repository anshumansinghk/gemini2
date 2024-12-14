import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittenpracticeComponent } from './writtenpractice.component';

describe('WrittenpracticeComponent', () => {
  let component: WrittenpracticeComponent;
  let fixture: ComponentFixture<WrittenpracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittenpracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrittenpracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
