import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PatientServiceService } from '../Services/patient-service.service';
import { NotficationServiceService } from '../../Notification/notfication-service.service';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit{

  constructor(
    private patientService: PatientServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifyService:NotficationServiceService,
  ) 
  {}
  ngOnInit(): void {
 
 };
 
}
