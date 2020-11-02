import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  collection: Product[];
  eventsSubject: Subject<void> = new Subject<void>(); 

  constructor(private authService: AuthService,
              private productService: ProductService) { }

  reorder(value) {
    if(value == '-1') return;
    if(value == '1') this.collection.sort((a, b) => a.price - b.price);
    else this.collection.sort((a, b) => b.price - a.price);
  }

  ngOnInit(): void {
    this.productService.fsGetProducts().subscribe(
      (result) => { this.collection = result }
    );
  }

  emitEventToChild(event) {
    this.eventsSubject.next();
  }

  actualizarProductos(uid) {

    if(uid == '0') 
      this.productService.fsGetProducts().subscribe(
        (result) => { this.collection = result });
    else
      this.productService.fsGetProductsByCategory(uid).subscribe(
        (result) => { this.collection = result });

  }

}
