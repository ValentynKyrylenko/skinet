import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../share/Models/brands';
import { IPagination } from '../share/Models/pagination';
import { IType } from '../share/Models/productType';
import {map} from 'rxjs/operators';
import { shopParams } from '../share/Models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl ='https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: shopParams) {
//lets create a params object which we can pass to our API as query sting
  let params = new HttpParams();

  if (shopParams.brandId !== 0) {
    params = params.append('brandId', shopParams.brandId.toString());
  }
  if (shopParams.typeId !==0){
    params = params.append('typeId', shopParams.typeId.toString());
  }
  if (shopParams.search){
    params = params.append('search', shopParams.search);
  }


    params = params.append('sort', shopParams.sort);
    //add our pagination to the parameters
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());
  

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    )
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands')
  }
  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types')
  }
}
