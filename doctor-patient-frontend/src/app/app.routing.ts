import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './Account/account/auth/auth.component';
import { AuthRegisterComponent } from './Account/account/auth-register/auth-register.component';
import { ForgetPasswordComponent } from './Account/account/forget-password/forget-password.component';
import { OtpVerificationComponent } from './Account/account/otp-verification/otp-verification.component';
import { PageNotFoundComponent } from './Account/account/page-not-found/page-not-found.component';
 import { ResetPasswordComponent } from './Account/account/reset-password/reset-password.component';
import { DoctorInformationComponent } from './doctor/doctor-information/doctor-information.component';
import { AuthGuard } from './Account/auth.guard';

const routes: Routes =[
  { path: "", component:  AuthComponent },
  { path: "login", component:  AuthComponent},
  { path: "register", component:  AuthRegisterComponent },
  { path: "forget-password", component: ForgetPasswordComponent  },
  { path: "reset-password/:token", component: ResetPasswordComponent  },
  { path: "otp-verification/:id", component: OtpVerificationComponent ,canActivate: [AuthGuard] },
   { path: "saveDoctorForm", component: DoctorInformationComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  { path: '**', component: PageNotFoundComponent },
 

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
