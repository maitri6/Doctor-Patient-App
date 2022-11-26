import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private authService: AuthServiceService,
    private notifyService: NotficationServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  ForgetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.ForgetForm.controls;
  }


  forgetPassword() {
    const userForgetobj = {
      email: this.ForgetForm.value.email,
    };

      this.authService.userForgetPassword(userForgetobj).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            this.router.navigate(['/forget-password']);
            this.notifyService.showToastSuccess(res.statusMessage);
          }
        },
        (err: any) => {
          if (err.error.statusCode == 404) {
            this.router.navigate(['/forget-password']);
            this.notifyService.showToastError(err.error.statusMessage);
          } else if (err.error.statusCode == 422) {
            this.router.navigate(['/forget-password']);
            this.notifyService.showToastError(err.error.statusMessage);
          }
          else{
            this.router.navigate(['/forget-password']);
            this.notifyService.showToastError(err.error.statusMessage);
          }
        }
      );
  }
}
