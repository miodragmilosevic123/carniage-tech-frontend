import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storages/storage.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  public isLoginActive: boolean = true;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public message: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private storageService: StorageService, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      firstName: [''],
      lastName: ['']
    });
  }

  ngOnInit(): void {
  }

  changeIsLoginFlag(): void {
    this.message = '';
    this.isLoginActive = !this.isLoginActive;
  }

  login() {
    this.message = '';
    if (!this.loginForm.valid) {
      this.message = 'Username and password are required';
      return;
    }
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe((res: any) => {
      if (res.status && res.status != 200) {
        this.message = res.message;
      } else {
        this.storageService.setUserId(res.id);
        this.storageService.setToken(res.token);
        this.router.navigateByUrl("/home");
      }
    });
  }

  register() {
    this.message = '';
    if (!this.registerForm.valid) {
      this.message = 'Username and password and email are required';
      return;
    }
    let username = this.registerForm.get('username')?.value;
    let password = this.registerForm.get('password')?.value;
    let email = this.registerForm.get('email')?.value;
    let firstName = this.registerForm.get('firstName')?.value;
    let lastName = this.registerForm.get('lastName')?.value;
    this.authService.register(username, password, email, firstName, lastName).subscribe((res: any) => {
      if (res.status && res.status != 200) {
        this.message = res.message;
      } else {
        this.storageService.setUserId(res.id);
        this.storageService.setToken(res.token);
        this.router.navigateByUrl("/home");
      }
    });
  }

}
