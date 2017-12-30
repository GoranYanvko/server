import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { Observable } from 'rxjs/Observable';
import {AuthServices} from './../core/service/auth.service'


@Injectable()

export class AdminGards implements CanActivate {
    constructor(private admin: AuthServices, private router: Router) { 
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if( localStorage.getItem('rolle')==='admin') {
            return true;
        } else {
            localStorage.clear();
            this.router.navigate(['/login']);
            return false;
        }
    }
    

}