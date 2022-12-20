import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl = environment.apiBaseUrl;
  authPath='auth'
  registerPath='/register'
  loginPath='/login'
  constructor(private http:HttpClient) { }

  userRegister(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+this.registerPath, data);
  }
  userLogin(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+this.loginPath, data);
  }
}
