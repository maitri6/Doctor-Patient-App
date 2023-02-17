import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../account.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  getUserData:any
  profileForm: FormGroup;
  constructor(
    private authService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

 async ngOnInit() {
  // this.getUserData= await this.GetUserProfile();
  this.getUserData= this.authService.getSingleUser().subscribe(
    (res: any) => {
      if (res.statusCode == 200) {
        console.log("data",res.data)
      return res.data
      }
    },
    (err: any) => {
      if (err.error.statusCode == 400) {
        return err;
      } else if (err.error.statusCode == 422) {
      }
      else{
      }
    }
  );
  console.log("init",this.getUserData)
    // Create the form group with form controls for each field
    this.profileForm = this.formBuilder.group({
      name: [this.getUserData.name, Validators.required],
      phoneNumber: [this.getUserData.phoneNumber, [Validators.required]],
    });
  }

  async  GetUserProfile() {
      this.authService.getSingleUser().subscribe(
        (res: any) => {
          if (res.statusCode == 200) {
            console.log("data",res.data)
          return res.data
          }
        },
        (err: any) => {
          if (err.error.statusCode == 400) {
            return err;
          } else if (err.error.statusCode == 422) {
          }
          else{
          }
        }
      );
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
             this.router.navigate(['/dashboard']);
          }
        },
        (err: any) => {
          if (err.error.statusCode == 400) {
            this.router.navigate(['/editProfile']);
            // this.notifyService.showToastError(err.error.statusMessage);
          } else if (err.error.statusCode == 422) {
            this.router.navigate(['/editProfile']);
            // this.notifyService.showToastError(err.error.statusMessage);
          }
          else{
            // Swal({title:"Good job!", text:"Something !", type:"success"});
            this.router.navigate(['/editProfile']);
            // this.notifyService.showToastError(err.error.statusMessage);
          }
        }
      );
    }
}
