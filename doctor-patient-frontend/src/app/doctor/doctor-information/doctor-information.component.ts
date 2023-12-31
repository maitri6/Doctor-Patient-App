import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
 import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { DoctorServiceService } from '../Services/doctor-service.service';
@Component({
  selector: 'app-doctor-information',
  templateUrl: './doctor-information.component.html',
  styleUrls: ['./doctor-information.component.css'],
})
export class DoctorInformationComponent implements OnInit {
  constructor(
     private notifyService: NotficationServiceService,
    private router: Router,
    private doctorService: DoctorServiceService
  ) {}

  ngOnInit(): void {
    this.getAllCities();
    this.getAllYear();
    this.getAllIdentityProofs();
    this.getAllTitles();
    this.getAllSpecialization();
    this.getAllDegrees();
    this.getAllColleges();
  }
  City: any;
  Year: any;
  IdentityProof: any;
  Title: any;
  Specialization: any;
  Degree: any;
  College:any;
  FormData:any;
  selectedFile:any;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  DoctorForm = new FormGroup({
    title: new FormControl('', []),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    specialization: new FormControl('', []),
    city: new FormControl('', []),
    gender: new FormControl('', []),
    identityProof: new FormControl('', []),
    identityProofValue: new FormControl('', []),
    registrationNumber: new FormControl('', []),
    registrationCouncil: new FormControl('', []),
    registrationYear: new FormControl('', []),
    degree: new FormControl('', []),
    year: new FormControl('', []),
    experience: new FormControl('', []),
    college: new FormControl('', []),
    clinicName: new FormControl('', []),
    clinicAddress: new FormControl('', []),
    clinicNo: new FormControl('', []),
    clinicFees: new FormControl('', []),
    profileImage:new FormControl('', [])
  });

  get f() {
    return this.DoctorForm.controls;
  }


  uploadProfile() {
    let formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.doctorService.uploadProfile(formData).subscribe(
      (res: any) => {
      this.notifyService.showToastSuccess(res.statusMessage);
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
           this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }

  // get all citites
  getAllCities() {
    this.doctorService.getAllCities().subscribe(
      (res: any) => {
        this.City = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
          // this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }

  // get all titles
  getAllTitles() {
    this.doctorService.getAllTitles().subscribe(
      (res: any) => {
        this.Title = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
          // this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
// get all years
  getAllYear() {
    this.doctorService.getAllYears().subscribe(
      (res: any) => {
        this.Year = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
          // this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
 // get identity proofs like aadhar
  getAllIdentityProofs() {
    this.doctorService.getAllProofs().subscribe(
      (res: any) => {
        this.IdentityProof = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
          // this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
// get all specialization
  getAllSpecialization() {
    this.doctorService.getAllSpecialization().subscribe(
      (res: any) => {
        this.Specialization = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
          // this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
// get all degrees
  getAllDegrees() {
    this.doctorService.getAllDegrees().subscribe(
      (res: any) => {
        this.Degree = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
          // this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
  // get all degrees
  getAllColleges() {
    this.doctorService.getAllColleges().subscribe(
      (res: any) => {
        this.College = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/saveDoctorForm']);
          // this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
  //save doctor form
  saveForm() {
    //to update fields use set if complete form group update
    this.DoctorForm.patchValue({
      profileImage: this.selectedFile.name
    });

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
        } else {
          this.router.navigate(['/saveDoctorForm']);
           this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
}
