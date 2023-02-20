import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotficationServiceService } from '../../../Notification/notfication-service.service';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(
   private authService: AccountService,
   private router: Router,
    private notifyService:NotficationServiceService,
 ) {}
  ChangePassword = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.ChangePassword.controls;
  }

  changePassword() {
    const userChangePasswordObj = {
      oldPassword: this.ChangePassword.value.oldPassword,
      newPassword: this.ChangePassword.value.newPassword,
    };

      this.authService.changePassword(userChangePasswordObj).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
             this.notifyService.showToastSuccess(res.statusMessage);
             this.router.navigate(['/dashboard']);
          }
        },
        (err: any) => {
          if (err.error.statusCode == 400) {
            this.router.navigate(['/changePassword']);
             this.notifyService.showToastError(err.error.statusMessage);
          } else if (err.error.statusCode == 422) {
            this.router.navigate(['/changePassword']);
             this.notifyService.showToastError(err.error.statusMessage);
          }
          else{
            this.router.navigate(['/changePassword']);
             this.notifyService.showToastError(err.error.statusMessage);
          }
        }
      );
    }
}
