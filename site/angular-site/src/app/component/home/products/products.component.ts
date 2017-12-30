import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../../../core/service/product.service';

const numOfProducts = 4
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
  loadeDateProducts:Boolean = false;

  constructor(private http: ProductServices) { }

  ngOnInit() {
    this.http.getHomeProducts({'numOfProducts': numOfProducts}).subscribe(productsInfo=>{
      if(productsInfo) {
        this.loadeDateProducts = true;
        this.products = productsInfo['products']; 

    } else {
      this.products = 'Има проблем с извиличането на статиите от сървара'
    }
    })
  }

}
