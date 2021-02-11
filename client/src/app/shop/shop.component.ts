import { Component, OnInit } from '@angular/core';
import { IBrand } from '../share/Models/brands';
import { IProduct } from '../share/Models/product';
import { IType } from '../share/Models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  //consume a service which we created
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected: number =0;
  typeIdSelected: number =0;
  sortSelected ='name';
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price Low to High', value: 'priceAsc'},
    {name: 'Price High to Low', value: 'priceDesc'},
  ];



  constructor(private shopService: ShopService) { }

  ngOnInit() {
      this.getProducts();
      this.getBrands();
      this.getTypes();
    }

    getProducts() {
      this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe(response => {
        this.products = response.data;
      }, error => {
        console.log(error);
      });
    }

    getBrands() {
      this.shopService.getBrands().subscribe(response => {
        //create another object to add to the brands object. ... is called spread operator
        this.brands = [{id: 0, name: 'All'}, ...response];
      }, error => {
        console.log(error);
      });
    }

    getTypes() {
      this.shopService.getTypes().subscribe(response => {
        this.types = [{id: 0, name: 'All'}, ...response];
      }, error => {
        console.log(error);
      });
    }

    onBrandsSelected(brandId: number) {
      this.brandIdSelected = brandId;
      this.getProducts();
    }

    onTypeSelected (typeId: number) {
      this.typeIdSelected = typeId;
      this.getProducts();
    }

    onSortSelected(sort: string) {
      this.sortSelected = sort;
      this.getProducts();
    }
}
