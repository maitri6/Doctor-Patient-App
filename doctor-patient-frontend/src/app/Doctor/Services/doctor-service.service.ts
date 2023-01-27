import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  baseUrl = environment.apiBaseUrl;
  doctorPath='doctor'
  constructor(private http:HttpClient) { }

  saveForm(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.doctorPath+'/saveDoctorDetails', data);
  }

  getAllData(): Observable<any>{
    return this.http.get(this.baseUrl + this.doctorPath+'/getAllCities');
  }
}
