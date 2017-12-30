import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  ArticleFormModel } from '../../../core/models/input-models/article-form.models';
import { ArticleServices } from '../../../core/service/article.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  articleForm:  ArticleFormModel
  constructor(private http: ArticleServices, private msg: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    this.articleForm = new  ArticleFormModel('', '', '', '');
  }

  @Output() changeView: EventEmitter<any> = new EventEmitter();

  back() {
      this.changeView.emit('home');
  }

  submit() {
    this.articleForm['paragraph'] = this.articleForm.body.split('\n').map(x=>x.trim()).filter(x=>x !== '');
  
    this.http.addArticle(this.articleForm).subscribe(data=>{
      if(!data['success']) {
        this.msg.show('Статията не е добавен! Всички полета са задължителни', { cssClass: 'alert-danger', timeout: 3000 } )
      } else {
        this.changeView.emit('home');
        this.msg.show('Успешно доабвен Статиия', { cssClass: 'alert-success', timeout: 3000 } )
      }
    })
  }



}
