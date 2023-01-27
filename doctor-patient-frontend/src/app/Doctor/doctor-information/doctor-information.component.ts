import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { DoctorServiceService } from '../Services/doctor-service.service';
@Component({
  selector: 'app-doctor-information',
  templateUrl: './doctor-information.component.html',
  styleUrls: ['./doctor-information.component.css']
})
export class DoctorInformationComponent implements OnInit {

  constructor(
    private notifyService: NotficationServiceService,
    private router: Router,
    private doctorService:DoctorServiceService
  ) { }

  ngOnInit(): void {
    this.getAllCities();
  }
  type:any;
  City:any;
  // IdentityProof Names
  IdentityProof: string[]  = ['Aadhar Card','Passport','PAN Card','Election Comission Card','Driving License','Ration card','Voter Card']
  DoctorForm = new FormGroup({
     title:new FormControl('', []),
     email: new FormControl('', [Validators.required, Validators.email]),
     name: new FormControl('', [Validators.required]),
     phoneNumber: new FormControl('', [Validators.required]),
     password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    specialization:new FormControl('', []),
    city:new FormControl('', []),
    gender:new FormControl('', []),
    identityProof:new FormControl('', []),
    identityProofValue:new FormControl('', []),
    registrationNumber:new FormControl('', []),
    registrationCouncil:new FormControl('', []),
    registrationYear:new FormControl('', []),
    degree:new FormControl('', []),
    year:new FormControl('', []),
    experience:new FormControl('', []),
    college:new FormControl('', []),
  });

  get f() {
    return this.DoctorForm.controls;
  }

  changeProof(e:any) {
  }

  getAllCities() {
  //  this.type='city';
    this.doctorService.getAllData().subscribe(
      (res: any) => {
        console.log(res);
         this.City=res.data;
         
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
          this.notifyService.showToastError(err.error.statusMessage);
        } 
      }
      ); 
      console.log("city",this.City)
  }
  saveForm() {
    console.log(this.DoctorForm.value)
      this.doctorService.saveForm(this.DoctorForm.value).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            this.router.navigate(['/login']);
            this.notifyService.showToastSuccess(res.statusMessage);
          }
        },
        (err: any) => {
          if (err.error.statusCode == 400) {
            this.router.navigate(['/saveDoctorForm']);
            this.notifyService.showToastError(err.error.statusMessage);
          } else if (err.error.statusCode == 422) {
            this.router.navigate(['/saveDoctorForm']);
            this.notifyService.showToastError(err.error.statusMessage);
          }
          else{
            this.router.navigate(['/saveDoctorForm']);
            this.notifyService.showToastError(err.error.statusMessage);
          }
        }
      );
  }

}
