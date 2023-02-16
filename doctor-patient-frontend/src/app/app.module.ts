import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ForgetPasswordComponent,
    OtpVerificationComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
