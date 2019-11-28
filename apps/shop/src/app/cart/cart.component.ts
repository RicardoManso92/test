import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'abshop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
