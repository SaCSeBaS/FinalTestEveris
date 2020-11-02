import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  cartProducts: CartItem[];
  total: number;
  User: User = null;
  eventsSubject: Subject<void> = new Subject<void>();

  constructor(private cartService: CartService,
              private authService: AuthService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth() {
    this.authService.getCurrentUser().subscribe(
      (value => {
        if(value)
        {
          this.userService.fsGetUser(value.uid).subscribe(
            ((result: User) => { 
              if(result && result.uid)
              {
                this.User = result;
                this.cartProducts = this.cartService.getCart(this.User.uid);
                this.total = this.cartService.getTotal(this.User.uid);
              } 
            })
          )
        }
      })
    );
  }

  log() {
    this.cartProducts = this.cartService.getCart(this.User.uid);
    this.total = this.cartService.getTotal(this.User.uid);
  }

  setupCart(event) {
    this.cartProducts = this.cartService.getCart(this.User.uid);
    this.total = this.cartService.getTotal(this.User.uid);
    this.eventsSubject.next();
  }
  
}
