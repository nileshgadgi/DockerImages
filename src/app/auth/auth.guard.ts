import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityapiService } from '../services/securityapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private securityapiService: SecurityapiService, private router: Router){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    let isLoggedIn = this.securityapiService.isAuthenticated();
    if (isLoggedIn){
      let isAdmin = this.securityapiService.getSession();
      if(isAdmin?.isAdmin){
        return true;
      }
      else {
        this.securityapiService.logout();
        this.router.navigate(['/login']);
      }
    } else {
      this.securityapiService.logout();
      this.router.navigate(['/login']);
    }
    return false;
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}
