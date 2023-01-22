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
    
  }
  DoctorForm = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.email]),
     name: new FormControl('', [Validators.required]),
     phone: new FormControl('', [Validators.required]),
     password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get f() {
    return this.DoctorForm.controls;
  }

  saveForm() {
    const saveDoctorForm = {
      name: this.DoctorForm.value.name,
      email: this.DoctorForm.value.email,
      phoneNumber: this.DoctorForm.value.phone,
      password: this.DoctorForm.value.password,
    };

      this.doctorService.saveForm(saveDoctorForm).subscribe(
        (res: any) => {
          console.log(res)
          // if (res.statusCode == 200) {
          //   this.router.navigate(['/otp-verification/'+res.data._id]);
          //   this.notifyService.showToastSuccess(res.statusMessage);
          // }
        },
        (err: any) => {
          // if (err.error.statusCode == 400) {
          //   this.router.navigate(['/register']);
          //   this.notifyService.showToastError(err.error.statusMessage);
          // } else if (err.error.statusCode == 422) {
          //   this.router.navigate(['/register']);
          //   this.notifyService.showToastError(err.error.statusMessage);
          // }
          // else{
          //   this.router.navigate(['/login']);
          //   this.notifyService.showToastError(err.error.statusMessage);
          // }
        }
      );
  }

}
