import { Component ,OnInit} from '@angular/core';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { PatientServiceService } from '../Services/patient-service.service';

@Component({
  selector: 'app-specific-doctors',
  templateUrl: './specific-doctors.component.html',
  styleUrls: ['./specific-doctors.component.css']
})
export class SpecificDoctorsComponent implements OnInit{
  disease=""
  constructor(
    private notifyService: NotficationServiceService,
    private router: Router,
    private patientService: PatientServiceService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
     this.activatedRoute.params.subscribe(params => {
      this.disease = params['disease'];
  });
  this.getAllApprovedDoctors(this.disease);

  }
  DoctorsData:any;
  // get all Doctors
  getAllApprovedDoctors(disease:any) {
    this.patientService.getAllApprovedDoctorsList(this.disease).subscribe(
      (res: any) => {
        this.DoctorsData = res.data;
        console.log( this.DoctorsData)
        this.notifyService.showToastSuccess(res.statusMessage);
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/diseaseSpecificDoctors']);
          this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }

  onDoctorCardClicked(doctor:any) {
     this.router.navigate(['/bookPatientAppointment', doctor.userId._id]);
  }
}
