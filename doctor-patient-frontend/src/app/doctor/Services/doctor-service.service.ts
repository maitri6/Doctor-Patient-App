import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllCities(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'city');
    return this.http.get(this.baseUrl + this.doctorPath+'/getAllCities',{ params: params });
  }
  getAllYears(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'year');
    return this.http.get(this.baseUrl + this.doctorPath+'/getAllCities',{ params: params });
  }
  getAllProofs(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'identityProof');
    return this.http.get(this.baseUrl + this.doctorPath+'/getDoctorAndPatientDetails',{ params: params });
  }
  getAllTitles(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'title');
    return this.http.get(this.baseUrl + this.doctorPath+'/getDoctorAndPatientDetails',{ params: params });
  }
  getAllSpecialization(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'speciality');
    return this.http.get(this.baseUrl + this.doctorPath+'/getDoctorAndPatientDetails',{ params: params });
  }
  getAllDegrees(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'degree');
    return this.http.get(this.baseUrl + this.doctorPath+'/getDoctorAndPatientDetails',{ params: params });
  }
  getAllColleges(): Observable<any>{
    let params = new HttpParams();
    params = params.append('type', 'college');
    return this.http.get(this.baseUrl + this.doctorPath+'/getDoctorAndPatientDetails',{ params: params });
  }
}
