import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor(private router : Router) { }

  canActivate(): boolean{

    const loggedIn = localStorage.getItem('loggedInUser');
    if(loggedIn)return true;
    this.router.navigate(['/login']);
    return false;
  }

}
