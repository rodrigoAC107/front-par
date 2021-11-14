import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { AuthService } from '../services/AuthService.service';

@Injectable()
export class CanActiveLoginGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.authService.getToken() === null) {
            console.log('No estás logueado');
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.authService.getToken() === null) {
            console.log('No estás logueado');
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}