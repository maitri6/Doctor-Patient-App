import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from '../account/account-routing.module';
// import { NotficationServiceService } from './Notification/notfication-service.service';
import { AuthRegisterComponent } from './auth-register/auth-register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { SweetAlert2Module } from 'ngx-sweetalert2';

@NgModule({
  declarations: [
    AuthRegisterComponent, 
    AuthComponent,
    // UserProfileComponent, 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    // SweetAlert2Module.forRoot(),
  ]
  // ,
  // exports:[
  //   AuthComponent
  // ]

})
export class AccountModule { }
