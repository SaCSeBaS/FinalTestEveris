import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMenuOverlayComponent } from './cart-menu-overlay.component';

describe('CartMenuOverlayComponent', () => {
  let component: CartMenuOverlayComponent;
  let fixture: ComponentFixture<CartMenuOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartMenuOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartMenuOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
