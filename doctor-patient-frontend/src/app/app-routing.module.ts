import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRegisterComponent } from './Authenciation/auth-register/auth-register.component';
import { AuthComponent } from './Authenciation/auth/auth.component';
import { ForgetPasswordComponent } from './Authenciation/forget-password/forget-password.component';
import { OtpVerificationComponent } from './Authenciation/otp-verification/otp-verification.component';
import { PageNotFoundComponent } from './Authenciation/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './Authenciation/reset-password/reset-password.component';

const routes: Routes = [
  { path: "", component:  AuthComponent },
  { path: "login", component:  AuthComponent },
  { path: "register", component:  AuthRegisterComponent },
  { path: "forget-password", component: ForgetPasswordComponent  },
  { path: "reset-password", component: ResetPasswordComponent  },
  { path: "otp-verification", component: OtpVerificationComponent  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
