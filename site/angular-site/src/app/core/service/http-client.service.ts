import {Injectable} from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class HttpClientService {
    private heders = new HttpHeaders();
    constructor(private http: HttpClient) {

    }

    get<T>(url:string, headers:any){
        return this.http.get<T>(url, headers).pipe(catchError(err => this.henderlError(err)))
    }

    post<T>(url:string, body: any, headers){
        return this.http.post<T>(url, body, headers).pipe(catchError(err => this.henderlError(err)))
    }

    put<T>(url:string, body: any){
        return this.http.put<T>(url, body, {headers: this.heders}).pipe(catchError(err => this.henderlError(err)))
    }

    delete<T>(url:string, id: any){
        return this.http.delete<T>(url+'/'+id, {headers: this.heders}).pipe(catchError(err => this.henderlError(err)))
    }


    private henderlError(err:any) {
        return Observable.throw(new Error(err.message))
    }
}