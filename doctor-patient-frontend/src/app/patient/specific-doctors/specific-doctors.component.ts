import { Component ,OnInit} from '@angular/core';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { PatientServiceService } from '../Services/patient-service.service';

@Component({
  selector: 'app-specific-doctors',
  templateUrl: './specific-doctors.component.html',
  styleUrls: ['./specific-doctors.component.css']
})
export class SpecificDoctorsComponent {
  constructor(
    private notifyService: NotficationServiceService,
    private router: Router,
    private patientService: PatientServiceService
  ) {}

  ngOnInit(): void {
     this.getAllApprovedDoctors();
  }
  DoctorsData:any;
  // get all Doctors
  getAllApprovedDoctors() {
    this.patientService.getAllApprovedDoctorsList().subscribe(
      (res: any) => {
        this.DoctorsData = res.data;
        console.log("this.DiseaseList",this.DoctorsData)
        this.notifyService.showToastSuccess(res.statusMessage);
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/diseaseList']);
          this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
}
