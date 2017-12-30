import {Injectable} from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs/Observable';
import {httpConfig} from './../../config/http.config'
import {HttpHeaders} from '@angular/common/http'
import {tokenNotExpired} from 'angular2-jwt'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


const url = httpConfig;

@Injectable()
export class ProductServices {
    constructor(private http: HttpClientService,
          private router: Router,
          private flashMsg: FlashMessagesService  ) {}

    addProduct(body):Observable<Object>{;
        let token = localStorage.getItem('token');
        let httpUrl:string = url.http + url.addProduct;
        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': "http://localhost:4200",
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    getHomeProducts(body):Observable<Object> {
        let httpUrl:string = url.http + url.getHomeProducts;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    getSinelProduct(body):Observable<Object> {
        let httpUrl:string = url.http + url.getSingelProduct;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

}