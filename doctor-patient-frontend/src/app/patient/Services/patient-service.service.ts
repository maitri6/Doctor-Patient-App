import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  baseUrl = environment.apiBaseUrl;
  patientPath='patient'
  constructor(private http:HttpClient) { }
  token =localStorage.getItem('token')
  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.token
   })
 };

  getAllDiseasesList(): Observable<any>{
    // let params = new HttpParams();
    // params = params.append('type', 'doctor');
    return this.http.get(this.baseUrl + this.patientPath+'/getAllDieases');
  }
}
