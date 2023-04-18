import { Component, OnInit } from '@angular/core';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { PatientServiceService } from '../Services/patient-service.service';
@Component({
  selector: 'app-book-patient-appointment',
  templateUrl: './book-patient-appointment.component.html',
  styleUrls: ['./book-patient-appointment.component.css']
})
export class BookPatientAppointmentComponent  implements OnInit {
  constructor(
    private notifyService: NotficationServiceService,
    private router: Router,
    private patientService: PatientServiceService
  ) {}
  Dates:[]
  ngOnInit(): void {

  }
  bookAppointment(){

  }
}
