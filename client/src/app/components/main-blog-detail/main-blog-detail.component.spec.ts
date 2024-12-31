import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlogDetailComponent } from './main-blog-detail.component';

describe('MainBlogDetailComponent', () => {
  let component: MainBlogDetailComponent;
  let fixture: ComponentFixture<MainBlogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBlogDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
