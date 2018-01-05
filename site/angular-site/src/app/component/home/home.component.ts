import { Component, OnInit } from '@angular/core';
import { SeoServices } from '../../core/service/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private seo: SeoServices) { }

  ngOnInit() {
    this.seo.changeTitle('Магазин Красота и Здраве');
    this.seo.addMetaDescription('Магазин красота и здраве - онлайн магазин за здравословни хранителни добавки, на който се доверяват българите. Богато съдържание на безплатни материали за здравето.');
    this.seo.addMetaKeys('магазин, красота, здраве, хранителни добавки, отслабване, красота, усмивка')
  }

}
