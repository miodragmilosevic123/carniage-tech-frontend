import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "../storages/storage.service";

@Injectable({
    providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = this.storageService.getToken();
    if (token) {
        return true;
    }
    else {
        this.router.navigateByUrl("/login");
        return false;
    }
  }
}