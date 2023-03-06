import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiBaseUrl;
  adminPath='admin'
  constructor(private http:HttpClient) { }
  token =localStorage.getItem('token')
  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.token
   })
 };

  
  getAllDoctorsList(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'doctor');
    return this.http.get(this.baseUrl + this.adminPath+'/getAllDetails',{ params: params });
  }
  getAllAdminsList(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'admin');
    return this.http.get(this.baseUrl + this.adminPath+'/getAllDetails',{ params: params });
  }
  getAllPatientsList(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'patient');
    return this.http.get(this.baseUrl + this.adminPath+'/getAllDetails',{ params: params });
  }
  updateStatusToAprroveUser(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.adminPath+'/updateStatus',data,this.httpOptions);
  }
}
