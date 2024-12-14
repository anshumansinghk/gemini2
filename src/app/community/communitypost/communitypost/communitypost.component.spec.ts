import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitypostComponent } from './communitypost.component';

describe('CommunitypostComponent', () => {
  let component: CommunitypostComponent;
  let fixture: ComponentFixture<CommunitypostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitypostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunitypostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
