import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: AppComponent },
];
