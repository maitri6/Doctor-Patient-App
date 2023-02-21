import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiBaseUrl;
  authPath='auth'
  doctorPath='doctor'

  constructor(private http:HttpClient) { }
  token =localStorage.getItem('token')
     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

  userRegister(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+'/register', data);
  }
  userLogin(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+'/login', data);
  }

  userForgetPassword(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+'/forgetPassword', data);
  }
  userResetPassword(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+'/resetPassword', data);
  }

  sendOtp(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+'/sendOtp', data);
  }
  changePassword(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+'/changePassword',data,this.httpOptions);
  }
  getSingleUser(): Observable<any>{
    // console.log("angular token",this.token)
    return this.http.get(this.baseUrl + this.authPath+'/getUserById',this.httpOptions);
  }
  editProfile(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+'/updateProfile',data,this.httpOptions);
  }
  getAllBloodGroups(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'bloodGroup');
    return this.http.get(this.baseUrl + this.doctorPath+'/getDoctorAndPatientDetails',{ params: params });
  }
}
