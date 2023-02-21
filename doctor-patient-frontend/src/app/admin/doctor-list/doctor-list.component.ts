import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
 import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit{
  constructor(
     private notifyService: NotficationServiceService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getAllDoctorsList();
  }
  DoctorsData:any;

    // get all doctors
    getAllDoctorsList() {
      this.adminService.getAllDoctorsList().subscribe(
        (res: any) => {
          this.DoctorsData = res.data;
          this.notifyService.showToastSuccess(res.statusMessage);
        },
        (err: any) => {
          if (err.error.statusCode == 500) {
            this.router.navigate(['/doctorList']);
             this.notifyService.showToastError(err.error.statusMessage);
          }
        }
      );
    }
}
