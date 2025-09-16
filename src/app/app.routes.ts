import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [HardcodedAuthenticationService]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
