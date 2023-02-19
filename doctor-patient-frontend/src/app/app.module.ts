import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ForgetPasswordComponent } from './Account/account/forget-password/forget-password.component';
import { OtpVerificationComponent } from './Account/account/otp-verification/otp-verification.component';
import { PageNotFoundComponent } from './Account/account/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './Account/account/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Account/account/change-password/change-password.component';
import { DoctorInformationComponent } from './doctor/doctor-information/doctor-information.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ForgetPasswordComponent,
    OtpVerificationComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
     ChangePasswordComponent,
    DoctorInformationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
