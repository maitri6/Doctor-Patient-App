import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../Services/auth-service.service'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotficationServiceService } from 'src/app/Notification/notfication-service.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthServiceService,
    private notifyService: NotficationServiceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  LoginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  get LoginControl() {
    return this.LoginForm.controls;
  }

  userLogin(){
    const userLoginObj = {
      email : this.LoginForm.value.email, 
      password : this.LoginForm.value.password
    }
     this.authService.userLogin(userLoginObj).subscribe((res : any) => {
   
      if (res.statusCode == 200) {
        this.router.navigate(['/otp-verification']);
        this.notifyService.showToastSuccess(res.statusMessage);
      }
      localStorage.setItem('token', res.data.token);
     },(err : any) => {
      if (err.error.statusCode == 404) {
        this.router.navigate(['/login']);
        this.notifyService.showToastError(err.error.statusMessage);
      } else if (err.error.statusCode == 422) {
        this.router.navigate(['/login']);
        this.notifyService.showToastError(err.error.statusMessage);
      }
      else{
        this.router.navigate(['/login']);
        this.notifyService.showToastError(err.error.statusMessage);
      }
     })
  }
}
