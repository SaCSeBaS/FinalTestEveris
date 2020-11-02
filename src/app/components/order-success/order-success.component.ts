import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/CartItem';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.sass'],
})
export class OrderSuccessComponent implements OnInit {

  user: User;
  order: CartItem[];

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private toastService: ToastrService) {}

  ngOnInit(): void {
    this.checkAuth();
  }

  saveOrder() {
    this.orderService.addNewOrder(this.user.uid, this.cartService.getCart(this.user.uid));
    this.toastService.success('¡Compra realizada con éxito!');
    this.cartService.cleanCart(this.user.uid);
    this.router.navigateByUrl('');
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
                this.user = result;
                this.order = this.cartService.getCart(this.user.uid);
              } 
            })
          )
        }
      })
    );
  }
  
}