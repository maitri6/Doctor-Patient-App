import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../Account/auth.guard';
import { RoleGuard } from '../../../app/gaurds/role.guard';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    data?: {
      allowedRoles?: string[];
    };
    canActivate?: any[];
    
}
//token role =admin patient //
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', data: { allowedRoles: ['admin','doctor','patient'] }, canActivate: [AuthGuard,RoleGuard] },
    { path: '/adminList', title: 'Admins List',  icon:'content_paste', class: '' ,data: { allowedRoles: ['admin'] }, canActivate: [AuthGuard,RoleGuard]},
    { path: '/doctorList', title: 'Doctors List',  icon:'content_paste', class: '' ,data: { allowedRoles: ['admin'] }, canActivate: [AuthGuard,RoleGuard]},
    { path: '/patientList', title: 'Patients List',  icon:'content_paste', class: '',data: { allowedRoles: ['admin'] }, canActivate: [AuthGuard,RoleGuard] },
    { path: '/diseaseList', title: 'Disease List',  icon:'content_paste', class: '',data: { allowedRoles: ['patient'] }, canActivate: [AuthGuard,RoleGuard] },
    { path: '/doctorAppointmentLists', title: 'My Appointments',  icon:'content_paste', class: '',data: { allowedRoles: ['doctor'] }, canActivate: [AuthGuard,RoleGuard] },
    { path: '/patientAppointmentLists', title: 'My Appointments',  icon:'content_paste', class: '',data: { allowedRoles: ['patient'] }, canActivate: [AuthGuard,RoleGuard] },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRole:string;
  menuItems: any[];

  constructor() { }

  ngOnInit() {
   this.userRole=localStorage.getItem('role')

    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems = ROUTES.filter(menuItem => {
      return menuItem.data.allowedRoles.includes(this.userRole);
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
