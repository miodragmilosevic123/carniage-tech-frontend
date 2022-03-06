import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "../storages/storage.service";

@Injectable({
    providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = this.storageService.getToken();
    if (token) {
        this.router.navigateByUrl("/home");
        return false;
    }
    else {
        return true;
    }
  }
}