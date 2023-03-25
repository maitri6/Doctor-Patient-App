import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
 import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { DoctorServiceService } from '../Services/doctor-service.service';
@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent implements OnInit{
  AppointmentList
  constructor(
     private notifyService: NotficationServiceService,
    private router: Router,
    private doctorService: DoctorServiceService
  ) {}

  ngOnInit(): void {
this.getAllDoctorAppointments();
  }
   // get all appointments
   getAllDoctorAppointments() {
    this.doctorService.getAllAppointments().subscribe(
      (res: any) => {
        this.AppointmentList = res.data;
        console.log("app",this.AppointmentList)
        this.notifyService.showToastSuccess(res.statusMessage);
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/doctorAppointmentLists']);
          this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
  onApprovalChange(item){
    const status = item.isAppointment ? true : false;
   let updateObj={
     userId:item._id,
     status:status
   }
  //  this.doctorService.updateStatusToAprroveUser(updateObj).subscribe(
  //    (res: any) => {
  //      this.router.navigate(['/adminList']);
  //      this.notifyService.showToastSuccess(res.statusMessage);
  //    },
  //    (err: any) => {
  //      if (err.error.statusCode == 500) {
  //        this.router.navigate(['/adminList']);
  //         this.notifyService.showToastError(err.error.statusMessage);
  //      }
  //    }
  //  );

 }
}
