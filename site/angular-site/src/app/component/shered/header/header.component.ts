import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOrder = false;
  constructor(public authService: AuthServices,
             private router: Router, 
             private msg: FlashMessagesService,
             private location: Location) { }

  ngOnInit() {
    if(sessionStorage.getItem('order')) {
      this.isOrder = true;
    }
  }

  onClick() {
    this.isOrder=false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    this.msg.show('Успешно се отписахте от системата', { cssClass: 'alert-success', timeout: 3000 } )
  }

}
