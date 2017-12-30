import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { OrderServices } from '../../../core/service/order.service';

@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  numberOfOrders = 0;
  numberOfMonthOrders = 0;
  constructor(private http:OrderServices) { }

  ngOnInit() {
    this.allOrdersToday();
  }

  allOrdersToday() {
    this.http.allOrdersToday().subscribe(orders=>{    
     this.numberOfOrders = orders['orders'].length;
     this.http.allOrdersThisMonth().subscribe(monthOrders=>{
      this.numberOfMonthOrders = monthOrders['orders'].length;
     })
    })
  }

  @Output() changeView: EventEmitter<any> = new EventEmitter();

  onClick(e) {
    let value = 'article';
    let string = e.target.innerText.trim();
    if (string === 'НОВ ПРОДУКТ') {
      value = 'newProduct'
    } else if (string === 'ПОРЪЧКИ') {
      value = 'orders';
    } else if (string === "ПОТРЕБИТЕЛИ"){
      value = 'users';
    }
    this.changeView.emit(value);
  }
}
