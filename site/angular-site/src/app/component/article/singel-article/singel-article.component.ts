import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleServices } from '../../../core/service/article.service';

@Component({
  selector: 'app-singel-article',
  templateUrl: './singel-article.component.html',
  styleUrls: ['./singel-article.component.css']
})
export class SingelArticleComponent implements OnInit {
  article = {
    img:'',
    title:'',
    url:'',
    paragraph:[0]
  }
  constructor(private router: ActivatedRoute, private http:ArticleServices) { }

  ngOnInit() {
    let url = this.router.snapshot.params['url'];
    this.http.singlArticle({url:url}).subscribe(article=>{
      if(article['success']) {
      this.article = article['article'];

    }

    })
    
  }

}
