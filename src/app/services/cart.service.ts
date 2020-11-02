import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCart(uid: string) {
    if(!window.localStorage.getItem(uid))
      return new Array();
    else
      return JSON.parse(window.localStorage.getItem(uid));
  }

  checkIfItemExists(uid, product): boolean {
    let carrito = JSON.parse(window.localStorage.getItem(uid));
    if(!carrito) return false;
    return carrito.some(element => element.product.uid === product);
  }

  addItem(uid: string, product: Product, quantity: number) {
    let carrito = JSON.parse(window.localStorage.getItem(uid));
    if(!carrito)
      carrito = new Array();
    carrito.push({product: product, quantity: quantity} as CartItem);
    window.localStorage.setItem(uid, JSON.stringify(carrito));
  }

  getTotal(uid: string): number {
    let carrito = JSON.parse(window.localStorage.getItem(uid));
    if(!carrito)
      return 0;

    let total = 0;

    carrito.forEach(element => {
      total += element.product.price * element.quantity;
    });

    return total;
  }

  plusItem(uid: string, product: Product) {
    let carrito = JSON.parse(window.localStorage.getItem(uid));
    
    carrito.forEach((element, index) => {
      if(element.product.uid == product.uid)
        carrito[index].quantity += 1;
    });

    window.localStorage.setItem(uid, JSON.stringify(carrito));
  }

  lessItem(uid: string, product: Product) {
    let carrito = JSON.parse(window.localStorage.getItem(uid));
    let indice;

    carrito.forEach((element, index) => {
      if(element.product.uid == product.uid)
        indice = index;
    });
    
    if(carrito[indice].quantity == 1)
      carrito.splice(indice, 1);
    else
      carrito[indice].quantity -= 1;

    window.localStorage.setItem(uid, JSON.stringify(carrito));
  }

  removeItem(uid: string, product: Product) {
    let carrito = JSON.parse(window.localStorage.getItem(uid));
    let indice;

    carrito.forEach((element, index) => {
      if(element.product.uid == product.uid) 
        indice = index;
    });

    carrito.splice(indice, 1);
    window.localStorage.setItem(uid, JSON.stringify(carrito));
  }

  cleanCart(uid: string) {
    localStorage.removeItem(uid);
  }

}
