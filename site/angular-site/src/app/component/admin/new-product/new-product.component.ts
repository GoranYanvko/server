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
  addProduct:Boolean = false;
  products;
  saveBtn:boolean = true;
  editBtn:boolean = false;
  edit: Boolean = false;

  constructor(
    private seo: SeoServices,
    private http: ProductServices, 
    private msg: FlashMessagesService) { }
  productForm: NewProductModel;
  ngOnInit() {
    this.seo.changeTitle('Нов продукт')
    this.loadePage();
  }

  loadePage() {
    this.http.getAllProducts().subscribe(products =>{
      this.products = products['products'];
      window.scrollTo(0, 0)
      })
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
        this.addProduct = false;
        this.loadePage();
        this.msg.show('Успешно доабвен продукт', { cssClass: 'alert-success', timeout: 3000 } )
      }
    })
  }

  onEdit() {
    this.addProduct = !this.addProduct;
    if(this.addProduct === true) {
      this.productForm = new NewProductModel('', '', '', 0, 0, 0, '', '', '', true, '', '', '')
    }
  }

  remove(e) {
    this.http.deleteProduct({'id':e.target.id}).subscribe(data=>{
    if(data['success']) {
       this.loadePage();
    }
  })
  }

  onEditProduct(e) {
    window.scrollTo(0, 150)
    this.addProduct = true;
    this.saveBtn = false;
    this.editBtn = true;
    for(let product of this.products ) {
      product.prednaznachenieString = product.prednaznachenie.join(', \n');
      product.keywordsString = product.keywords.join(', ');
      if(product._id === e.target.id) {
        this.productForm = new NewProductModel(
            product.title, 
            product.type,
            product.img, 
            product.zakupnaCena, 
            product.price, 
            product.qality, 
            product.description, 
            product.prednaznachenieString, 
            product.sydyrjanie, 
            product.onFirstPage,
            product.url,
            product.upotreba, 
            product.keywordsString);
       this.productForm['id'] = e.target.id;
      }
    }
  }

  updateProduct() {
    this.productForm['prednaznachenie'] = this.productForm.prednaznachenieString.split(',').map(x=>x.trim());
    this.productForm['keywords'] = this.productForm.keywordsString.split(',').map(x=>x.trim());
   this.http.updateProduct({id:this.productForm['id'], 'product': this.productForm}).subscribe(info=>{
     if(info['success']) {
      this.addProduct = false;
      this.saveBtn = true;
      this.editBtn = false;
      this.loadePage();
     }
   })
  }
}
