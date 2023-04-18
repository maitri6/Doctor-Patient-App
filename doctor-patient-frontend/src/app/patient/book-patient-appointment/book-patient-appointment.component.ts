import { Component, OnInit } from '@angular/core';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { PatientServiceService } from '../Services/patient-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  //Get appointment dates
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
// Get appointment timeslot
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

  BookAppointment = new FormGroup({
    description: new FormControl('', []),
    date: new FormControl('', [Validators.required, Validators.email]),
    time: new FormControl('', [Validators.required]),
    appointmentType: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.BookAppointment.controls;
  }

 
//Book Patient Appointment
  bookAppointment() {
    const bookAppointment = {
      date: this.BookAppointment.value.date,
      time: this.BookAppointment.value.time,
      description: this.BookAppointment.value.description,
      appointmentType: this.BookAppointment.value.appointmentType,
      doctorId: this.doctorId,
    };

    this.patientService.bookPatientAppointment(bookAppointment).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.router.navigate(['/diseaseList']);
           this.notifyService.showToastSuccess(res.statusMessage);
        }
      },
      (err: any) => {
        if (err.error.statusCode == 400) {
          this.router.navigate(['/bookPatientAppointment/'+this.doctorId]);
           this.notifyService.showToastError(err.error.statusMessage);
        } else if (err.error.statusCode == 422) {
          this.router.navigate(['/bookPatientAppointment/'+this.doctorId]);
           this.notifyService.showToastError(err.error.statusMessage);
        } else {
          this.router.navigate(['/bookPatientAppointment/'+this.doctorId]);
           this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
}
