import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  // { path: "", component:  AuthRegisterComponent },
  { path: "register", component:  AuthRegisterComponent },
  { path: "login", component:  AuthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],    
  exports: [RouterModule]
})


export class AccountRoutingModule{

};
