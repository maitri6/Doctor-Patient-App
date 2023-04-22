import { Component,OnInit } from '@angular/core';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { PatientServiceService } from '../Services/patient-service.service';
@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent  implements OnInit{
  AppointmentList;
  constructor(
    private notifyService: NotficationServiceService,
    private router: Router,
     private patientService: PatientServiceService
  ) {}
  ngOnInit(): void {
    this.getAllPatientAppointments();
  }
  getAllPatientAppointments() {
    this.patientService.getAllPatientAppointments().subscribe(
      (res: any) => {
        this.AppointmentList = res.data;
        console.log('patient', this.AppointmentList);
        this.notifyService.showToastSuccess(res.statusMessage);
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/patientAppointmentLists']);
          this.notifyService.showToastError(err.error.statusMessage);
        }
        else if(err.error.statusCode == 400){
          this.router.navigate(['/patientAppointmentLists']);
          this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }

}
