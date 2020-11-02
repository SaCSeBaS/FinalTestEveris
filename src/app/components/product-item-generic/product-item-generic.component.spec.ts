import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemGenericComponent } from './product-item-generic.component';

describe('ProductItemGenericComponent', () => {
  let component: ProductItemGenericComponent;
  let fixture: ComponentFixture<ProductItemGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
