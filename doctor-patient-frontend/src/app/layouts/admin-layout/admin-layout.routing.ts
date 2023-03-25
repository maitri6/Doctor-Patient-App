import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../Account/account/user-profile/user-profile.component';
// import { TableListComponent } from '../../table-list/table-list.component';
// import { TypographyComponent } from '../../typography/typography.component';
import { ChangePasswordComponent } from '../../Account/account/change-password/change-password.component';
import { AdminListComponent } from '../../admin/admin-list/admin-list.component';
import { DoctorListComponent } from '../../admin/doctor-list/doctor-list.component';
import { PatientListComponent } from '../../admin/patient-list/patient-list.component'; 
import { DiseaseComponent } from '../../patient/disease/disease.component';
import { SpecificDoctorsComponent } from '../../patient/specific-doctors/specific-doctors.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'editProfile',    component:UserProfileComponent  }, 
    { path: 'doctorList',    component:DoctorListComponent  },  
    { path: 'adminList',    component:AdminListComponent  },  
    { path: 'patientList',    component:PatientListComponent  },   
    { path: 'diseaseList',    component:DiseaseComponent  },   
    { path: 'diseaseSpecificDoctors',    component: SpecificDoctorsComponent },   
];
