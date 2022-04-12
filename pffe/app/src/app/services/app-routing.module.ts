import { ARegarderComponent } from '../components/pages/a-regarder/a-regarder.component';
import { ActiviteComponent } from '../components/pages/activite/activite.component';
import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { AdministratorComponent } from '../components/pages/administrator/administrator.component';
import { CreateUserComponent } from '../components/pages/create-user/create-user.component';
import { LoginComponent } from '../components/pages/login/login.component';
import { ManageUsersComponent } from '../components/pages/manage-users/manage-users.component';
import { UpdateUserComponent } from '../components/pages/update-user/update-user.component';
import { DashboardComponent } from '../components/pages/dashboard/dashboard.component';
import { ListeConcurentsComponent } from '../components/pages/liste-concurents/liste-concurents.component';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class isAdmin implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated && !!this.authService.isAdmin;
  }
}

export class isUer implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated && !this.authService.isUer;
  }
}

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'administrator',
    component: AdministratorComponent,
    canActivate: [isAdmin],
    children: [
      { path: '', component: ManageUsersComponent },
      { path: 'create', component: CreateUserComponent },
      { path: 'update/:email', component: UpdateUserComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [isUer],
    children: [
      { path: '', component: ListeConcurentsComponent },
      { path: 'activite', component: ActiviteComponent },
      { path: 'aregarder', component: ARegarderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
