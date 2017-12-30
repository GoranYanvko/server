import { Component, OnInit } from '@angular/core';
import { AuthServices } from './../../../core/service/auth.service';
import { UserLoginModel } from '../../../core/models/input-models/login-form.models';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: UserLoginModel;
  constructor(private http: AuthServices, private flashMsg: FlashMessagesService) { }

  ngOnInit() {
    this.loginForm = new UserLoginModel('', '');
  }

  onSubmit() {
    this.http.login(this.loginForm).subscribe(data=>{
      if(!data['success']){
        this.flashMsg.show('Грешно потребителско име или парола', { cssClass: 'alert-danger', timeout: 3000 } )
      } else {
    
        this.http.successLogin(data);
}
    })
  }

}
