import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { CartItem } from 'src/app/models/CartItem';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-menu-overlay',
  templateUrl: './cart-menu-overlay.component.html',
  styleUrls: ['./cart-menu-overlay.component.sass'],
})
export class CartMenuOverlayComponent implements OnInit, OnDestroy {

  cart: CartItem[];
  total: number;
  @Input() user: User;

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;

  @Output() updateCartPage: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router,
              private cartService: CartService) {}

  ngOnInit(): void {
    this.setupCart();
    this.eventsSubscription = this.events.subscribe(() => { this.setupCart(); });
  }

  setupCart(): void {
    this.cart = this.cartService.getCart(this.user.uid);
    if(!this.cart)
    {
      this.cart = new Array();
      this.total = 0;
    }
    this.total = this.cartService.getTotal(this.user.uid);
    this.updateCartPage.emit();
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}