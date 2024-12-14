import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAccordionComponent } from './mi-accordion.component';

describe('MiAccordionComponent', () => {
  let component: MiAccordionComponent;
  let fixture: ComponentFixture<MiAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
