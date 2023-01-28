import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  id=""
  constructor(
    private authService: AuthServiceService,
    private notifyService: NotficationServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
   
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
  });
  
  }

  OtpForm = new FormGroup({
    otp: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.OtpForm.controls;
  }

  sendOtpToUser() {
    const userOtpobj = {
      otp: this.OtpForm.value.otp,
      userId:this.id
    };
   
    if(this.OtpForm.value.otp=="")
    this.notifyService.showToastError("OTP cannot be empty");
    else{
    this.authService.sendOtp(userOtpobj).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.router.navigate(['/login']);
          this.notifyService.showToastSuccess(res.statusMessage);
        }
      },
      (err: any) => {
        if (err.error.statusCode == 400) {
          this.router.navigate(['/otp-verification/'+this.id]);
          this.notifyService.showToastError(err.error.statusMessage);
        } else if (err.error.statusCode == 422) {
          this.router.navigate(['/otp-verification/'+this.id]);
          this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
  }

  resendOtp() {
    const userOtpObj = {
      type:"resendOtp",
      userId:this.id
    }; 
    this.authService.sendOtp(userOtpObj).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.router.navigate(['/otp-verification/'+this.id]);
          this.notifyService.showToastSuccess(res.statusMessage);
        }
      },
      (err: any) => {
        if (err.error.statusCode == 400) {
          this.router.navigate(['/otp-verification/'+this.id]);
          this.notifyService.showToastError(err.error.statusMessage);
        } else if (err.error.statusCode == 422) {
          this.router.navigate(['/otp-verification/'+this.id]);
          this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }

}
