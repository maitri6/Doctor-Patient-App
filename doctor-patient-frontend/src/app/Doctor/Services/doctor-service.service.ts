import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  baseUrl = environment.apiBaseUrl;
  authPath='doctor'
  constructor(private http:HttpClient) { }

  saveForm(data : any): Observable<any>{
    return this.http.post(this.baseUrl + this.authPath+'/saveDoctorDetails', data);
  }
}
