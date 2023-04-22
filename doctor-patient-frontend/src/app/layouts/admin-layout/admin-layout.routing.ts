import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../Account/account/user-profile/user-profile.component';
import { ChangePasswordComponent } from '../../Account/account/change-password/change-password.component';
import { AdminListComponent } from '../../admin/admin-list/admin-list.component';
import { DoctorListComponent } from '../../admin/doctor-list/doctor-list.component';
import { PatientListComponent } from '../../admin/patient-list/patient-list.component';
import { DiseaseComponent } from '../../patient/disease/disease.component';
import { SpecificDoctorsComponent } from '../../patient/specific-doctors/specific-doctors.component';
import { MyAppointmentsComponent } from '../../doctor/my-appointments/my-appointments.component';
import { BookPatientAppointmentComponent } from '../../patient/book-patient-appointment/book-patient-appointment.component';
import { PatientAppointmentsComponent} from '../../patient/patient-appointments/patient-appointments.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'editProfile', component: UserProfileComponent },
  { path: 'doctorList', component: DoctorListComponent },
  { path: 'adminList', component: AdminListComponent },
  { path: 'patientList', component: PatientListComponent },
  { path: 'diseaseList', component: DiseaseComponent },
  { path: 'doctorAppointmentLists', component: MyAppointmentsComponent },
  { path: 'patientAppointmentLists', component: PatientAppointmentsComponent },
  {
    path: 'diseaseSpecificDoctors/:disease',
    component: SpecificDoctorsComponent,
  },
  {
    path: 'bookPatientAppointment/:doctorId',
    component: BookPatientAppointmentComponent,
  },
];
