import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewBlogComponent } from './main-new-blog.component';

describe('MainNewBlogComponent', () => {
  let component: MainNewBlogComponent;
  let fixture: ComponentFixture<MainNewBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNewBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
