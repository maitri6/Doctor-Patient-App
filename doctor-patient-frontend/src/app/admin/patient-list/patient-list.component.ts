import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
PatientData:any;
constructor(
  private notifyService: NotficationServiceService,
  private router: Router,
  private adminService: AdminService
) {}

ngOnInit(): void {
  this.getAllPatientsList();
}

// get all patients
getAllPatientsList() {
  this.adminService.getAllPatientsList().subscribe(
    (res: any) => {
      this.PatientData = res.data;
      this.notifyService.showToastSuccess(res.statusMessage);
    },
    (err: any) => {
      if (err.error.statusCode == 500) {
        this.router.navigate(['/patientList']);
        this.notifyService.showToastError(err.error.statusMessage);
      }
    }
  );
}
}
