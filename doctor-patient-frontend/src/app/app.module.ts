import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './Authenciation/auth/auth.component';
import { AuthRegisterComponent } from './Authenciation/auth-register/auth-register.component';
import { ForgetPasswordComponent } from './Authenciation/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Authenciation/reset-password/reset-password.component';
import { DoctorInformationComponent } from './Doctor/doctor-information/doctor-information.component';
import { PageNotFoundComponent } from './Authenciation/page-not-found/page-not-found.component';
import { OtpVerificationComponent } from './Authenciation/otp-verification/otp-verification.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthRegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    DoctorInformationComponent,
    PageNotFoundComponent,
    OtpVerificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
