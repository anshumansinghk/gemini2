import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccoutDetailsComponent } from './my-accout-details.component';

describe('MyAccoutDetailsComponent', () => {
  let component: MyAccoutDetailsComponent;
  let fixture: ComponentFixture<MyAccoutDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccoutDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccoutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
