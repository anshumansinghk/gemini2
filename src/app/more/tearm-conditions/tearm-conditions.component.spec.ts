import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TearmConditionsComponent } from './tearm-conditions.component';

describe('TearmConditionsComponent', () => {
  let component: TearmConditionsComponent;
  let fixture: ComponentFixture<TearmConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TearmConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TearmConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
