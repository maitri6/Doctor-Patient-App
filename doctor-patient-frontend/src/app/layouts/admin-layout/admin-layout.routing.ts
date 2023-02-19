import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../Account/account/user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChangePasswordComponent } from '../../Account/account/change-password/change-password.component';
// import { LogoutComponent } from '../../Account/account/logout/logout.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'editProfile',    component:UserProfileComponent  },   
    // { path: 'logout',         component:LogoutComponent },  
];
