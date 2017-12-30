import {Injectable} from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs/Observable';
import {httpConfig} from './../../config/http.config'
import {HttpHeaders} from '@angular/common/http'

const url = httpConfig;

@Injectable()
export class OrderServices {
    constructor(private http: HttpClientService) {}

    newOrder(body):Observable<Object>{
        let httpUrl:string = url.http + url.newOrder;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    searchOrder(body):Observable<Object>{
        let httpUrl:string = url.http + url.searchOrder;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    allOrders(body):Observable<Object>{
        let token = localStorage.getItem('token');
        let httpUrl:string = url.http + url.allOrders;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }
    
    editOrderStatus(body):Observable<Object>{
        let token = localStorage.getItem('token');
        let httpUrl:string = url.http + url.editOrderStatus;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    allOrdersToday():Observable<Object>{
        let token = localStorage.getItem('token');
        let httpUrl:string = url.http + url.allOrdersToday;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            })
        return this.http.get(httpUrl, {headers:headers});
    }

    allOrdersThisMonth():Observable<Object>{
        let token = localStorage.getItem('token');
        let httpUrl:string = url.http + url.allOrdersThisMonth;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
            })
        return this.http.get(httpUrl, {headers:headers});
    }

    getIp() {
        return this.http.get('https://jsonip.com', {headers:''})
    }

    newCart(body):Observable<Object>{
        let httpUrl:string = url.http + url.newCart;
    

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    updateCart(body):Observable<Object>{
        let httpUrl:string = url.http + url.updateCart;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    getCart(body):Observable<Object>{
        let httpUrl:string = url.http + url.getCart;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }

    removeProductFromCart(body):Observable<Object>{
        let httpUrl:string = url.http + url.removeProductFromCart;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
            })
        return this.http.post(httpUrl, body, {headers:headers});
    }


}