import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiBaseUrl;
  authPath='auth'
  registerPath='/register'
  loginPath='/login'
  forgetPasswordPath='/forgetPassword'
  resetPasswordPath='/resetPassword'
  sendOtpPath='/sendOtp'
  changePasswordPath='/changePassword'

  constructor(private http:HttpClient) { }
  token =localStorage.getItem('token')
     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

  userRegister(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+this.registerPath, data);
  }
  userLogin(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+this.loginPath, data);
  }

  userForgetPassword(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+this.forgetPasswordPath, data);
  }
  userResetPassword(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+this.resetPasswordPath, data);
  }

  sendOtp(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+this.sendOtpPath, data);
  }
  changePassword(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+this.changePasswordPath,data,this.httpOptions);
  }
}
