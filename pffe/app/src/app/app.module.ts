import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './services/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ManageUsersComponent } from './components/pages/manage-users/manage-users.component';
import { UpdateUserComponent } from './components/pages/update-user/update-user.component';
import { CreateUserComponent } from './components/pages/create-user/create-user.component';
import { AdministratorComponent } from './components/pages/administrator/administrator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminUserCardComponent } from './components/pages/administrator/admin-user-card/admin-user-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
//import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';

import { AvatarModule } from 'ngx-avatar';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { UserCardComponent } from './components/pages/dashboard/user-card/user-card.component';
import { ListeConcurentsComponent } from './components/pages/liste-concurents/liste-concurents.component';
import { ActiviteComponent } from './components/pages/activite/activite.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ARegarderComponent } from './components/pages/a-regarder/a-regarder.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageUsersComponent,
    UpdateUserComponent,
    CreateUserComponent,
    AdministratorComponent,
    AdminUserCardComponent,
    DashboardComponent,
    UserCardComponent,
    ListeConcurentsComponent,
    ActiviteComponent,
    ARegarderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatSidenavModule,
    HttpClientModule,
    AvatarModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    //MdbDropdownModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
