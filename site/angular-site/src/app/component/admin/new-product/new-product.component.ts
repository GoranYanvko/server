import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NewProductModel } from '../../../core/models/input-models/new-product-form.models';
import { ProductServices } from '../../../core/service/product.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { SeoServices } from '../../../core/service/seo.service';

@Component({
  selector: 'admin-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(
    private seo: SeoServices,
    private http: ProductServices, 
    private msg: FlashMessagesService) { }
  productForm: NewProductModel;
  ngOnInit() {
    this.seo.changeTitle('Нов продукт')
    window.scrollTo(0, 0)
    this.productForm = new NewProductModel('', '', '', 0, 0, 0, '', '', '', true, '', '', '')
  }

  @Output() changeView: EventEmitter<any> = new EventEmitter();

  back() {
      this.changeView.emit('home');
  }

  submit() {
    this.productForm['prednaznachenie'] = this.productForm.prednaznachenieString.split(',').map(x=>x.trim());
    this.productForm['keywords'] = this.productForm.keywordsString.split(',').map(x=>x.trim());
    this.http.addProduct(this.productForm).subscribe(data=>{
      if(!data['success']) {
        this.msg.show('Продукта не е добавен! Всички полета са задължителни', { cssClass: 'alert-danger', timeout: 3000 } )
      } else {
        this.changeView.emit('home');
        this.msg.show('Успешно доабвен продукт', { cssClass: 'alert-success', timeout: 3000 } )
      }
    })
  }



}
