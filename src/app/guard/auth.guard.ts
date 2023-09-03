import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userDetails: any;
  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userDetails = this.authService.userDetails;
      if (this.userDetails?.user_id) {
          return true;
      }
      this.router.navigate(['login']);
      return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) {
    this.userDetails = this.authService.userDetails;
    if (this.userDetails?.user_id) {
        return true;
    }
    this.router.navigate(['login']);
    return false;
}
  
}
