import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];
    userRole: number = 1;
    roleName: string = 'Customer'

    constructor(public appMain: AppMainComponent, private _auth: AuthService,private router: Router ) { 
        this.userRole = this._auth.userDetails.userRole || 1;

        switch (this.userRole) {
            case 1:
                this.roleName = "Customer"
                break;
                case 2:
                    this.roleName = "Agent"
                    break;
                    case 3:
                        this.roleName = "Manager"
                        break;
                        case 4:
                            this.roleName = "Director"
                            break;        
            default:
                this.roleName = "Customer"
                break;
        }
    }

    public logout(){
        localStorage.removeItem('jwtToken');
        this.router.navigate(['login']);
    }
}
