import { Component, OnInit } from '@angular/core';
import { OrderServices } from '../../../core/service/order.service';
import { SearchOrderModel } from '../../../core/models/input-models/search-order-form.models';

@Component({
  selector: 'app-serach-order',
  templateUrl: './serach-order.component.html',
  styleUrls: ['./serach-order.component.css']
})
export class SerachOrderComponent implements OnInit {
  orderForm: SearchOrderModel;
  isForm: Boolean=true;
  isOrder: Boolean = false;
  orders;
  constructor(private http: OrderServices) { }

  ngOnInit() {
    this.orderForm = new SearchOrderModel('');
  }

  submit() {
    this.http.searchOrder(this.orderForm).subscribe(data=>{
     if(data['success']) {
      this.isOrder = true;
      this.isForm = false;
      this.orders = data['order'];
     } else {

     }
      //this.isForm = false;
    })
    
  }
  
  new() {
    this.isOrder = false;
    this.isForm = true;
  }
}
