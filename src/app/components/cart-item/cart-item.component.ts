import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Input() elementSource: string;
  @Input() uid: string;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  productStyle;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productStyle = { background: `url(${this.cartItem.product.url})`, backgroundSize: 'cover',
    backgroundPosition: 'center', width: '120px', height: '120px', borderRadius: '8px' };
  }

  plus() {
    this.cartService.plusItem(this.uid, this.cartItem.product);
    this.refresh.emit();
  }

  less() {
    this.cartService.lessItem(this.uid, this.cartItem.product);
    this.refresh.emit();
  }

  remove() {
   this.cartService.removeItem(this.uid, this.cartItem.product);
   this.refresh.emit();
  }
}