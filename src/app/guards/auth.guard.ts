import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router:Router){}

    token:any;

    // this method makes sure that only if the token is available in localstorage, the home component can be accessed
    // only logged in or authenticated user can navigate to home
    canActivate(){
        this.token=localStorage.getItem('token');
        if (this.token){
            return true;
        } else{
            this.router.navigate(['login']);
        }
    }
}
