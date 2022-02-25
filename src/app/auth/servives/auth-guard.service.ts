import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  baseUrl = environment.baseUrl;
  
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    ) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (this.tokenStorage.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
