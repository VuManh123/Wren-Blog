import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAddLanguageComponent } from './main-add-language.component';

describe('MainAddLanguageComponent', () => {
  let component: MainAddLanguageComponent;
  let fixture: ComponentFixture<MainAddLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAddLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAddLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
