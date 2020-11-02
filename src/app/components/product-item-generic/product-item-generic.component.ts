import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';

//import { CartContext } from '@services/cart-context.service';
//import { UserContext } from '@services/user-context.service';

//import { Product } from '@data/schema/product';
//import { User } from '@data/schema/user';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-item-generic',
  templateUrl: './product-item-generic.component.html',
  styleUrls: ['./product-item-generic.component.sass'],
})
export class ProductItemGenericComponent implements OnInit {

  @Input() product: Product;
  @Output() cartUpdated = new EventEmitter<void>();
  uid: string;

  productStyle;

  isAuth: Boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkAuth();
    this.productStyle = { background: `url(${this.product.url})`, backgroundSize: 'cover',
    backgroundPosition: 'center', width: '180px', height: '180px', borderRadius: '8px' };
  }


  addToCart() {
    
    if (this.isAuth) {
      if(this.cartService.checkIfItemExists(this.uid, this.product.uid))
        this.cartService.plusItem(this.uid, this.product);
      else
        this.cartService.addItem(this.uid, this.product, 1);
      this.cartUpdated.emit();
    } else {
      this.toastrService.error(
        'Por favor, inicia sesión',
        'No se pudo agregar al carrito 🙁'
      );
    }
    
  }


  checkAuth() {
    this.authService.getCurrentUser().subscribe(
      (value => {
        if(value)
          this.userService.fsGetUser(value.uid).subscribe(
            ((result: User) => { 
              if(result && result.uid)
              {
                this.isAuth = true; 
                this.uid = result.uid;
              }
              else 
                this.isAuth = false;
            })
          )
      })
    );
  }

}
