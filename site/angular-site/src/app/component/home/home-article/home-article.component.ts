import { Component, OnInit } from '@angular/core';
import { ArticleServices } from '../../../core/service/article.service';

const numOfArticle = 4;
@Component({
  selector: 'app-home-article',
  templateUrl: './home-article.component.html',
  styleUrls: ['./home-article.component.css']
})
export class HomeArticleComponent implements OnInit {
   articles;
   firstArticle;
   loadeDate:Boolean = false;

  constructor(private http: ArticleServices) { }

  ngOnInit() {
    this.http.getNumOfArticle({"numOfArticle":numOfArticle}).subscribe(articlesInfo=>{
      if(articlesInfo) {
        this.loadeDate = true;
        this.firstArticle = articlesInfo['articles'].shift();
        this.articles = articlesInfo['articles'];
  
      } else {
        this.articles = 'Има проблем с извиличането на статиите от сървара'
      }
    })
  }

}
