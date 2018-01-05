import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServices } from '../../core/service/product.service';
import { FastOrderFormModel } from '../../core/models/input-models/fast-order-form.models';
import { OrderServices } from '../../core/service/order.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { SeoServices } from '../../core/service/seo.service';


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
    private msg: FlashMessagesService,
    private seo: SeoServices,
  ) { }

  findProduct:Boolean = false;
  product;
  qty = 1;
  description:Boolean = true;
  content:Boolean = false;
  upotreba:Boolean = false;
  orderForm: FastOrderFormModel;
  delviaryPrice = 5;
  orderPrice;
 
  ngOnInit() {
    window.scrollTo(0, 0)
    this.orderForm = new FastOrderFormModel('','','','','Адрес','');
    let url = this.router.snapshot.params['url'];
    this.http.getSinelProduct({'url':url}).subscribe(product=>{
     
      if(product['success']) {
          this.findProduct = true;
          this.product = product['product'];
          this.seo.changeTitle(this.product['type'] + ' ' + this.product['title'] + ' - Магазин Красота и Здраве')
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
    console.log(e.target.innerHTML.trim() === 'Съдържание')
    if(e.target.innerHTML.trim() === 'Съдържание') {
      console.log('tuk')
      this.content = true;
      this.upotreba = false;
      this.description = false;
    } else if (e.target.innerHTML.trim() === 'Начин на прием'){
      this.content = false;
      this.upotreba = true;
      this.description = false;
    } else {
      this.content = false;
      this.upotreba = false;
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
