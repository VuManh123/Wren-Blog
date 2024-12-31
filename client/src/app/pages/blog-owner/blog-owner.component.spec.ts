import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOwnerComponent } from './blog-owner.component';

describe('BlogOwnerComponent', () => {
  let component: BlogOwnerComponent;
  let fixture: ComponentFixture<BlogOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
