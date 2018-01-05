import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SliderServices } from '../../../core/service/slider.service';
import { SliderNewModel } from '../../../core/models/input-models/slider-form.models';

@Component({
  selector: 'admin-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sleders; 
  edit: Boolean = false; 
  form: SliderNewModel;
  saveBtn:boolean = true;
  editBtn:boolean = false;
  constructor(private http: SliderServices) { }

  ngOnInit() {
    this.loadeSlider();
  }

  loadeSlider() {
    this.http.getSlider().subscribe(data=>{
      this.sleders = data['slider'];
    })
  }


  @Output() changeView: EventEmitter<any> = new EventEmitter();

  back() {
    this.changeView.emit('home');
  }

  onEdit() {
    this.form = new SliderNewModel('', '', '');
    this.edit = !this.edit;
    
    console.log(this.edit);
  }

  onSubmit() {
    this.http.setSlider(this.form).subscribe(data=>{
      if(data['success']) {
        this.edit = false;
        this.loadeSlider();
      }
    })
  }

  remove(e) {
    this.http.remove({'id':e.target.id}).subscribe(data=>{
    if(data['success']) {
      this.loadeSlider();
    }
  })
  }

  onEditSlider(e) {
    window.scrollTo(0, 150)
    this.edit = true;
    this.saveBtn = false;
    this.editBtn = true;
    for(let slider of this.sleders ) {
      if(slider._id === e.target.id) {
        this.form = new  SliderNewModel(slider.title, slider.url, slider.img);
        this.form['id'] = e.target.id;
      }
    }
  }

  updateSlider(e) {
    this.http.update({'id':e.target.id, 'slider':this.form}).subscribe(editInfo=>{
     if(editInfo['success']) {
      this.saveBtn = true;
      this.editBtn = false;
      this.edit = false;
      this.loadeSlider();
     }
    })
  }
}


