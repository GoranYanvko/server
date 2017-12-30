import {Component, OnInit} from '@angular/core';
import {ArticleServices} from '../../core/service/article.service';
import {article} from './../../config/article.config'

@Component({selector: 'app-article', templateUrl: './article.component.html', styleUrls: ['./article.component.css']})

export class ArticleComponent implements OnInit {
  numOfArticle : Number;
  currentPage = 1;
  articleByPage = article;
  totalNumOfPage;
  articles : Array < Object >;
  endPage : Number;
  startPage : Number = 1;
  paginator : Array < any > = [];
  constructor(private http : ArticleServices) {}

  ngOnInit() {
    this.paginator = [];
    this
      .http
      .getCountOfArtcile()
      .subscribe(result => {
        if (result['success']) {
          this.numOfArticle=result['count'];
          this.setPaginator()
          this.loadeArticle();
        }
      }) 
  }

  setCurrentPage(page) {
    this.currentPage = page;
    this.loadeArticle()
    this.setPaginator();
  }

  setPaginator() {
    this.paginator = [];
          //Страници изчислени на база общия брой статии
          this.totalNumOfPage = Math.ceil(Number(this.numOfArticle) / Number(this.articleByPage.articlePageNum));
          console.log(this.numOfArticle)
          // Проверка дали общия брой страници дали е по-малък от предварително брой
          // страници, които да се показват
          if (this.totalNumOfPage <= this.articleByPage.maxShowPage) {
            //ако е по-малък последната визуализирана страница е totalNumOfPage
            this.endPage = this.totalNumOfPage;
          } else {
            // Ако текущата страница ни е по-малка от 3 в случая сме задали общия брой
            // страници да е 5 Първата страница в пагинацията ни ще е 1, а максималния брой
            // страници ще е определения от нас
            if (this.currentPage <= this.articleByPage.midlePage) {
              this.startPage = 1;
              this.endPage = this.articleByPage.maxShowPage;
            } else if (this.currentPage + 2 >= this.totalNumOfPage) {
              // Ако текущата страница + 2 е по-голяма от задеденит в случая 5 Първата
              // страница, която се показва на пагинацията ще е общия брой -4
              this.startPage = Number(this.totalNumOfPage) - (this.articleByPage.maxShowPage-1);
              this.endPage = this.totalNumOfPage;
            } else {
              //Последния случай
              this.startPage = Number(this.currentPage) - (this.articleByPage.midlePage-1);
              this.endPage = Number(this.currentPage) + (this.articleByPage.midlePage-1);
            }
          }

          for (let i = this.startPage; i <= Number(this.endPage); i = Number(i) + 1) {
              this.paginator.push(i);
          }
  }

  loadeArticle() {
    window.scrollTo(0, 0)
    this.http.getNumOfArticle({"skip":(this.currentPage-1)*this.articleByPage.articlePageNum,"numOfArticle":this.articleByPage.articlePageNum})
              .subscribe(data=>{
                console.log(data);
                   this.articles = data['articles']
                   this.setPaginator();
    })
  }

}
