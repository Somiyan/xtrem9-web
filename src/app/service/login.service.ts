import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serverUrl: string;

  constructor(private http: HttpClient) {
      this.serverUrl = environment.serverUrl;
  }

    public login(userData): Observable<Object> {
      return this.http.post(
          `${this.serverUrl}signin`,
          {userData}
      );
  }
}
