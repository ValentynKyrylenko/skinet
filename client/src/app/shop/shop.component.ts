import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { IBrand } from '../share/Models/brands';
import { IProduct } from '../share/Models/product';
import { IType } from '../share/Models/productType';
import { ShopService } from './shop.service';
import {shopParams} from '../share/Models/shopParams'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  //consume a service which we created
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new shopParams();
  totalCount: number;
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
      this.shopService.getProducts(this.shopParams).subscribe(response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;

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
      this.shopParams.brandId = brandId;
      this.shopParams.pageNumber =1;
      this.getProducts();
    }

    onTypeSelected (typeId: number) {
      this.shopParams.typeId = typeId;
      this.shopParams.pageNumber =1;
      this.getProducts();
    }

    onSortSelected(e: Event): void {
      this.shopParams.sort = (e.target as HTMLSelectElement).value;
      this.getProducts();
    }

    //page change handler method
    onPageChanged(event: any) {
      if (this.shopParams.pageNumber !==event){
        this.shopParams.pageNumber = event;
        this.getProducts();
      }
      
    }

    onSearch(){
      this.shopParams.search = this.searchTerm.nativeElement.value;
      this.shopParams.pageNumber =1;
      this.getProducts();
    }

    onReset(){
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new shopParams();
      this.getProducts();
    }
}
