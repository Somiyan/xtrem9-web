/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Injector } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";
import { tap } from "rxjs/operators";
import { ActivatedRoute, Router} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    accessToken: string;
    roleIndex: string;
    roleId:number = 0;
    private jwtHelper = new JwtHelperService();
    constructor(private router: Router, private route:ActivatedRoute, private authService: AuthService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

      return next.handle(request);
    }

}

