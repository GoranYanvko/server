import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderServices } from '../../../core/service/order.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders;
  status;
  totalprice;
  constructor(private http:OrderServices, private msg: FlashMessagesService) { }

  ngOnInit() {
    this.allOrder();
  }

  allOrder() {
    this.http.allOrders({"num":0}).subscribe(data=>{
      this.orders = data;
      for (let product of this.orders) {
        product.price = 0;
        for(let p of product.product) {
         product.price = product.price + Number(p.qty) * Number(p.product.price)
        }
      }
    })
  }

  @Output() changeView: EventEmitter<any> = new EventEmitter();
  

  back() {
      this.changeView.emit('home');
  }

  onSubmit(e) {
    if(this.status) {
    this.http.editOrderStatus({"id":e.target.value, "status":this.status}).subscribe(data=>{
      if(data['success']) {
        this.allOrder();
      }
      this.status = '';
    })

    } else {
      this.msg.show('Не сте избрали промяна в статуса!', { cssClass: 'alert-danger', timeout: 5000 } )
    }
  }

  onChange(e) {
    this.status = e.target.value
  }
}
