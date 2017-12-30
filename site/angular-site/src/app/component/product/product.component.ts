import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServices } from '../../core/service/product.service';
import { FastOrderFormModel } from '../../core/models/input-models/fast-order-form.models';
import { OrderServices } from '../../core/service/order.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router: ActivatedRoute,
     private http: ProductServices,
    private order: OrderServices,
    private redirect: Router,
    private msg: FlashMessagesService
  ) { }

  findProduct:Boolean = false;
  product;
  qty = 1;
  description:Boolean = true;
  delivary:Boolean = false;
  comments:Boolean = false;
  orderForm: FastOrderFormModel;
  delviaryPrice = 5;
  orderPrice;
 
  ngOnInit() {
    this.orderForm = new FastOrderFormModel('','','','','Адрес','');
    let url = this.router.snapshot.params['url'];
    this.http.getSinelProduct({'url':url}).subscribe(product=>{
      if(product['success']) {
          this.findProduct = true;
          this.product = product['product'];
          this.orderPrice = this.product['price'] + this.delviaryPrice;
      } 
    })
   
  }

  incrase() {
    if(this.qty !== 10) {
      this.qty = this.qty + 1;
    }
  }

  decrase() {
    if(this.qty !== 1) {
    this.qty = this.qty - 1;
    }
  }

  onClick(e) {
    e.preventDefault()
    if(e.target.innerHTML.trim() === 'Доставка') {
      this.delivary = true;
      this.comments = false;
      this.description = false;
    } else if (e.target.innerHTML.trim() === 'Коментари'){
      this.delivary = false;
      this.comments = true;
      this.description = false;
    } else {
      this.delivary = false;
      this.comments = false;
      this.description = true;
    }
  }

  getPruce(e) {
    if(e.target.value === "Адрес") {
      this.delviaryPrice = 5;
    } else {
      this.delviaryPrice = 4.5;
    }
    this.orderPrice = this.product['price'] + this.delviaryPrice;
  }

  onSubmit() { 
    let product = {
      product:{product: this.product._id,
      qty: 1},
      userIp:1,
    }

    if(this.orderForm.name === '' ||
     this.orderForm.phone === '' ||
     this.orderForm.city === '' ||
     this.orderForm.address  === ''
   ) {
     this.msg.show('Формата е попълнена грешно', { cssClass: 'alert-danger', timeout: 4000 } )
   } else if (
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
    this.order.newCart(product).subscribe(info=>{
      if(info['success']) {
        this.orderForm['product'] = info['cartInfo'].product;
    this.order.newOrder(this.orderForm).subscribe(info=>{
      if(info["success"]) {
        sessionStorage.clear();
        this.redirect.navigate(['last-step-order']);
      
      }
    })
      }
    })
  }
}

  onClickButtonBy(e) {
    this.order.getIp().subscribe(data=>{
      let product = {
        product:{product: e.target.value,
        qty: this.qty},
        userIp:data.ip,
      }
      if(sessionStorage.getItem('order')) {
          this.order.updateCart({id:sessionStorage.getItem('order'), product:product})
            .subscribe(data=>{
              if(data['success']) {
                this.redirect.navigate(['cart']);
              }
            })
      } else {
      this.order.newCart(product).subscribe(info=>{
        if(info['success']) {
          sessionStorage.setItem('order', info['cartInfo']._id);
          this.redirect.navigate(['cart']);
        }
      })
    }

    })

  }
}
