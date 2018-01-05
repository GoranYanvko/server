import { Component, OnInit } from '@angular/core';
import { OrderServices } from '../../core/service/order.service';
import { OrderFormModel } from '../../core/models/input-models/order-form.models';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router } from '@angular/router';
import {delivaryTo} from './../../config/delivary.config'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isCart = false;
  cart;
  totalProductPrice;
  totalPrice:Number;
  productFomrToSubmit:Array<any> = [];  
  delivary = delivaryTo;
  delviaryPrice = this.delivary['address'];

  orderForm: OrderFormModel;
  err = false;
  constructor(private http:OrderServices, 
    private msg: FlashMessagesService,
    private redirect: Router) { }

  ngOnInit() {
    
    this.orderForm = new OrderFormModel('', '', '', '', '', 'Адрес', '', true)
   this.loadeDate();
  }


  loadeDate() {
    this.totalPrice = 0;
    this.http.getCart({id:sessionStorage.order}).subscribe(info=>{
      this.cart = info['product'];
      if(this.cart.length === 0) {
        sessionStorage.clear()
        this.isCart = false;
      } else {
      this.isCart = true;
     
      for(let c of  this.cart) {
        this.productFomrToSubmit.push(c.product)
        c['totalProductPrice'] = c.qty *  c.product.price;
        this.totalPrice = this.totalPrice +  c['totalProductPrice']; 
      }
      this.totalPrice = Number(this.totalPrice) + this.delviaryPrice;
    }
    })
  }
     onChange(e) {
      this.http.getIp().subscribe(data=>{
        let product = {
          product:{product: e.target.id,
          qty:  e.target.value},
          userIp:data.ip,
        }
       
        this.http.updateCart({id:sessionStorage.getItem('order'), product:product})
        .subscribe(data=>{
          if(data['success']) {
            this.loadeDate();
          
          }
        })
      
    })
  }

  getDelivary(e) {
    if(e.target.value === "Адрес") {
      this.delviaryPrice = this.delivary['address'];
    } else {
      this.delviaryPrice = this.delivary['office'];
    }
    this.loadeDate();
  }

  remove(e) {
    this.http.removeProductFromCart({id:sessionStorage.getItem('order'), productId:e.target.id})
            .subscribe(data=>{ 
                   if(data['success']) {
                    this.loadeDate();
                   }
            })
  }

  onSubmit() {
    if(this.orderForm.firstName === '' ||
     this.orderForm.lastName === '' ||
      this.orderForm.phone === '' ||
      this.orderForm.city === '' ||
      this.orderForm.address  === '' 
    ) {
      this.msg.show('Формата е попълнена грешно', { cssClass: 'alert-danger', timeout: 4000 } )
    } else if (this.orderForm.confirmConditions === false) {
      this.msg.show('За да направите поръчка, трябва да се съгласите с общите условия', { cssClass: 'alert-danger', timeout: 4000 } )
    }else if (
      isNaN(Number(this.orderForm.phone))
    ) {
      this.msg.show('Телефоният номер трябва да съдържа само цифри!', { cssClass: 'alert-danger', timeout: 4000 } )
    }  else if(this.orderForm.phone.length<8) {
      
      this.msg.show('Телефоният номер e твърде кратък!', { cssClass: 'alert-danger', timeout: 4000 } )
    } else if(
       (this.orderForm.phone.startsWith('088') ||
     this.orderForm.phone.startsWith('089')||
     this.orderForm.phone.startsWith('087')||
     this.orderForm.phone.startsWith('09')
    ) && this.orderForm.phone.length !== 10) {
      this.msg.show('Телефоният номер e невалиден!', { cssClass: 'alert-danger', timeout: 4000 } )
     } else {
      this.orderForm['product'] = this.cart;
      this.orderForm['name'] = this.orderForm.firstName + ' ' + this.orderForm.lastName;
      this.http.newOrder(this.orderForm).subscribe(info=>{
        if(info["success"]) {
          sessionStorage.clear();
          this.redirect.navigate(['last-step-order']);
        }
     })
  }
}
}