import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuOverlayComponent } from './user-menu-overlay.component';

describe('UserMenuOverlayComponent', () => {
  let component: UserMenuOverlayComponent;
  let fixture: ComponentFixture<UserMenuOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
