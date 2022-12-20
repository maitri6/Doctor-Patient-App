import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css'],
  //providers:['AuthServiceService']
})
export class AuthRegisterComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private notifyService: NotficationServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }
  RegisterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
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
    return this.RegisterForm.controls;
  }

  userRegister() {
    const userRegisterobj = {
      name: this.RegisterForm.value.name,
      email: this.RegisterForm.value.email,
      phoneNumber: this.RegisterForm.value.phone,
      password: this.RegisterForm.value.password,
      confirm_password: this.RegisterForm.value.confirm_password,
    };

    if (userRegisterobj.password != userRegisterobj.confirm_password) {
      this.notifyService.showToastError('Password does not match');
      this.router.navigate(['/register']);
    } else{
      this.authService.userRegister(userRegisterobj).subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            this.router.navigate(['/otp-verification']);
            this.notifyService.showToastSuccess(res.statusMessage);
          }
        },
        (err: any) => {
          if (err.error.statusCode == 400) {
            this.router.navigate(['/register']);
            this.notifyService.showToastError(err.error.statusMessage);
          } else if (err.error.statusCode == 422) {
            this.router.navigate(['/register']);
            this.notifyService.showToastError(err.error.statusMessage);
          }
          else{
            this.router.navigate(['/login']);
            this.notifyService.showToastError(err.error.statusMessage);
          }
        }
      );
    }
  }
}
