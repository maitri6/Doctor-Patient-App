import { Component, OnInit } from '@angular/core';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { PatientServiceService } from '../Services/patient-service.service';
@Component({
  selector: 'app-book-patient-appointment',
  templateUrl: './book-patient-appointment.component.html',
  styleUrls: ['./book-patient-appointment.component.css']
})
export class BookPatientAppointmentComponent  implements OnInit {
  doctorId=""
  appointmentDates:[]
  appointmentTimeslotes:[]
  constructor(
    private notifyService: NotficationServiceService,
    private router: Router,
    private patientService: PatientServiceService,
    private activatedRoute: ActivatedRoute,
  ) {}
 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.doctorId = params['doctorId'];
  }); 
  this.getAppointmentDates();
  this.getAllAppointmentTimeslotes();
  }
  getAppointmentDates() {
    this.patientService.getAllAppointmentDates().subscribe(
      (res: any) => {
        this.appointmentDates = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/bookPatientAppointment/'+this.doctorId]);
           this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }

  getAllAppointmentTimeslotes() {
    this.patientService.getAllAppointmentTimeslotes('').subscribe(
      (res: any) => {
        this.appointmentTimeslotes = res.data;
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/bookPatientAppointment/'+this.doctorId]);
           this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }


  bookAppointment(){

  }
}
