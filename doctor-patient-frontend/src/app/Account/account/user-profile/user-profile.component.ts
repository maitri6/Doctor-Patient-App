import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../account.service';
import { NotficationServiceService } from '../../../Notification/notfication-service.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit{
  getUserData: any;
  token: string;
  profileForm: FormGroup;
  constructor(
    private authService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifyService:NotficationServiceService,
  ) 
  {}

  ngOnInit() {
    this.getSingleUserData();
  }
  getSingleUserData() {
    this.authService.getSingleUser().subscribe((response) => {
      this.getUserData = response.data;
      this.UpdateProfile = this.formBuilder.group({
        name: [this.getUserData.name, Validators.required],
        phoneNumber: [this.getUserData.phoneNumber, [Validators.required]],
      });
    });
  }

  UpdateProfile = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.UpdateProfile.controls;
  }
  //update user profile
  UpdateUserProfile() {
    const userUpdateProfileObj = {
      name: this.UpdateProfile.value.name,
      phoneNumber: this.UpdateProfile.value.phoneNumber,
    };

    this.authService.editProfile(userUpdateProfileObj).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.notifyService.showToastSuccess(res.statusMessage);
            this.router.navigate(['/dashboard']);
          // this.getSingleUserData();
        }
      },
      (err: any) => {
        if (err.error.statusCode == 400) {
          this.router.navigate(['/editProfile']);
           this.notifyService.showToastError(err.error.statusMessage);
        } else if (err.error.statusCode == 422) {
          this.router.navigate(['/editProfile']);
           this.notifyService.showToastError(err.error.statusMessage);
        } else {
          this.router.navigate(['/editProfile']);
           this.notifyService.showToastError(err.error.statusMessage);
        }
      }
    );
  }
}
