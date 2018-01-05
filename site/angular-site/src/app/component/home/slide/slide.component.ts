import { Component, OnInit } from '@angular/core';
import { SliderServices } from '../../../core/service/slider.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  imgArr:Array<String>;
  img = '';
  url = '';
  num = 0;
  
  constructor(private http: SliderServices) { }

  ngOnInit() {
    this.http.getSlider().subscribe(data=>{
      if(data['success']) {
        console.log(data['slider'])
      this.imgArr=data['slider']
      }
    this.loadeImg()
  })
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
    this.img = this.imgArr[this.num]['img'];
    this.url = this.imgArr[this.num]['url']
  }
} 
