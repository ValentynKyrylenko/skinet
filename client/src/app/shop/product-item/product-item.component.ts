import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/share/Models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  //receives property from its parent component
  @Input() product: IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
