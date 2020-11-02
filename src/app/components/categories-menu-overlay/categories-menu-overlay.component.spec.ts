import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMenuOverlayComponent } from './categories-menu-overlay.component';

describe('CategoriesMenuOverlayComponent', () => {
  let component: CategoriesMenuOverlayComponent;
  let fixture: ComponentFixture<CategoriesMenuOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesMenuOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMenuOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
