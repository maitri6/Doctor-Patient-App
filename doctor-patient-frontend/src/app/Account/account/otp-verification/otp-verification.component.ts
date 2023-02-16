import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AccountService } from '../../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { NotficationServiceService } from '../../Notification/notfication-service.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  @Output() testEvent = new EventEmitter<string>();
  id=""
  constructor(
    private authService: AccountService,
    // private notifyService: NotficationServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
   
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
  }); 
  }
  childMethod(){
    console.log("Child method")
    this.testEvent.emit('message');
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
   
    if(this.OtpForm.value.otp==""){

    }
    // this.notifyService.showToastError("OTP cannot be empty");
    else{
    this.authService.sendOtp(userOtpobj).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.router.navigate(['/dashboard']);
          localStorage.setItem('isLogged',JSON.stringify(true))
          this.childMethod();
          // this.notifyService.showToastSuccess(res.statusMessage);
        }
      },
      (err: any) => {
        if (err.error.statusCode == 400) {
          this.router.navigate(['/otp-verification/'+this.id]);
          // this.notifyService.showToastError(err.error.statusMessage);
        } else if (err.error.statusCode == 422) {
          this.router.navigate(['/otp-verification/'+this.id]);
          // this.notifyService.showToastError(err.error.statusMessage);
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
          // this.notifyService.showToastSuccess(res.statusMessage);
        }
      },
      (err: any) => {
        if (err.error.statusCode == 400) {
          this.router.navigate(['/otp-verification/'+this.id]);
          // this.notifyService.showToastError(err.error.statusMessage);
        } else if (err.error.statusCode == 422) {
          this.router.navigate(['/otp-verification/'+this.id]);
          // this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }

}
// function childMethod() {
//   throw new Error('Function not implemented.');
// }

