import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCheckinComponent } from './health-checkin.component';

describe('HealthCheckinComponent', () => {
  let component: HealthCheckinComponent;
  let fixture: ComponentFixture<HealthCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthCheckinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
