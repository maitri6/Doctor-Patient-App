import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  token =localStorage.getItem('token')
  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.token
   })
 };

  getAllDiseasesList(): Observable<any>{
    return this.http.get(this.baseUrl + 'patient'+'/getAllDiseases',this.httpOptions);
  }

  getAllApprovedDoctorsList(disease:any): Observable<any>{
    // let params = new HttpParams();
    // params = params.append('disease', 'cardiology');
    return this.http.get(this.baseUrl + 'patient' + '/getAllApprovedDoctors/'+disease ,{...this.httpOptions});
  }

  getAllAppointmentDates(): Observable<any>{
    return this.http.get(this.baseUrl + 'patient' + '/getAllAppointmentDates'+{...this.httpOptions});
  }

  getAllAppointmentTimeslotes(): Observable<any>{
    return this.http.get(this.baseUrl + 'patient' + '/getAllAppointmentTimeSlots'+{...this.httpOptions});
  }
}
