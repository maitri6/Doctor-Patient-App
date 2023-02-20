import { Component, Inject, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { NotficationServiceService } from '../Notification/notfication-service.service';
// import { NotificationsComponent } from 'src/app/notifications/notifications.component';
import { Router } from '@angular/router';
 import  Swal from 'sweetalert2';
//  private swal: SweetAlertService
@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css'],
  providers:[AccountService]
})
export class AuthRegisterComponent implements OnInit {
  constructor(
     private authService: AccountService,
    //  private notifyService: NotficationServiceService,
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
      // this.notifyService.showToastError('Password does not match');

      this.router.navigate(['/register']);
    } else{
      this.authService.userRegister(userRegisterobj).subscribe(
        (res: any) => {
          
          if (res.statusCode == 200) {
            // Swal({title:"Good job!", text:"You clicked the button!", type:"success"});
              this.router.navigate(['/otp-verification/'+res.data._id]);
                // this.router.navigate(['/login/']);
         
            // this.notifyService.showToastSuccess(res.statusMessage);
          
            // Swal({})
          }
        },
        (err: any) => {
          if (err.error.statusCode == 400) {
            this.router.navigate(['/register']);
            // this.notifyService.showToastError(err.error.statusMessage);
          } else if (err.error.statusCode == 422) {
            this.router.navigate(['/register']);
            // this.notifyService.showToastError(err.error.statusMessage);
          }
          else{
            // Swal({title:"Good job!", text:"Something !", type:"success"});
            this.router.navigate(['/login']);
            // this.notifyService.showToastError(err.error.statusMessage);
          }
        }
      );
    }
  }
}
