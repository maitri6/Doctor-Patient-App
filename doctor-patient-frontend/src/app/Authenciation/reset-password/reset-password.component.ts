import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token=""
  constructor(
    private authService: AuthServiceService,
    private notifyService: NotficationServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
   
  ) { 
  }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
  });
  }

  ResetForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get f() {
    return this.ResetForm.controls;
  }

  resetPassword() {
    const userResetObj = {
      password: this.ResetForm.value.password,
      token:this.token
    };

    if (userResetObj.password != this.ResetForm.value.confirm_password) {
      this.notifyService.showToastError('Password does not match');
      this.router.navigate(['/reset-password/'+this.token]);
    }
    else{
      this.authService.userResetPassword(userResetObj).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            this.router.navigate(['/login']);
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

}
