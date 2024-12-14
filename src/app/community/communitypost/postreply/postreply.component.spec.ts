import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostreplyComponent } from './postreply.component';

describe('PostreplyComponent', () => {
  let component: PostreplyComponent;
  let fixture: ComponentFixture<PostreplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostreplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
