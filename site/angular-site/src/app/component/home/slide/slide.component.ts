import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {Observable} from "rxjs"

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  imgArr:Array<String> = [
   'https://arteric.com/sites/default/files/2017-09/img-sxsw-live-coverage-thumbnail.jpg',
   'https://media.licdn.com/media/AAEAAQAAAAAAAANbAAAAJDE5NjBkNDk1LTY3ZGQtNDA0NS04YTJiLTdkNmU3NjZiNjI3Mg.png',
   'https://dianesieg.com/wp-content/uploads/2017/02/heart-tree-1024x576.jpg'
  ];
  img;
  num = 0;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadeImg()
 
  }

  next() {
    if(this.num > this.imgArr.length-2) {
      this.num = 0;
    } else {
      this.num++;
    }
    this.loadeImg() 
  }

  prev() {
    if(this.num < 1) {
      this.num = this.imgArr.length-1;
    } else {
      this.num--;
    }
    this.loadeImg()

  }

  loadeImg() {
    this.img = this.imgArr[this.num];
  }
} 
