import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  email: string = "";
  password: string;
  
  config: AppConfig;
  
  subscription: Subscription;

  constructor(public loginService: LoginService, private router: Router,public configService: ConfigService, private _auth: AuthService){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  public login(){
    const formData = {
      email: this.email,
      password: this.password
    }
    this.loginService.login(formData).subscribe({
      next: (response: { refresh_token: string }) => {
        localStorage.setItem("jwtToken", response.refresh_token);
        if(this._auth.userDetails.userRole !== 1){
          this.router.navigate(['action-tickets']);
        }else{
          this.router.navigate(['ticket-dashboard']);
        }
    },
    error: (error: any) => {
        console.log(error);
    },
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
