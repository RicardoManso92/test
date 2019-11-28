//import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@Angular/Core';
import { BasketService }from '../basket.service';
import { BasketItem, Product} from './model/products.interface';
@Component({
  selector: 'abshop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent implements OnInit {
  public products: Product[];
  public basket: Array<BasketItem> = [];

  constructor(private http: HttpClient, private basketService: BasketService) { }

  ngOnInit() {
    this.http.get<Product[]>('./assets/data/products.json').subscribe({
      next: response => {
        this.products = response;
        console.log({products: this.products});
      }
    });
  }
  public onAddItem(item: BasketItem){
    const currentProduct=this.basket.find(
    basketItem =>basketItem.product._id ===item.product._id
  );
    if(currentProduct){
      currentProduct.units += item.units;
    }else{
      this.onBasketChange();
    }
  }
  public onRemoveItem(item: BasketItem){
    this.basket = this.basket.filter(i => i.product._id !== item.product._id);
    this.onBasketChange();
  }
  private onBasketChange(){
    const totalUnits =this.basket.reduce(
      (total, item) => total+ item.units,
      0
    );
    this.basketService.units$.next(totalUnits);
    this.basketService.basket$.next(this.basket);
  }
}
