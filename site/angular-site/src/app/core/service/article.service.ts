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
export class ArticleServices {
    constructor(private http: HttpClientService,
          private router: Router,
          private flashMsg: FlashMessagesService  ) {}

    addArticle(body):Observable<Object>{
        let token = localStorage.getItem('token');
        let httpUrl:string = url.http + url.addArticle;
        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': "http://localhost:4200",
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    getNumOfArticle(body):Observable<Object> {
        let httpUrl:string = url.http + url.getNumOfArticle;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    getCountOfArtcile():Observable<Object> {
        let httpUrl:string = url.http + url.getCountOfArticle;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            })
        return this.http.get(httpUrl,  {headers:headers});
    } 

    singlArticle(body):Observable<Object> {
        let httpUrl:string = url.http + url.getSinglArticle;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    deleteArticle(body):Observable<Object> {
        let token = localStorage.getItem('token');
        let httpUrl:string = url.http + url.deleteArticle;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }
}