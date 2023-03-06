import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
})
export class AdminListComponent implements OnInit {
  constructor(
    private notifyService: NotficationServiceService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getAllAdminsList();
  }
  AdminData: any;

  // get all admins
  getAllAdminsList() {
    this.adminService.getAllAdminsList().subscribe(
      (res: any) => {
        this.AdminData = res.data;
        this.notifyService.showToastSuccess(res.statusMessage);
      },
      (err: any) => {
        if (err.error.statusCode == 500) {
          this.router.navigate(['/adminList']);
          this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }

  onApprovalChange(item){
    const status = item.isApproved ? true : false;
   let updateObj={
     userId:item._id,
     status:status
   }
   this.adminService.updateStatusToAprroveUser(updateObj).subscribe(
     (res: any) => {
       this.router.navigate(['/adminList']);
       this.notifyService.showToastSuccess(res.statusMessage);
     },
     (err: any) => {
       if (err.error.statusCode == 500) {
         this.router.navigate(['/adminList']);
          this.notifyService.showToastError(err.error.statusMessage);
       }
     }
   );

 }
}
